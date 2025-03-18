
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Retreats from "./pages/Retreats";
import Instructors from "./pages/Instructors";
import RetreatDetails from "./pages/RetreatDetails";
import InstructorProfile from "./pages/InstructorProfile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import JoinNow from "./pages/JoinNow";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Community from "./pages/Community";
import CommunityTeaser from "./pages/CommunityTeaser";
import CommunitySpaceDetails from "./pages/CommunitySpaceDetails";
import { HostProvider } from "./contexts/HostContext";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";

// Host Portal Pages
import HostLogin from "./pages/host/HostLogin";
import HostRegister from "./pages/host/HostRegister";
import HostDashboard from "./pages/host/HostDashboard";
import HostRetreats from "./pages/host/HostRetreats";
import HostSpaces from "./pages/host/HostSpaces";

const queryClient = new QueryClient();

// Protected route function
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("sanghos_user") !== null;
  if (!isLoggedIn) {
    return <Navigate to="/community-teaser" />;
  }
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <HostProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/retreats" element={<Retreats />} />
            <Route path="/instructors" element={<Instructors />} />
            <Route path="/retreat/:id" element={<RetreatDetails />} />
            <Route path="/instructor/:id" element={<InstructorProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/join" element={<JoinNow />} />
            <Route path="/community-teaser" element={<CommunityTeaser />} />
            
            {/* Protected Routes */}
            <Route 
              path="/community" 
              element={
                <ProtectedRoute>
                  <Community />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/community/space/:slug" 
              element={
                <ProtectedRoute>
                  <CommunitySpaceDetails />
                </ProtectedRoute>
              } 
            />
            
            {/* Host Portal Routes */}
            <Route path="/host/login" element={<HostLogin />} />
            <Route path="/host/register" element={<HostRegister />} />
            <Route path="/host/dashboard" element={<HostDashboard />} />
            <Route path="/host/retreats" element={<HostRetreats />} />
            <Route path="/host/spaces" element={<HostSpaces />} />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HostProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
