import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import About from "./pages/About";
import Retreats from "./pages/Retreats";
import RetreatDetails from "./pages/RetreatDetails";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserDashboard from "./pages/UserDashboard";
import Booking from "./pages/Booking";
import CheckoutPage from "./pages/CheckoutPage";
import NotFound from "./pages/NotFound";
import AdminCMS from "./pages/AdminCMS";
import CommunityCMS from "./pages/CommunityCMS";
import Community from "./pages/Community";
import CommunityTeaser from "./pages/CommunityTeaser";
import CommunityBenefits from "./pages/CommunityBenefits";
import CommunitySpaceDetails from "./pages/CommunitySpaceDetails";
import RetreatCommunity from "./pages/RetreatCommunity";
import WellnessJournalPage from "./pages/WellnessJournalPage";
import JoinNow from "./pages/JoinNow";
import OnboardingPage from "./pages/OnboardingPage";
import Pricing from "./pages/Pricing";
import Instructors from "./pages/Instructors";
import InstructorProfile from "./pages/InstructorProfile";
import Retreat from "./pages/Retreat";
import RetreatManagementCMS from "./pages/RetreatManagementCMS";
import ForumPage from "./pages/ForumPage";
import AboutDesignOne from "./pages/AboutDesignOne";
import AboutDesignTwo from "./pages/AboutDesignTwo";
import Onboarding from "./pages/Onboarding";

// Host pages
import HostLogin from "./pages/host/HostLogin";
import HostRegister from "./pages/host/HostRegister";
import HostSignup from "./pages/host/HostSignup";
import HostDashboard from "./pages/host/HostDashboard";
import HostRetreats from "./pages/host/HostRetreats";
import HostRetreatNew from "./pages/host/HostRetreatNew";
import HostRetreatEdit from "./pages/host/HostRetreatEdit";
import HostSpaces from "./pages/host/HostSpaces";

import { ProtectedRoute } from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import HostProtectedRoute from "./components/HostProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import InsightLAEventLoader from "./components/InsightLAEventLoader";
import { AuthProvider } from "./contexts/AuthContext";
import { HostProvider } from "./contexts/HostContext";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <HostProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <InsightLAEventLoader />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/about-design-one" element={<AboutDesignOne />} />
                  <Route path="/about-design-two" element={<AboutDesignTwo />} />
                  <Route path="/retreats" element={<Retreats />} />
                  <Route path="/retreat/:id" element={<RetreatDetails />} />
                  <Route path="/retreat-page/:id" element={<Retreat />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/join" element={<JoinNow />} />
                  <Route path="/onboarding" element={<OnboardingPage />} />
                  <Route path="/onboarding-flow" element={<Onboarding />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/instructors" element={<Instructors />} />
                  <Route path="/instructor/:id" element={<InstructorProfile />} />
                  <Route path="/community-teaser" element={<CommunityTeaser />} />
                  <Route path="/community-benefits" element={<CommunityBenefits />} />
                  <Route path="/forum" element={<ForumPage />} />
                  
                  {/* Protected Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <UserDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/community"
                    element={
                      <ProtectedRoute>
                        <Community />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/community/space/:spaceId"
                    element={
                      <ProtectedRoute>
                        <CommunitySpaceDetails />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/retreat/:id/community"
                    element={
                      <ProtectedRoute>
                        <RetreatCommunity />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/journal"
                    element={
                      <ProtectedRoute>
                        <WellnessJournalPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/booking/:id"
                    element={
                      <ProtectedRoute>
                        <Booking />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <CheckoutPage />
                      </ProtectedRoute>
                    }
                  />
                  
                  {/* Admin Routes */}
                  <Route
                    path="/admin"
                    element={
                      <AdminProtectedRoute>
                        <AdminCMS />
                      </AdminProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/community"
                    element={
                      <AdminProtectedRoute>
                        <CommunityCMS />
                      </AdminProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/retreats"
                    element={
                      <AdminProtectedRoute>
                        <RetreatManagementCMS />
                      </AdminProtectedRoute>
                    }
                  />

                  {/* Host Routes */}
                  <Route path="/host/login" element={<HostLogin />} />
                  <Route path="/host/register" element={<HostRegister />} />
                  <Route path="/host/signup" element={<HostSignup />} />
                  <Route
                    path="/host/dashboard"
                    element={
                      <HostProtectedRoute>
                        <HostDashboard />
                      </HostProtectedRoute>
                    }
                  />
                  <Route
                    path="/host/retreats"
                    element={
                      <HostProtectedRoute>
                        <HostRetreats />
                      </HostProtectedRoute>
                    }
                  />
                  <Route
                    path="/host/retreats/new"
                    element={
                      <HostProtectedRoute>
                        <HostRetreatNew />
                      </HostProtectedRoute>
                    }
                  />
                  <Route
                    path="/host/retreats/:id/edit"
                    element={
                      <HostProtectedRoute>
                        <HostRetreatEdit />
                      </HostProtectedRoute>
                    }
                  />
                  <Route
                    path="/host/spaces"
                    element={
                      <HostProtectedRoute>
                        <HostSpaces />
                      </HostProtectedRoute>
                    }
                  />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </HostProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
