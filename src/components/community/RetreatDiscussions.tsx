
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommunityPost from "./CommunityPost";
import { motion } from "framer-motion";
import EmptyDiscussionState from "./EmptyDiscussionState";
import CreatePost from "./CreatePost";
import { useRetreatPosts } from "@/hooks/useRetreatPosts";

// Define the Post type to match what's expected
interface Post {
  id: string;
  title: string;
  content: string;
  user_id: string;
  author_name: string;
  created_at: string;
  category: string;
  likes: any[]; // Array for compatibility with CommunityPost component
  likes_count: number;
  comments_count: number;
  tags: string[];
  phase_type: string;
  retreat_id: string;
}

interface CreatePostProps {
  onPostCreated: () => void;
  retreatId: string;
  onCancel?: () => void; // Make onCancel optional
}

interface EmptyDiscussionStateProps {
  category?: string;
  onCreatePost: () => void;
}

const RetreatDiscussions = ({ retreatId }: { retreatId: string }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { posts, isLoading, error, refetch: refetchPosts } = useRetreatPosts(retreatId);
  
  if (isLoading) {
    return <div className="p-4 text-center">Loading discussions...</div>;
  }
  
  if (error) {
    return <div className="p-4 text-center text-red-500">Error loading discussions</div>;
  }

  // Map the posts to include the missing 'likes' field
  const formattedPosts: Post[] = posts.map(post => ({
    id: post.id,
    title: post.title,
    content: post.content,
    user_id: post.user_id,
    author_name: post.author_name,
    created_at: post.created_at,
    category: post.category || 'general',
    likes: [], // Add empty likes array to satisfy the Post type
    likes_count: post.likes || 0,
    comments_count: post.comments || 0,
    tags: post.tags || [],
    phase_type: post.phase_type || 'general',
    retreat_id: post.retreat_id || retreatId
  }));

  const handlePostCreated = () => {
    setShowCreatePost(false);
    refetchPosts();
  };

  return (
    <div className="mt-6">
      {showCreatePost ? (
        <CreatePost 
          onCancel={() => setShowCreatePost(false)}
          onPostCreated={handlePostCreated}
          retreatId={retreatId}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Discussions</h2>
            <button
              onClick={() => setShowCreatePost(true)}
              className="px-4 py-2 bg-brand-primary text-white rounded-md text-sm"
            >
              New Post
            </button>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="tips">Tips & Advice</TabsTrigger>
              <TabsTrigger value="journal">Journal Entries</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {formattedPosts.length > 0 ? (
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {formattedPosts.map((post) => (
                    <CommunityPost key={post.id} post={post as any} />
                  ))}
                </motion.div>
              ) : (
                <EmptyDiscussionState onCreatePost={() => setShowCreatePost(true)} />
              )}
            </TabsContent>
            
            <TabsContent value="questions">
              {formattedPosts.filter(post => post.category === 'question').length > 0 ? (
                <div className="space-y-4">
                  {formattedPosts
                    .filter(post => post.category === 'question')
                    .map((post) => (
                      <CommunityPost key={post.id} post={post as any} />
                    ))}
                </div>
              ) : (
                <EmptyDiscussionState category="questions" onCreatePost={() => setShowCreatePost(true)} />
              )}
            </TabsContent>
            
            <TabsContent value="tips">
              {formattedPosts.filter(post => post.category === 'tip').length > 0 ? (
                <div className="space-y-4">
                  {formattedPosts
                    .filter(post => post.category === 'tip')
                    .map((post) => (
                      <CommunityPost key={post.id} post={post as any} />
                    ))}
                </div>
              ) : (
                <EmptyDiscussionState category="tips and advice" onCreatePost={() => setShowCreatePost(true)} />
              )}
            </TabsContent>
            
            <TabsContent value="journal">
              {formattedPosts.filter(post => post.category === 'journal').length > 0 ? (
                <div className="space-y-4">
                  {formattedPosts
                    .filter(post => post.category === 'journal')
                    .map((post) => (
                      <CommunityPost key={post.id} post={post as any} />
                    ))}
                </div>
              ) : (
                <EmptyDiscussionState category="journal entries" onCreatePost={() => setShowCreatePost(true)} />
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default RetreatDiscussions;
