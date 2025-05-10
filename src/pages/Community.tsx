
import { useState, useEffect } from "react";
import { forumEvents, trendingPosts, loadForumEvents, loadTrendingPosts } from "@/lib/forumData";
import CommunityLayout from "@/components/layouts/CommunityLayout";
import CommunityContent from "@/components/community/CommunityContent";
import CommunityManagement from "@/components/community/CommunityManagement";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const CommunityPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { isAdmin, isLoading: isAdminLoading } = useAdminStatus();
  const [showCMS, setShowCMS] = useState<boolean>(false);
  const [currentEvents, setCurrentEvents] = useState(forumEvents);
  const [currentTrendingPosts, setCurrentTrendingPosts] = useState(trendingPosts);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState("discussions");

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        loadForumEvents(),
        loadTrendingPosts()
      ]);
      setCurrentEvents(forumEvents);
      setCurrentTrendingPosts(trendingPosts);
      setIsLoading(false);
    };
    
    loadData();

    // Set up real-time subscriptions
    const eventsChannel = supabase
      .channel('public:forum_events')
      .on('postgres_changes', {
        event: '*', // Listen to all events
        schema: 'public',
        table: 'forum_events'
      }, () => {
        // Reload events when any changes occur
        console.log('Real-time events update detected, reloading...');
        loadForumEvents().then(() => {
          setCurrentEvents([...forumEvents]);
        });
      })
      .subscribe();
      
    const trendingChannel = supabase
      .channel('public:trending_posts')
      .on('postgres_changes', {
        event: '*', // Listen to all events
        schema: 'public',
        table: 'trending_posts'
      }, () => {
        // Reload trending posts when any changes occur
        console.log('Real-time trending posts update detected, reloading...');
        loadTrendingPosts().then(() => {
          setCurrentTrendingPosts([...trendingPosts]);
        });
      })
      .subscribe();

    // Check login status
    const checkLoginStatus = () => {
      const userString = localStorage.getItem("sanghos_user");
      setIsLoggedIn(userString !== null);
    };
    
    checkLoginStatus();
    
    return () => {
      supabase.removeChannel(eventsChannel);
      supabase.removeChannel(trendingChannel);
    };
  }, []);

  const toggleCMS = () => {
    if (!isAdmin) {
      toast.error("You need admin privileges to access the CMS");
      return;
    }
    setShowCMS(!showCMS);
  };

  if (isLoading || isAdminLoading) {
    return (
      <CommunityLayout>
        <div className="container mx-auto px-4 text-center py-12">
          <div className="animate-pulse flex flex-col space-y-4 items-center">
            <div className="h-8 bg-brand-subtle/50 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-brand-subtle/50 rounded w-1/2 mx-auto"></div>
            <div className="h-32 bg-brand-subtle/50 rounded w-full max-w-xl mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              <div className="h-24 bg-brand-subtle/50 rounded"></div>
              <div className="h-24 bg-brand-subtle/50 rounded"></div>
              <div className="h-24 bg-brand-subtle/50 rounded"></div>
            </div>
          </div>
        </div>
      </CommunityLayout>
    );
  }

  if (showCMS && isAdmin) {
    return (
      <CommunityLayout title="Community Management" showCMS={true}>
        <CommunityManagement onBack={toggleCMS} />
      </CommunityLayout>
    );
  }

  return (
    <CommunityLayout>
      <CommunityContent
        isAdmin={isAdmin}
        isLoggedIn={isLoggedIn}
        activeSection={activeSection}
        currentEvents={currentEvents}
        trendingPosts={currentTrendingPosts}
        onSectionChange={setActiveSection}
        onToggleCMS={toggleCMS}
      />
    </CommunityLayout>
  );
};

export default CommunityPage;
