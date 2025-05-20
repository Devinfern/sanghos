
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
    if (!STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }

    // Create a Supabase client with the service role key to bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          persistSession: false
        }
      }
    );

    // Get the authorization header
    const authHeader = req.headers.get("Authorization");
    let userId = null;
    
    if (authHeader) {
      try {
        // Verify the user's session
        const token = authHeader.replace("Bearer ", "");
        const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
        if (!userError && user) {
          userId = user.id;
        }
      } catch (e) {
        console.log("Auth error:", e);
        // Continue as guest if auth fails
      }
    }

    // Parse the request body
    const { eventId, customerEmail, customerName, amount, description, attendees, bookingDetails } = await req.json();

    if (!eventId || !customerEmail || !amount) {
      throw new Error("Missing required booking information");
    }

    // Fetch the event details
    const { data: eventData, error: eventError } = await supabaseAdmin
      .from("forum_events")
      .select("title, location, start_date")
      .eq("id", eventId)
      .single();

    if (eventError) {
      // If we can't find the event in our own database, continue with basic info
      console.log(`Event lookup error: ${eventError.message}. Using provided description.`);
    }

    // Initialize Stripe
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    });

    // Find existing customer or create a new one
    let customerId;
    const customers = await stripe.customers.list({
      email: customerEmail,
      limit: 1
    });

    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      const newCustomer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
        metadata: {
          user_id: userId || "guest"
        }
      });
      customerId = newCustomer.id;
    }

    // Calculate price in cents
    const priceInCents = Math.round(amount * 100);

    // Create a booking record in the database
    const { data: bookingData, error: bookingError } = await supabaseAdmin
      .from("event_bookings")
      .insert({
        event_id: eventId,
        user_id: userId,
        first_name: bookingDetails.first_name,
        last_name: bookingDetails.last_name,
        email: bookingDetails.email,
        phone: bookingDetails.phone,
        attendees: bookingDetails.attendees,
        special_requests: bookingDetails.special_requests,
        status: 'pending',
        total_amount: bookingDetails.total_amount
      })
      .select('id')
      .single();

    if (bookingError) {
      console.error("Error creating booking:", bookingError);
      throw new Error(`Error creating booking: ${bookingError.message}`);
    }

    const bookingId = bookingData.id;

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: eventData?.title || description,
              description: `${attendees} ${attendees > 1 ? "attendees" : "attendee"}`,
              images: eventData?.image_url ? [eventData.image_url] : undefined,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/booking-success?bookingId=${bookingId}`,
      cancel_url: `${req.headers.get("origin")}/booking-cancel?bookingId=${bookingId}`,
      client_reference_id: bookingId,
      metadata: {
        event_id: eventId,
        booking_id: bookingId,
        attendees: attendees.toString(),
      }
    });

    // Update the booking with the Stripe session ID
    await supabaseAdmin
      .from("event_bookings")
      .update({
        stripe_session_id: session.id,
        updated_at: new Date().toISOString()
      })
      .eq("id", bookingId);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error in create-checkout: ${errorMessage}`);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
