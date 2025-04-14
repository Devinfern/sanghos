
import { useState } from "react";
import { Card } from "@/components/ui/card";
import CreatePost from "./CreatePost";
import CommunityPost from "./CommunityPost";
import CommunitySearchFilter from "./CommunitySearchFilter";
import { useCommunityPosts } from "@/hooks/useCommunityPosts";

interface CommunityDiscussionsProps {
  isLoggedIn: boolean;
}

const CommunityDiscussions = ({ isLoggedIn }: CommunityDiscussionsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { posts, isLoading, currentUserId, fetchPosts } = useCommunityPosts(searchQuery, categoryFilter);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="animate-pulse space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
            <CreatePost onPostCreated={fetchPosts} />
          </div>
        )}
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <CommunityPost
            key={post.id}
            post={post}
            currentUserId={currentUserId}
            onPostUpdate={fetchPosts}
          />
        ))}
        {posts.length === 0 && (
          <Card className="p-8 text-center">
            <h3 className="text-lg font-medium mb-2">No posts found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || categoryFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Be the first to start a discussion!"}
            </p>
            {isLoggedIn && <CreatePost onPostCreated={fetchPosts} />}
          </Card>
        )}
      </div>
    </div>
  );
};

export default CommunityDiscussions;
