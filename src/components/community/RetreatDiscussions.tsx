
import { useState } from 'react';
import { RetreatPhase } from "@/types/community";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { toast } from "sonner";
import CommunitySearchFilter from "./CommunitySearchFilter";
import CreatePost from "./CreatePost";
import PhaseTabs from "./PhaseTabs";
import PostList from "./PostList";
import EmptyDiscussionState from "./EmptyDiscussionState";
import { useRetreatPosts } from "@/hooks/useRetreatPosts";

interface RetreatDiscussionsProps {
  retreatId?: string;
  retreatName?: string;
  isLoggedIn: boolean;
}

const RetreatDiscussions = ({ retreatId, retreatName, isLoggedIn }: RetreatDiscussionsProps) => {
  const [activePhase, setActivePhase] = useState<RetreatPhase>("pre");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { isAdmin } = useAdminStatus();
  
  // Use our custom hook for fetching posts with real-time updates
  const { posts, isLoading, error, refetch } = useRetreatPosts(retreatId || "");

  const createSpace = async () => {
    if (!isAdmin) {
      toast.error("Only administrators can create spaces");
      return;
    }

    if (!retreatId) {
      toast.error("Retreat ID is required");
      return;
    }

    toast.info("This feature will be available soon");
  };

  // Filter posts based on search query and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <PhaseTabs 
          activePhase={activePhase} 
          onPhaseChange={setActivePhase} 
          retreatName={retreatName} 
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <CommunitySearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
          />
        </div>
        {isLoggedIn && (
          <div className="w-full md:w-48">
            <CreatePost 
              onPostCreated={refetch} 
              retreatId={retreatId || ""} 
              retreatPhase={activePhase} 
            />
          </div>
        )}
      </div>

      <PostList 
        posts={filteredPosts} 
        isLoading={isLoading} 
        onPostUpdate={refetch} 
      />
      
      {!isLoading && filteredPosts.length === 0 && (
        <EmptyDiscussionState 
          isLoggedIn={isLoggedIn} 
          isAdmin={isAdmin} 
          onCreateSpace={createSpace} 
        />
      )}
    </div>
  );
};

export default RetreatDiscussions;
