
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CommunityTeaser = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-16 flex-1">
        <section className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Join Our Wellness Community</h1>
          <p className="text-xl mb-8">
            Connect with like-minded individuals on their wellness journey, share experiences,
            and learn from our community of practitioners and retreat participants.
          </p>
          
          <div className="bg-sage-50 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-semibold mb-4">Member Benefits</h2>
            <ul className="space-y-3 text-left max-w-md mx-auto mb-6">
              <li className="flex items-start">
                <span className="mr-2 text-primary">✓</span>
                Access to exclusive community discussions
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">✓</span>
                Connect with retreat participants before and after events
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">✓</span>
                Share your wellness journey with supportive members
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary">✓</span>
                Early access to new retreats and special discounts
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/join">Join Sanghos</Link>
              </Button>
            </div>
          </div>
          
          <p className="text-muted-foreground">
            Already a member? <Link to="/login" className="text-primary hover:underline">Sign in here</Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CommunityTeaser;
