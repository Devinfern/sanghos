
import { Post } from "@/types/community";
import CommunityPost from "./CommunityPost";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface PostListProps {
  posts: Post[];
  isLoading: boolean;
  onPostUpdate: () => void;
}

const PostList = ({ posts, isLoading, onPostUpdate }: PostListProps) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-morphism p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-6 w-3/4 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <motion.div 
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {posts.map((post) => (
        <motion.div key={post.id} variants={item}>
          <CommunityPost 
            post={post}
            onPostUpdate={onPostUpdate}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PostList;
