
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
import CommunityTeaser from "@/pages/CommunityTeaser";
import ScrollToTop from "@/components/ScrollToTop";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Index />
      </>
    ),
    errorElement: <NotFound />
  },
  {
    path: "/about",
    element: (
      <>
        <ScrollToTop />
        <About />
      </>
    )
  },
  {
    path: "/contact",
    element: (
      <>
        <ScrollToTop />
        <Contact />
      </>
    )
  },
  {
    path: "/retreats",
    element: (
      <>
        <ScrollToTop />
        <Retreats />
      </>
    )
  },
  {
    path: "/retreat/:slug",
    element: (
      <>
        <ScrollToTop />
        <Retreat />
      </>
    )
  },
  {
    path: "/signup",
    element: (
      <>
        <ScrollToTop />
        <SignUp />
      </>
    )
  },
  {
    path: "/login",
    element: (
      <>
        <ScrollToTop />
        <Login />
      </>
    )
  },
  {
    path: "/dashboard",
    element: (
      <>
        <ScrollToTop />
        <UserDashboard />
      </>
    )
  },
  {
    path: "/onboarding",
    element: (
      <>
        <ScrollToTop />
        <Onboarding />
      </>
    )
  },
  {
    path: "/community",
    element: (
      <>
        <ScrollToTop />
        <Community />
      </>
    )
  },
  {
    path: "/community-teaser",
    element: (
      <>
        <ScrollToTop />
        <CommunityTeaser />
      </>
    )
  },
  {
    path: "/community/:slug",
    element: (
      <>
        <ScrollToTop />
        <CommunitySpaceDetails />
      </>
    )
  },
  {
    path: "/community/retreat/:retreatId",
    element: (
      <>
        <ScrollToTop />
        <RetreatCommunity />
      </>
    )
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
