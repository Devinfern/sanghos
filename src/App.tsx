import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '@/pages/Account';
import Home from '@/pages/Home';
import Pricing from '@/pages/Pricing';
import Community from '@/pages/Community';
import AboutUs from '@/pages/AboutUs';
import ContactUs from '@/pages/ContactUs';
import HostDashboard from '@/pages/host/HostDashboard';
import HostRetreats from '@/pages/host/HostRetreats';
import HostRetreatNew from '@/pages/host/HostRetreatNew';
import HostRetreatEdit from '@/pages/host/HostRetreatEdit';
import HostLogin from '@/pages/host/HostLogin';
import HostSignup from '@/pages/host/HostSignup';
import RetreatDetailsPage from '@/pages/RetreatDetailsPage';
import WellnessJournalPage from '@/pages/WellnessJournalPage';
import ForumPage from '@/pages/ForumPage';
import AdminCMS from '@/pages/AdminCMS';
import { Toaster } from "sonner"
import { Loader2 } from "lucide-react";
import DashboardAdmin from '@/components/dashboard/DashboardAdmin';
import CommunityCMS from '@/pages/CommunityCMS';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';
import { HostProvider } from '@/contexts/HostContext';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import RetreatManagementCMS from '@/pages/RetreatManagementCMS';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <Router>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={session}
      >
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

              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />

              {/* Host Routes */}
              <Route path="/host/login" element={<HostLogin />} />
              <Route path="/host/signup" element={<HostSignup />} />
              <Route
                path="/host/dashboard"
                element={
                  <ProtectedRoute>
                    <HostDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/retreats"
                element={
                  <ProtectedRoute>
                    <HostRetreats />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/retreats/new"
                element={
                  <ProtectedRoute>
                    <HostRetreatNew />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/host/retreats/edit/:retreatId"
                element={
                  <ProtectedRoute>
                    <HostRetreatEdit />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route path="/admin/cms" element={<AdminCMS />} />
              <Route path="/retreat-management" element={<RetreatManagementCMS />} />

              {/* Community CMS Route */}
              <Route path="/community/cms" element={<CommunityCMS />} />
            </Routes>
          </HostProvider>
        </AuthProvider>
      </SessionContextProvider>
    </Router>
  );
}

export default App;
