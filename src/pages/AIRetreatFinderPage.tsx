import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnhancedConversationalFinder from '@/components/ai/EnhancedConversationalFinder';

const AIRetreatFinderPage = () => {
  const [initialQuery, setInitialQuery] = useState('');
  const [userLocation, setUserLocation] = useState('San Francisco, CA');

  useEffect(() => {
    // Get initial query from session storage
    const storedQuery = sessionStorage.getItem('aiRetreatFinderQuery');
    if (storedQuery) {
      setInitialQuery(storedQuery);
      sessionStorage.removeItem('aiRetreatFinderQuery');
    }

    // Get user location if available
    const storedLocation = localStorage.getItem('userLocation');
    if (storedLocation) {
      setUserLocation(storedLocation);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>AI Retreat Finder | Sanghos</title>
        <meta 
          name="description" 
          content="Find your perfect wellness retreat with AI-powered recommendations tailored to your preferences."
        />
      </Helmet>

      <Header />
      
      <main className="min-h-screen pt-24 bg-gradient-to-b from-white to-sage-50/30">
        <div className="container px-4 md:px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-brand-dark mb-4">
              AI Retreat Finder
            </h1>
            <p className="text-lg text-sage-600 max-w-2xl mx-auto">
              Let our AI assistant help you discover the perfect wellness retreat 
              based on your unique preferences and needs.
            </p>
          </div>
          
          <EnhancedConversationalFinder
            userLocation={userLocation}
            initialQuery={initialQuery}
            variant="fullscreen"
          />
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default AIRetreatFinderPage;