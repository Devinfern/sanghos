import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import Retreats from "@/pages/Retreats";
import Retreat from "@/pages/Retreat";
import SignUp from "@/pages/SignUp";
import Login from "@/pages/Login";
import UserDashboard from "@/pages/UserDashboard";
import Onboarding from "@/pages/Onboarding";
import Community from "@/pages/Community";
import CommunitySpaceDetails from "@/pages/CommunitySpaceDetails";
import RetreatCommunity from "@/pages/RetreatCommunity";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/retreats",
    element: <Retreats />
  },
  {
    path: "/retreat/:slug",
    element: <Retreat />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <UserDashboard />
  },
  {
    path: "/onboarding",
    element: <Onboarding />
  },
  {
    path: "/community",
    element: <Community />
  },
  {
    path: "/community/:slug",
    element: <CommunitySpaceDetails />
  },
  {
    path: "/community/retreat/:retreatId",
    element: <RetreatCommunity />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
