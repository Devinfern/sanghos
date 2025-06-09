
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import InsightLAEventLoader from '@/components/InsightLAEventLoader';
import ScrollToTop from '@/components/ScrollToTop';

// Pages
import Index from '@/pages/Index';
import Pricing from '@/pages/Pricing';
import Community from '@/pages/Community';
import AboutUs from '@/pages/About';
import AboutDesignOne from '@/pages/AboutDesignOne';
import AboutDesignTwo from '@/pages/AboutDesignTwo';
import ContactUs from '@/pages/Contact';
import RetreatDetailsPage from '@/pages/RetreatDetails';
import WellnessJournalPage from '@/pages/WellnessJournalPage';
import ForumPage from '@/pages/ForumPage';
import AdminCMS from '@/pages/AdminCMS';
import CommunityCMS from '@/pages/CommunityCMS';
import RetreatManagementCMS from '@/pages/RetreatManagementCMS';
import NotFound from '@/pages/NotFound';
import Retreats from '@/pages/Retreats';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import CommunityTeaser from '@/pages/CommunityTeaser';
import JoinNow from '@/pages/JoinNow';
import UserDashboard from '@/pages/UserDashboard';
import OnboardingPage from '@/pages/OnboardingPage';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import RetreatCommunity from '@/pages/RetreatCommunity';

// Host pages
import HostDashboard from '@/pages/host/HostDashboard';
import HostRetreats from '@/pages/host/HostRetreats';
import HostRetreatNew from '@/pages/host/HostRetreatNew';
import HostRetreatEdit from '@/pages/host/HostRetreatEdit';
import HostLogin from '@/pages/host/HostLogin';
import HostSignup from '@/pages/host/HostSignup';

// Context providers
import { AuthProvider } from '@/contexts/AuthContext';
import { HostProvider } from '@/contexts/HostContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import AdminProtectedRoute from '@/components/AdminProtectedRoute';

// Add global styles
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <HostProvider>
          <Toaster richColors />
          {/* Add the InsightLA Event Loader */}
          <InsightLAEventLoader />
          {/* Add the ScrollToTop component */}
          <ScrollToTop />
          <style>{`
            .glass-morphism {
              background: rgba(255, 255, 255, 0.7);
              backdrop-filter: blur(10px);
              -webkit-backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.18);
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
            }

            body {
              background-color: #f8f9fa;
            }
          `}</style>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/retreats" element={<Retreats />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about-us" element={<AboutUs />} />
            {/* Add route for /about that redirects to /about-us */}
            <Route path="/about" element={<Navigate to="/about-us" replace />} />
            <Route path="/about-design-1" element={<AboutDesignOne />} />
            <Route path="/about-design-2" element={<AboutDesignTwo />} />
            <Route path="/contact-us" element={<ContactUs />} />
            
            {/* Legal pages */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            
            {/* Blog routes */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            
            {/* Important: Update both routes for retreats for backward compatibility */}
            <Route path="/retreat/:id" element={<RetreatDetailsPage />} />
            <Route path="/retreats/:id" element={<RetreatDetailsPage />} />
            
            {/* NEW: Individual retreat community routes */}
            <Route path="/community/retreats/:retreatId" element={<RetreatCommunity />} />
            <Route path="/community/retreats/:retreatId/pre" element={<RetreatCommunity />} />
            <Route path="/community/retreats/:retreatId/post" element={<RetreatCommunity />} />
            
            <Route path="/wellness-journal" element={<WellnessJournalPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/join" element={<JoinNow />} />
            <Route path="/community-teaser" element={<CommunityTeaser />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            
            {/* Dashboard route - protected */}
            <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />

            {/* Host Routes */}
            <Route path="/host/login" element={<HostLogin />} />
            <Route path="/host/signup" element={<HostSignup />} />
            <Route path="/host/dashboard" element={<HostDashboard />} />
            <Route path="/host/retreats" element={<HostRetreats />} />
            <Route path="/host/retreats/new" element={<HostRetreatNew />} />
            <Route path="/host/retreats/edit/:retreatId" element={<HostRetreatEdit />} />

            {/* Admin Routes */}
            <Route 
              path="/admin/cms" 
              element={
                <AdminProtectedRoute>
                  <AdminCMS />
                </AdminProtectedRoute>
              } 
            />
            <Route 
              path="/retreat-management" 
              element={
                <AdminProtectedRoute>
                  <RetreatManagementCMS />
                </AdminProtectedRoute>
              } 
            />

            {/* Community CMS Route - this should also be admin protected */}
            <Route 
              path="/community/cms" 
              element={
                <AdminProtectedRoute>
                  <CommunityCMS />
                </AdminProtectedRoute>
              }
            />

            {/* Catch all for unknown routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HostProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
