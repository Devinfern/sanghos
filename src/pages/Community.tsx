import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { 
  MessageSquare, 
  Calendar, 
  Users, 
  Plus, 
  MoreHorizontal, 
  Heart, 
  MessageCircle, 
  Bookmark,
  ChevronDown,
  Search,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { 
  forumSpaces, 
  forumPosts as initialPosts, 
  forumEvents, 
  trendingPosts,
  loadForumSpaces,
  loadForumPosts,
  loadForumEvents,
  loadTrendingPosts,
  updateForumPosts
} from "@/lib/forumData";
import ForumPostEditor from "@/components/ForumPostEditor";
import ForumCMS from "@/components/ForumCMS";
import { ForumPost } from "@/lib/forumData";
import CommunityHero from "@/components/community/CommunityHero";
import CommunityNavigation from "@/components/community/CommunityNavigation";
import CommunityStats from "@/components/community/CommunityStats";
import CommunityDiscussions from "@/components/community/CommunityDiscussions";
import CommunityEvents from "@/components/community/CommunityEvents";
import CommunityResources from "@/components/community/CommunityResources";
import CommunityMembers from "@/components/community/CommunityMembers";

const CommunityPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);
  const [showCMS, setShowCMS] = useState<boolean>(false);
  const [currentEvents, setCurrentEvents] = useState(forumEvents);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState("discussions");
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        loadForumSpaces(),
        loadForumPosts(),
        loadForumEvents(),
        loadTrendingPosts()
      ]);
      setPosts(initialPosts);
      setCurrentEvents(forumEvents);
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      const userString = localStorage.getItem("sanghos_user");
      const mockLoggedIn = userString !== null;
      setIsLoggedIn(mockLoggedIn);
      
      if (mockLoggedIn && userString) {
        try {
          const userData = JSON.parse(userString);
          setIsAdmin(userData.isAdmin || userData.email === "admin@sanghos.com");
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    };
    
    checkLoginStatus();
  }, []);

  useEffect(() => {
    setCurrentEvents(forumEvents);
  }, [forumEvents]);

  const handlePostCreated = async (newPost: ForumPost) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    await updateForumPosts(updatedPosts);
    toast.success("Post created successfully!");
  };

  const toggleCMS = () => {
    if (!isAdmin) {
      toast.error("You need admin privileges to access the CMS");
      return;
    }
    setShowCMS(!showCMS);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "discussions":
        return (
          <CommunityDiscussions 
            posts={posts}
            isLoggedIn={isLoggedIn}
            onPostCreated={handlePostCreated}
          />
        );
      case "events":
        return <CommunityEventsPage events={currentEvents} />;
      case "resources":
        return <CommunityResourcesPage />;
      case "members":
        return <CommunityMembersPage />;
      default:
        return null;
    }
  };

  if (showCMS && isAdmin) {
    return (
      <>
        <Helmet>
          <title>Community Management | Sanghos</title>
        </Helmet>
        <Header />
        <main className="pt-24 pb-16 min-h-screen bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-brand-dark">Community Management</h1>
              <Button onClick={toggleCMS} className="bg-brand-primary hover:bg-brand-primary/90 text-white">
                Back to Community
              </Button>
            </div>
            <ForumCMS />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-brand-subtle/20 to-white">
          <div className="container mx-auto px-4 text-center py-12">
            <div className="animate-pulse">
              <div className="h-8 bg-brand-subtle rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-brand-subtle rounded w-1/2 mx-auto mb-8"></div>
              <div className="h-32 bg-brand-subtle rounded w-full max-w-md mx-auto"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Community | Sanghos</title>
        <meta name="description" content="Join our community for discussions, events, and more" />
      </Helmet>

      <main className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-brand-subtle/20 to-white">
        <CommunityHero />
        <CommunityStats />
        
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mb-8">
            <CommunityNavigation 
              activeSection={activeSection} 
              onSectionChange={setActiveSection} 
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-64 w-full shrink-0">
              <div className="sticky top-24 space-y-8">
                <CommunityResources />
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-brand-dark">
                  {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                </h1>
                {isAdmin && (
                  <Button variant="outline" onClick={toggleCMS} className="border-brand-primary text-brand-primary hover:bg-brand-primary/5">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Content
                  </Button>
                )}
              </div>

              {renderActiveSection()}
            </div>

            <div className="lg:w-80 w-full shrink-0">
              <div className="sticky top-24 space-y-6">
                <CommunityEvents events={currentEvents} />
                <CommunityMembers trendingPosts={trendingPosts} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CommunityPage;
