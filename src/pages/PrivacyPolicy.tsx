
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Sanghos</title>
        <meta name="description" content="Privacy Policy for Sanghos - Learn how we collect, use, and protect your personal information." />
      </Helmet>

      <Header />

      <main className="bg-white">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 py-16 my-[64px]">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold mb-8 text-brand-dark">Privacy Policy</h1>
            <p className="text-brand-slate mb-8">
              <strong>Last updated:</strong> December 15, 2024
            </p>

            <div className="bg-brand-subtle/10 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold mb-4 text-brand-dark">Table of Contents</h2>
              <ul className="space-y-2">
                <li><a href="#information-we-collect" className="text-brand-primary hover:underline">1. Information We Collect</a></li>
                <li><a href="#how-we-use" className="text-brand-primary hover:underline">2. How We Use Your Information</a></li>
                <li><a href="#information-sharing" className="text-brand-primary hover:underline">3. Information Sharing</a></li>
                <li><a href="#data-security" className="text-brand-primary hover:underline">4. Data Security</a></li>
                <li><a href="#cookies" className="text-brand-primary hover:underline">5. Cookies and Tracking</a></li>
                <li><a href="#your-rights" className="text-brand-primary hover:underline">6. Your Rights</a></li>
                <li><a href="#contact" className="text-brand-primary hover:underline">7. Contact Information</a></li>
              </ul>
            </div>

            <section id="information-we-collect" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-brand-dark">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-brand-dark">Personal Information</h3>
              <p className="mb-4 text-brand-slate">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-brand-slate">
                <li>Name, email address, phone number</li>
                <li>Account credentials and profile information</li>
                <li>Payment information (processed securely through third-party processors)</li>
                <li>Retreat booking preferences and dietary restrictions</li>
                <li>Community posts and wellness journal entries</li>
                <li>Communication with our support team</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-brand-dark">Usage Information</h3>
              <p className="mb-4 text-brand-slate">
                We automatically collect information about your use of our platform:
              </p>
              <ul className="list-disc pl-6 mb-4 text-brand-slate">
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage patterns and preferences</li>
                <li>Pages visited and time spent on our platform</li>
                <li>Search queries and retreat interactions</li>
              </ul>
            </section>

            <section id="how-we-use" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-brand-dark">2. How We Use Your Information</h2>
              <p className="mb-4 text-brand-slate">We use your information to:</p>
              <ul className="list-disc pl-6 mb-4 text-brand-slate">
                <li>Provide and improve our wellness retreat platform</li>
                <li>Process retreat bookings and payments</li>
                <li>Send you important updates about your bookings</li>
                <li>Deliver our wellness newsletter (with your consent)</li>
                <li>Personalize retreat recommendations</li>
                <li>Facilitate community interactions</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Ensure platform security and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section id="information-sharing" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-brand-dark">3. Information Sharing</h2>
              <p className="mb-4 text-brand-slate">
                We do not sell, trade, or rent your personal information. We may share your information only in these circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 text-brand-slate">
                <li><strong>With retreat hosts:</strong> When you book a retreat, we share necessary information for the retreat experience</li>
                <li><strong>Service providers:</strong> Third-party vendors who help us operate our platform (payment processors, email services)</li>
                <li><strong>Legal requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Business transfers:</strong> In connection with any merger, sale, or acquisition of our company</li>
                <li><strong>With your consent:</strong> Any other sharing with your explicit permission</li>
              </ul>
            </section>

            <section id="data-security" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-brand-dark">4. Data Security</h2>
              <p className="mb-4 text-brand-slate">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc pl-6 mb-4 text-brand-slate">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Limited access to personal information on a need-to-know basis</li>
                <li>Secure payment processing through PCI-compliant providers</li>
              </ul>
            </section>

            <section id="cookies" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-brand-dark">5. Cookies and Tracking</h2>
              <p className="mb-4 text-brand-slate">
                We use cookies and similar technologies to enhance your experience on our platform. These help us:
              </p>
              <ul className="list-disc pl-6 mb-4 text-brand-slate">
                <li>Remember your preferences and login status</li>
                <li>Analyze platform usage to improve our services</li>
                <li>Provide personalized content and recommendations</li>
                <li>Ensure platform security</li>
              </ul>
              <p className="mb-4 text-brand-slate">
                You can control cookie settings through your browser preferences. Note that disabling certain cookies may limit platform functionality.
              </p>
            </section>

            <section id="your-rights" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-brand-dark">6. Your Rights</h2>
              <p className="mb-4 text-brand-slate">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 mb-4 text-brand-slate">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Restriction:</strong> Limit how we use your information</li>
                <li><strong>Objection:</strong> Object to certain types of data processing</li>
                <li><strong>Withdrawal:</strong> Withdraw consent for newsletter and marketing communications</li>
              </ul>
              <p className="mb-4 text-brand-slate">
                To exercise these rights, please contact us using the information below.
              </p>
            </section>

            <section id="contact" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-brand-dark">7. Contact Information</h2>
              <p className="mb-4 text-brand-slate">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-sand-50 p-4 rounded-lg">
                <p className="mb-2"><strong>Email:</strong> privacy@sanghos.com</p>
                <p className="mb-2"><strong>Address:</strong> 123 Wellness Way, San Francisco, CA 94105</p>
                <p><strong>Phone:</strong> (415) 555-2671</p>
              </div>
            </section>

            <div className="border-t border-sand-200 pt-6 mt-8">
              <p className="text-sm text-brand-slate">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by email or through our platform. 
                Your continued use of our services after any changes indicates your acceptance of the updated policy.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
