
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Community from "./pages/Community";
import Retreats from "./pages/Retreats";
import RetreatCommunity from "./pages/RetreatCommunity";
import HostDashboard from "./pages/host/HostDashboard";
import HostRetreats from "./pages/host/HostRetreats";
import HostLogin from "./pages/host/HostLogin";
import HostSignup from "./pages/host/HostSignup";
import HostRetreatNew from "./pages/host/HostRetreatNew";
import HostRetreatEdit from "./pages/host/HostRetreatEdit";
import CommunityEventsPage from "./components/community/CommunityEventsPage";
import ForumCMS from "./components/ForumCMS";
import HostProtectedRoute from "./components/HostProtectedRoute";
import AdminCMS from "./pages/AdminCMS";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserDashboard from "./pages/UserDashboard";
import { useAdminStatus } from "./hooks/useAdminStatus";

// Admin protected route component
const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, isLoading } = useAdminStatus();

  // Show loading state while checking
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If not admin, redirect to dashboard
  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  // If admin, render the children
  return <>{children}</>;
};

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add a slight delay before showing content for smoother transitions
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/events" element={<CommunityEventsPage />} />
        <Route path="/community/cms" element={<ForumCMS />} />
        <Route path="/community/retreat/:retreatId" element={<RetreatCommunity />} />
        <Route path="/retreats" element={<Retreats />} />
        <Route path="/retreat/:retreatId" element={<RetreatCommunity />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        
        <Route path="/host/login" element={<HostLogin />} />
        <Route path="/host/signup" element={<HostSignup />} />
        
        <Route element={<HostProtectedRoute />}>
          <Route path="/host/dashboard" element={<HostDashboard />} />
          <Route path="/host/retreats" element={<HostRetreats />} />
          <Route path="/host/retreats/new" element={<HostRetreatNew />} />
          <Route path="/host/retreats/edit/:retreatId" element={<HostRetreatEdit />} />
        </Route>

        {/* Wrap the admin route with protection */}
        <Route path="/admin/cms" element={
          <AdminProtectedRoute>
            <AdminCMS />
          </AdminProtectedRoute>
        } />
      </Routes>
      <ScrollToTop />
      <Toaster position="top-center" />
    </Router>
  );
}

export default App;
