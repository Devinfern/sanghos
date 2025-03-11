
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Forum from "./pages/Forum";
import ForumSpaceDetails from "./pages/ForumSpaceDetails";
import { HostProvider } from "./contexts/HostContext";

// Host Portal Pages
import HostLogin from "./pages/host/HostLogin";
import HostRegister from "./pages/host/HostRegister";
import HostDashboard from "./pages/host/HostDashboard";
import HostRetreats from "./pages/host/HostRetreats";
import HostSpaces from "./pages/host/HostSpaces";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
            <Route path="/forum" element={<Forum />} />
            <Route path="/forum/space/:slug" element={<ForumSpaceDetails />} />
            
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
