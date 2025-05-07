
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Pages
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Community from './pages/Community';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import RetreatDetailsPage from './pages/RetreatDetailsPage';
import WellnessJournalPage from './pages/WellnessJournalPage';
import ForumPage from './pages/ForumPage';
import AdminCMS from './pages/AdminCMS';
import CommunityCMS from './pages/CommunityCMS';
import RetreatManagementCMS from './pages/RetreatManagementCMS';

// Host pages
import HostDashboard from './pages/host/HostDashboard';
import HostRetreats from './pages/host/HostRetreats';
import HostRetreatNew from './pages/host/HostRetreatNew';
import HostRetreatEdit from './pages/host/HostRetreatEdit';
import HostLogin from './pages/host/HostLogin';
import HostSignup from './pages/host/HostSignup';

// Context providers
import { AuthProvider } from './contexts/AuthContext';
import { HostProvider } from './contexts/HostContext';

// Components
import AdminProtectedRoute from './components/AdminProtectedRoute';

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
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/retreat/:retreatId" element={<RetreatDetailsPage />} />
            <Route path="/wellness-journal" element={<WellnessJournalPage />} />
            <Route path="/forum" element={<ForumPage />} />

            {/* Host Routes */}
            <Route path="/host/login" element={<HostLogin />} />
            <Route path="/host/signup" element={<HostSignup />} />
            <Route path="/host/dashboard" element={<HostDashboard />} />
            <Route path="/host/retreats" element={<HostRetreats />} />
            <Route path="/host/retreats/new" element={<HostRetreatNew />} />
            <Route path="/host/retreats/edit/:retreatId" element={<HostRetreatEdit />} />

            {/* Admin Routes */}
            <Route path="/admin/cms" element={<AdminCMS />} />
            <Route path="/retreat-management" element={<RetreatManagementCMS />} />

            {/* Community CMS Route */}
            <Route path="/community/cms" element={<CommunityCMS />} />
          </Routes>
        </HostProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
