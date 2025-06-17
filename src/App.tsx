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
import ProtectedRoute from "./components/ProtectedRoute";
import HostProtectedRoute from "./components/HostProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Retreats from "./pages/Retreats";
import Retreat from "./pages/Retreat";
import HostDashboard from "./pages/HostDashboard";
import HostRetreat from "./pages/HostRetreat";
import HostRetreatEdit from "./pages/HostRetreatEdit";
import HostNewRetreat from "./pages/HostNewRetreat";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminRetreats from "./pages/AdminRetreats";
import AdminHosts from "./pages/AdminHosts";
import AdminCategories from "./pages/AdminCategories";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogPostMindfulnessNews from "./pages/BlogPostMindfulnessNews";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <HostProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/retreats" element={<Retreats />} />
              <Route path="/retreats/:id" element={<Retreat />} />
              <Route path="/host/dashboard" element={<HostProtectedRoute><HostDashboard /></HostProtectedRoute>} />
              <Route path="/host/retreats/:id" element={<HostProtectedRoute><HostRetreat /></HostProtectedRoute>} />
              <Route path="/host/retreats/:id/edit" element={<HostProtectedRoute><HostRetreatEdit /></HostProtectedRoute>} />
              <Route path="/host/retreats/new" element={<HostProtectedRoute><HostNewRetreat /></HostProtectedRoute>} />
              <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
              <Route path="/admin/users" element={<AdminProtectedRoute><AdminUsers /></AdminProtectedRoute>} />
              <Route path="/admin/retreats" element={<AdminProtectedRoute><AdminRetreats /></AdminProtectedRoute>} />
              <Route path="/admin/hosts" element={<AdminProtectedRoute><AdminHosts /></AdminProtectedRoute>} />
              <Route path="/admin/categories" element={<AdminProtectedRoute><AdminCategories /></AdminProtectedRoute>} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/blog/mindfulness-news-june-2025" element={<BlogPostMindfulnessNews />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HostProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
