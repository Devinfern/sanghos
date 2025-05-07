
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users } from 'lucide-react';

const ForumPage = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-6 text-brand-dark">Community Forum</h1>
            <p className="text-lg mb-8 text-brand-dark/80">
              Connect with fellow wellness enthusiasts, share your experiences, and learn from others.
            </p>
            <div className="bg-brand-light p-8 rounded-lg border border-brand-sand/20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center">
                  <MessageSquare size={32} className="text-brand-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-brand-dark">Coming Soon</h2>
                <p className="text-center text-muted-foreground max-w-md">
                  Our community forum is under construction and will be available soon. 
                  Connect, share, and grow with like-minded individuals.
                </p>
                <div className="mt-4 flex gap-4">
                  <Button className="bg-brand-primary hover:bg-brand-primary/90">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Join the Waitlist
                  </Button>
                  <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary/5">
                    <Users className="mr-2 h-4 w-4" />
                    Explore Community
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ForumPage;
