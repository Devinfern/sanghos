
import { Post } from "@/types/community";
import { Card } from "@/components/ui/card";
import CommunityPost from "./CommunityPost";
import { Skeleton } from "@/components/ui/skeleton";

interface PostListProps {
  posts: Post[];
  isLoading: boolean;
  onPostUpdate: () => void;
}

const PostList = ({ posts, isLoading, onPostUpdate }: PostListProps) => {
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

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <CommunityPost 
          key={post.id}
          post={post}
          onPostUpdate={onPostUpdate}
        />
      ))}
    </div>
  );
};

export default PostList;
