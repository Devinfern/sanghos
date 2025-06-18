
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
import CommunityTeaser from "./pages/CommunityTeaser";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserDashboard from "./pages/UserDashboard";
import Community from "./pages/Community";
import BecomeHost from "./pages/BecomeHost";
import TeachWithUs from "./pages/TeachWithUs";
import WellnessStudios from "./pages/WellnessStudios";
import NotFound from "./pages/NotFound";

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
              <Route path="/retreats" element={<Retreats />} />
              <Route path="/retreats/:id" element={<Retreat />} />
              <Route path="/retreat/:id" element={<RetreatDetails />} />
              <Route path="/wellness-studios" element={<WellnessStudios />} />
              <Route path="/community-teaser" element={<CommunityTeaser />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/blog/mindfulness-news-june-2025" element={<BlogPostMindfulnessNews />} />
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
