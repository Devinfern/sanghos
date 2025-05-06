
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@1.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log("Welcome email function called");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      console.error("Missing required fields: name and email are required");
      throw new Error("Name and email are required");
    }

    console.log(`Sending welcome email to ${email} for user ${name}`);

    const emailResponse = await resend.emails.send({
      from: "Sanghos <no-reply@resend.dev>",
      to: [email],
      subject: "Welcome to Sanghos - Your Journey Begins",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h1 style="color: #2A9D8F; text-align: center;">Welcome to Sanghos!</h1>
          <p style="font-size: 16px;">Hello ${name},</p>
          <p style="font-size: 16px;">Thank you for creating an account with Sanghos. We're excited to have you join our community of wellness enthusiasts!</p>
          <p style="font-size: 16px;">With your Sanghos account, you can:</p>
          <ul style="font-size: 16px;">
            <li>Discover transformative wellness retreats</li>
            <li>Connect with like-minded community members</li>
            <li>Track your wellness journey</li>
            <li>Access exclusive resources and events</li>
          </ul>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://sanghos.com/login" style="background-color: #2A9D8F; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Log In Now</a>
          </div>
          <p style="font-size: 14px; color: #666; text-align: center; margin-top: 30px;">If you have any questions, please contact our support team at support@sanghos.com</p>
        </div>
      `,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
