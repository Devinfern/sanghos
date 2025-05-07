
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Pages
import Index from '@/pages/Index';
import Pricing from '@/pages/Pricing';
import Community from '@/pages/Community';
import AboutUs from '@/pages/About';
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
import CommunityTeaser from '@/pages/CommunityTeaser';
import JoinNow from '@/pages/JoinNow';
import UserDashboard from '@/pages/UserDashboard';

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
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/retreats" element={<Retreats />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/retreat/:retreatId" element={<RetreatDetailsPage />} />
            <Route path="/wellness-journal" element={<WellnessJournalPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<JoinNow />} />
            <Route path="/community-teaser" element={<CommunityTeaser />} />
            
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
            <Route path="/admin/cms" element={<AdminProtectedRoute><AdminCMS /></AdminProtectedRoute>} />
            <Route path="/retreat-management" element={<AdminProtectedRoute><RetreatManagementCMS /></AdminProtectedRoute>} />

            {/* Community CMS Route */}
            <Route path="/community/cms" element={<CommunityCMS />} />

            {/* Catch all for unknown routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HostProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
