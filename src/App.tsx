
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
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/blog/mindfulness-news-june-2025" element={<BlogPostMindfulnessNews />} />
            </Routes>
          </HostProvider>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
