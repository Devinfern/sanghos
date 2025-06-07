
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Sanghos</title>
        <meta name="description" content="Terms of Service for Sanghos - Learn about the terms and conditions for using our wellness retreat platform." />
      </Helmet>

      <Header />

      <main className="bg-white">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 py-16 my-[64px]">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold mb-8 text-brand-dark">Terms of Service</h1>
            <p className="text-brand-slate mb-8">
              <strong>Last updated:</strong> December 15, 2024
            </p>

            <div className="bg-brand-subtle/10 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold mb-4 text-brand-dark">Table of Contents</h2>
              <ul className="space-y-2">
                <li><a href="#acceptance" className="text-brand-primary hover:underline">1. Acceptance of Terms</a></li>
                <li><a href="#description" className="text-brand-primary hover:underline">2. Description of Service</a></li>
                <li><a href="#user-accounts" className="text-brand-primary hover:underline">3. User Accounts</a></li>
                <li><a href="#bookings-payments" className="text-brand-primary hover:underline">4. Bookings and Payments</a></li>
                <li><a href="#cancellation" className="text-brand-primary hover:underline">5. Cancellation and Refunds</a></li>
                <li><a href="#user-conduct" className="text-brand-primary hover:underline">6. User Conduct</a></li>
                <li><a href="#intellectual-property" className="text-brand-primary hover:underline">7. Intellectual Property</a></li>
                <li><a href="#disclaimers" className="text-brand-primary hover:underline">8. Disclaimers</a></li>
                <li><a href="#limitation-liability" className="text-brand-primary hover:underline">9. Limitation of Liability</a></li>
                <li><a href="#termination" className="text-brand-primary hover:underline">10. Termination</a></li>
                <li><a href="#governing-law" className="text-brand-primary hover:underline">11. Governing Law</a></li>
                <li><a href="#contact" className="text-brand-primary hover:underline">12. Contact Information</a></li>
              </ul>
            </div>

            <section id="acceptance" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-brand-dark">1. Acceptance of Terms</h2>
              <p className="mb-4 text-brand-slate">
                By accessing or using the Sanghos platform, you agree to be bound by these Terms of Service and our Privacy Policy. 
                If you do not agree to these terms, please do not use our services.
              </p>
              <p className="mb-4 text-brand-slate">
                We may update these terms from time to time. Your continued use of our platform after changes are posted constitutes 
                acceptance of the updated terms.
              </p>
            </section>

            <section id="description" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-brand-dark">2. Description of Service</h2>
              <p className="mb-4 text-brand-slate">
                Sanghos is a platform that connects wellness seekers with daylong retreat experiences hosted in unique private spaces. 
                Our services include:
              </p>
              <ul className="list-disc pl-6 mb-4 text-brand-slate">
                <li>Retreat discovery and booking platform</li>
                <li>Community features for wellness discussions</li>
                <li>Wellness journal and personal tracking tools</li>
                <li>Payment processing for retreat bookings</li>
                <li>Customer support and communication services</li>
              </ul>
            </section>

            <section id="user-accounts" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-brand-dark">3. User Accounts</h2>
              <h3 className="text-xl font-semibold mb-3 text-brand-dark">Account Creation</h3>
              <p className="mb-4 text-brand-slate">
                To use certain features of our platform, you must create an account with accurate and complete information. 
                You are responsible for maintaining the confidentiality of your account credentials.
              </p>
              
              <h3 className="text-xl font-semibold mb-3 text-brand-dark">Account Responsibilities</h3>
              <ul className="list-disc pl-6 mb-4 text-brand-slate">
                <li>Provide accurate and current information</li>
                <li>Maintain the security of your password</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </section>

            <section id="bookings-payments" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-brand-dark">4. Bookings and Payments</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-brand-dark">Booking Process</h3>
              <p className="mb-4 text-brand-slate">
                When you book a retreat through our platform:
              </p>
              <ul className="list-disc pl-6 mb-4 text-brand-slate">
                <li>You enter into a direct agreement with the retreat host</li>
                <li>Sanghos facilitates the booking and payment processing</li>
                <li>All retreat details, including location and activities, are provided by the host</li>
                <li>Confirmation is subject to host approval and availability</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-brand-dark">Payment Terms</h3>
              <ul className="list-disc pl-6 mb-4 text-brand-slate">
                <li>Payment is required at the time of booking</li>
                <li>We use secure third-party payment processors</li>
                <li>All prices are in USD unless otherwise specified</li>
                <li>Additional fees may apply for payment processing</li>
              </ul>
            </section>

            <section id="cancellation" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-brand-dark">5. Cancellation and Refunds</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-brand-dark">User Cancellations</h3>
              <ul className="list-disc pl-6 mb-4 text-brand-slate">
                <li>Cancellations made 48+ hours before the retreat: Full refund minus processing fees</li>
                <li>Cancellations made 24-48 hours before: 50% refund</li>
                <li>Cancellations made less than 24 hours before: No refund</li>
                <li>Emergency circumstances may be considered on a case-by-case basis</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-brand-dark">Host Cancellations</h3>
              <p className="mb-4 text-brand-slate">
                If a host cancels a retreat, you will receive a full refund and we will attempt to help you find alternative options.
              </p>
            </section>

            <section id="user-conduct" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-brand-dark">6. User Conduct</h2>
              <p className="mb-4 text-brand-slate">When using our platform, you agree not to:</p>
              <ul className="list-disc pl-6 mb-4 text-brand-slate">
                <li>Violate any applicable laws or regulations</li>
                <li>Post harmful, offensive, or inappropriate content</li>
                <li>Harass, threaten, or abuse other users</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use our platform for commercial purposes without permission</li>
                <li>Provide false or misleading information</li>
                <li>Interfere with the proper functioning of our platform</li>
              </ul>
            </section>

            <section id="intellectual-property" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-brand-dark">7. Intellectual Property</h2>
              <p className="mb-4 text-brand-slate">
                The Sanghos platform, including all content, features, and functionality, is owned by Sanghos and is protected by 
                copyright, trademark, and other intellectual property laws.
              </p>
              
              <h3 className="text-xl font-semibold mb-3 text-brand-dark">User Content</h3>
              <p className="mb-4 text-brand-slate">
                You retain ownership of content you post on our platform, but grant us a license to use, display, and distribute 
                such content as necessary to provide our services.
              </p>
            </section>

            <section id="disclaimers" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-brand-dark">8. Disclaimers</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
                <p className="text-yellow-800 font-semibold mb-2">Health and Wellness Disclaimer</p>
                <p className="text-yellow-700">
                  Our retreats and wellness content are for general informational purposes only and are not intended as medical advice. 
                  Consult with healthcare professionals before participating in any wellness activities, especially if you have health concerns.
                </p>
              </div>

              <p className="mb-4 text-brand-slate">
                Our platform is provided "as is" without warranties of any kind. We do not guarantee:
              </p>
              <ul className="list-disc pl-6 mb-4 text-brand-slate">
                <li>Uninterrupted or error-free service</li>
                <li>The accuracy of retreat information provided by hosts</li>
                <li>The quality or safety of retreat experiences</li>
                <li>Compatibility with all devices or browsers</li>
              </ul>
            </section>

            <section id="limitation-liability" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-brand-dark">9. Limitation of Liability</h2>
              <p className="mb-4 text-brand-slate">
                To the fullest extent permitted by law, Sanghos and its affiliates shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities.
              </p>
              <p className="mb-4 text-brand-slate">
                Our total liability to you for any claims arising from your use of our platform shall not exceed the amount you 
                paid to us in the twelve months preceding the claim.
              </p>
            </section>

            <section id="termination" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-brand-dark">10. Termination</h2>
              <p className="mb-4 text-brand-slate">
                We may terminate or suspend your account and access to our platform at any time, with or without notice, for any reason, 
                including violation of these terms.
              </p>
              <p className="mb-4 text-brand-slate">
                You may terminate your account at any time by contacting us. Upon termination, your right to use our platform will 
                cease immediately.
              </p>
            </section>

            <section id="governing-law" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-brand-dark">11. Governing Law</h2>
              <p className="mb-4 text-brand-slate">
                These terms shall be governed by and construed in accordance with the laws of the State of California, without regard 
                to its conflict of law principles. Any disputes arising from these terms or your use of our platform shall be resolved 
                in the courts of San Francisco, California.
              </p>
            </section>

            <section id="contact" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-brand-dark">12. Contact Information</h2>
              <p className="mb-4 text-brand-slate">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-sand-50 p-4 rounded-lg">
                <p className="mb-2"><strong>Email:</strong> legal@sanghos.com</p>
                <p className="mb-2"><strong>Address:</strong> 123 Wellness Way, San Francisco, CA 94105</p>
                <p><strong>Phone:</strong> (415) 555-2671</p>
              </div>
            </section>

            <div className="border-t border-sand-200 pt-6 mt-8">
              <p className="text-sm text-brand-slate">
                These Terms of Service constitute the entire agreement between you and Sanghos regarding your use of our platform 
                and supersede all prior agreements and understandings.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default TermsOfService;
