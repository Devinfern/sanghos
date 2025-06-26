import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { HostProvider } from "@/contexts/HostContext";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";
import { ProtectedRoute } from "./components/ProtectedRoute";
import HostProtectedRoute from "./components/HostProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Retreats from "./pages/Retreats";
import Retreat from "./pages/Retreat";
import RetreatDetails from "./pages/RetreatDetails";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogPostMindfulnessNews from "./pages/BlogPostMindfulnessNews";
import BlogPostWellnessRetreats from "./pages/BlogPostWellnessRetreats";
import BlogPostBreathingTechniques from "./pages/BlogPostBreathingTechniques";
import BlogPostForestBathing from "./pages/BlogPostForestBathing";
import BlogPostMeditationPrep from "./pages/BlogPostMeditationPrep";
import BlogPostMorningRituals from "./pages/BlogPostMorningRituals";
import BlogPostYogaBeginners from "./pages/BlogPostYogaBeginners";
import BlogPostDigitalDetox from "./pages/BlogPostDigitalDetox";
import BlogPostSoundHealing from "./pages/BlogPostSoundHealing";
import CommunityTeaser from "./pages/CommunityTeaser";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserDashboard from "./pages/UserDashboard";
import Community from "./pages/Community";
import BecomeHost from "./pages/BecomeHost";
import TeachWithUs from "./pages/TeachWithUs";
import WellnessStudios from "./pages/WellnessStudios";
import Pricing from "./pages/Pricing";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import WellnessJournalPage from "./pages/WellnessJournalPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <HostProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ai-retreat-finder" element={<WellnessJournalPage />} />
              <Route path="/retreats" element={<Retreats />} />
              <Route path="/retreats/:id" element={<Retreat />} />
              <Route path="/retreat/:id" element={<RetreatDetails />} />
              <Route path="/wellness-studios" element={<WellnessStudios />} />
              <Route path="/community-teaser" element={<CommunityTeaser />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/blog/mindfulness-news-june-2025" element={<BlogPostMindfulnessNews />} />
              <Route path="/blog/wellness-retreats-modern-burnout-solution" element={<BlogPostWellnessRetreats />} />
              <Route path="/blog/mindful-breathing-techniques" element={<BlogPostBreathingTechniques />} />
              <Route path="/blog/forest-bathing-guide" element={<BlogPostForestBathing />} />
              <Route path="/blog/meditation-retreat-preparation" element={<BlogPostMeditationPrep />} />
              <Route path="/blog/morning-wellness-rituals" element={<BlogPostMorningRituals />} />
              <Route path="/blog/yoga-beginners-guide" element={<BlogPostYogaBeginners />} />
              <Route path="/blog/digital-detox-guide" element={<BlogPostDigitalDetox />} />
              <Route path="/blog/sound-healing-benefits" element={<BlogPostSoundHealing />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/become-host" element={<BecomeHost />} />
              <Route path="/teach-with-us" element={<TeachWithUs />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              } />
              <Route path="/community" element={
                <ProtectedRoute>
                  <Community />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HostProvider>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
