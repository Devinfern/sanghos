import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { HostProvider } from "@/contexts/HostContext";
import ScrollToTop from "@/components/ScrollToTop";

// Page imports
import Index from "@/pages/Index";
import About from "@/pages/About";
import BecomeHost from "@/pages/BecomeHost";
import TeachWithUs from "@/pages/TeachWithUs";
import Retreats from "@/pages/Retreats";
import RetreatDetails from "@/pages/RetreatDetails";
import Instructors from "@/pages/Instructors";
import InstructorProfile from "@/pages/InstructorProfile";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import UserDashboard from "@/pages/UserDashboard";
import Community from "@/pages/Community";
import RetreatCommunity from "@/pages/RetreatCommunity";
import CommunitySpaceDetails from "@/pages/CommunitySpaceDetails";
import CommunityCMS from "@/pages/CommunityCMS";
import AdminCMS from "@/pages/AdminCMS";
import RetreatManagementCMS from "@/pages/RetreatManagementCMS";
import WellnessJournalPage from "@/pages/WellnessJournalPage";
import Onboarding from "@/pages/Onboarding";
import OnboardingPage from "@/pages/OnboardingPage";
import JoinNow from "@/pages/JoinNow";
import Booking from "@/pages/Booking";
import CheckoutPage from "@/pages/CheckoutPage";
import NotFound from "@/pages/NotFound";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Pricing from "@/pages/Pricing";
import CommunityTeaser from "@/pages/CommunityTeaser";
import ForumPage from "@/pages/ForumPage";

// Host pages
import HostLogin from "@/pages/host/HostLogin";
import HostSignup from "@/pages/host/HostSignup";
import HostRegister from "@/pages/host/HostRegister";
import HostDashboard from "@/pages/host/HostDashboard";
import HostRetreats from "@/pages/host/HostRetreats";
import HostRetreatNew from "@/pages/host/HostRetreatNew";
import HostRetreatEdit from "@/pages/host/HostRetreatEdit";
import HostSpaces from "@/pages/host/HostSpaces";

// Protected route components
import { ProtectedRoute } from "@/components/ProtectedRoute";
import HostProtectedRoute from "@/components/HostProtectedRoute";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <HostProvider>
            <ScrollToTop />
            <div className="min-h-screen bg-white">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/become-host" element={<BecomeHost />} />
                <Route path="/teach-with-us" element={<TeachWithUs />} />
                <Route path="/retreats" element={<Retreats />} />
                <Route path="/retreat/:id" element={<RetreatDetails />} />
                <Route path="/instructors" element={<Instructors />} />
                <Route path="/instructor/:id" element={<InstructorProfile />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/join" element={<JoinNow />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/community-teaser" element={<CommunityTeaser />} />
                
                {/* USER Protected routes - these already work, so we leave them as is. */}
                <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
                <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
                <Route path="/retreat/:id/community" element={<ProtectedRoute><RetreatCommunity /></ProtectedRoute>} />
                <Route path="/community/space/:spaceId" element={<ProtectedRoute><CommunitySpaceDetails /></ProtectedRoute>} />
                <Route path="/journal" element={<ProtectedRoute><WellnessJournalPage /></ProtectedRoute>} />
                <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
                <Route path="/onboarding-flow" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
                <Route path="/booking/:retreatId" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
                <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                <Route path="/forum" element={<ProtectedRoute><ForumPage /></ProtectedRoute>} />
                
                {/* Public Host routes */}
                <Route path="/host/login" element={<HostLogin />} />
                <Route path="/host/signup" element={<HostSignup />} />
                <Route path="/host/register" element={<HostRegister />} />

                {/* HOST Protected routes - Fixed to fix build errors */}
                <Route path="/host/dashboard" element={<HostProtectedRoute><HostDashboard /></HostProtectedRoute>} />
                <Route path="/host/retreats" element={<HostProtectedRoute><HostRetreats /></HostProtectedRoute>} />
                <Route path="/host/retreats/new" element={<HostProtectedRoute><HostRetreatNew /></HostProtectedRoute>} />
                <Route path="/host/retreats/:id/edit" element={<HostProtectedRoute><HostRetreatEdit /></HostProtectedRoute>} />
                <Route path="/host/spaces" element={<HostProtectedRoute><HostSpaces /></HostProtectedRoute>} />

                {/* ADMIN Protected routes - Fixed to fix build errors */}
                <Route path="/admin/cms" element={<AdminProtectedRoute><AdminCMS /></AdminProtectedRoute>} />
                <Route path="/admin/community" element={<AdminProtectedRoute><CommunityCMS /></AdminProtectedRoute>} />
                <Route path="/admin/retreats" element={<AdminProtectedRoute><RetreatManagementCMS /></AdminProtectedRoute>} />
                
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Toaster />
          </HostProvider>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
