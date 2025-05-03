import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import { HostProvider } from "./contexts/HostContext";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import Account from "./pages/Account";
import HostProtectedRoute from "./components/HostProtectedRoute";
import CommunityEventsPage from "./components/community/CommunityEventsPage";
import ForumCMS from "./components/ForumCMS";
import DashboardAdmin from "./components/dashboard/DashboardAdmin";
import AdminCMS from "./pages/AdminCMS";

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
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />

        <Route path="/host/login" element={<HostLogin />} />
        <Route path="/host/signup" element={<HostSignup />} />
        
        <Route element={<HostProtectedRoute />}>
          <Route path="/host/dashboard" element={<HostDashboard />} />
          <Route path="/host/retreats" element={<HostRetreats />} />
          <Route path="/host/retreats/new" element={<HostRetreatNew />} />
          <Route path="/host/retreats/edit/:retreatId" element={<HostRetreatEdit />} />
        </Route>
        <Route path="/admin/cms" element={<AdminCMS />} />
      </Routes>
      <ScrollToTop />
      <Toaster position="top-center" />
    </Router>
  );
}

export default App;
