
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@1.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, password } = await req.json();

    if (!name || !email) {
      throw new Error("Name and email are required");
    }

    const emailResponse = await resend.emails.send({
      from: "Sanghos <no-reply@resend.dev>",
      to: [email],
      subject: "Welcome to Sanghos - Your Account Details",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h1 style="color: #2A9D8F; text-align: center;">Welcome to Sanghos!</h1>
          <p style="font-size: 16px;">Hello ${name},</p>
          <p style="font-size: 16px;">Thank you for creating an account with Sanghos. We're excited to have you join our community of wellness enthusiasts!</p>
          <p style="font-size: 16px;">Below are your account details:</p>
          <div style="background-color: #f7f7f7; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            ${password ? `<p style="margin: 5px 0;"><strong>Password:</strong> ${password}</p>` : ''}
          </div>
          <p style="font-size: 16px;">You can now log in to your account and explore our retreats, connect with instructors, and join our community spaces.</p>
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
  } catch (error) {
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
