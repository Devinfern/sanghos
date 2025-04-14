import { useState, useEffect } from "react";
import { forumEvents, trendingPosts, loadForumEvents, loadTrendingPosts } from "@/lib/forumData";
import CommunityLayout from "@/components/layouts/CommunityLayout";
import CommunityContent from "@/components/community/CommunityContent";
import CommunityManagement from "@/components/community/CommunityManagement";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { toast } from "sonner";

const CommunityPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { isAdmin, isLoading: isAdminLoading } = useAdminStatus();
  const [showCMS, setShowCMS] = useState<boolean>(false);
  const [currentEvents, setCurrentEvents] = useState(forumEvents);
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
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      const userString = localStorage.getItem("sanghos_user");
      setIsLoggedIn(userString !== null);
    };
    
    checkLoginStatus();
  }, []);

  useEffect(() => {
    setCurrentEvents(forumEvents);
  }, [forumEvents]);

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
          <div className="animate-pulse">
            <div className="h-8 bg-brand-subtle rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-brand-subtle rounded w-1/2 mx-auto mb-8"></div>
            <div className="h-32 bg-brand-subtle rounded w-full max-w-md mx-auto"></div>
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
        trendingPosts={trendingPosts}
        onSectionChange={setActiveSection}
        onToggleCMS={toggleCMS}
      />
    </CommunityLayout>
  );
};

export default CommunityPage;
