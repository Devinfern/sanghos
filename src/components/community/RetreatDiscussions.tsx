import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommunityPost from "./CommunityPost";
import { motion } from "framer-motion";
import EmptyDiscussionState from "./EmptyDiscussionState";
import CreatePost from "./CreatePost";
import { useRetreatPosts } from "@/hooks/useRetreatPosts";
import { Badge } from "@/components/ui/badge";
import RichContentEditor from "./RichContentEditor";

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

interface RetreatDiscussionsProps {
  retreatId: string;
  phase?: "pre" | "during" | "post";
}

const RetreatDiscussions = ({ retreatId, phase = "pre" }: RetreatDiscussionsProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { posts, isLoading, error, refetch: refetchPosts } = useRetreatPosts(retreatId);
  
  if (isLoading) {
    return <div className="p-4 text-center">Loading discussions...</div>;
  }
  
  if (error) {
    return <div className="p-4 text-center text-red-500">Error loading discussions</div>;
  }

  // Filter posts by phase and map them to include the missing 'likes' field
  const formattedPosts: Post[] = posts
    .filter(post => !post.phase_type || post.phase_type === phase)
    .map(post => ({
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
      phase_type: post.phase_type || phase,
      retreat_id: post.retreat_id || retreatId
    }));

  const handlePostCreated = (postData: any) => {
    // Create new post with rich content
    const newPost: Post = {
      id: Date.now().toString(),
      title: postData.title,
      content: postData.content,
      user_id: "current-user",
      author_name: "You",
      created_at: new Date().toISOString(),
      category: 'general',
      likes: [],
      likes_count: 0,
      comments_count: 0,
      tags: postData.tags || [],
      phase_type: phase,
      retreat_id: retreatId
    };

    // Add to local state (in real app, would save to Supabase)
    const currentPosts = filterPostsByCategory(activeTab);
    // Update posts state here
    
    setShowCreatePost(false);
    refetchPosts();
  };

  const getPhaseSpecificCategories = () => {
    switch (phase) {
      case "pre":
        return [
          { key: "all", label: "All Discussions", count: formattedPosts.length },
          { key: "questions", label: "Questions", count: formattedPosts.filter(p => p.category === 'question').length },
          { key: "travel", label: "Travel & Logistics", count: formattedPosts.filter(p => p.category === 'travel').length },
          { key: "preparation", label: "Preparation", count: formattedPosts.filter(p => p.category === 'preparation').length },
        ];
      case "during":
        return [
          { key: "all", label: "All Discussions", count: formattedPosts.length },
          { key: "insights", label: "Insights & Reflections", count: formattedPosts.filter(p => p.category === 'insights').length },
          { key: "support", label: "Support & Encouragement", count: formattedPosts.filter(p => p.category === 'support').length },
          { key: "moments", label: "Special Moments", count: formattedPosts.filter(p => p.category === 'moments').length },
        ];
      case "post":
        return [
          { key: "all", label: "All Discussions", count: formattedPosts.length },
          { key: "reflections", label: "Reflections", count: formattedPosts.filter(p => p.category === 'reflections').length },
          { key: "integration", label: "Integration", count: formattedPosts.filter(p => p.category === 'integration').length },
          { key: "connections", label: "Staying Connected", count: formattedPosts.filter(p => p.category === 'connections').length },
        ];
      default:
        return [
          { key: "all", label: "All Discussions", count: formattedPosts.length },
          { key: "questions", label: "Questions", count: formattedPosts.filter(p => p.category === 'question').length },
          { key: "tips", label: "Tips & Advice", count: formattedPosts.filter(p => p.category === 'tip').length },
          { key: "journal", label: "Journal Entries", count: formattedPosts.filter(p => p.category === 'journal').length },
        ];
    }
  };

  const categories = getPhaseSpecificCategories();

  const filterPostsByCategory = (category: string) => {
    if (category === "all") return formattedPosts;
    
    // Map category keys to actual post categories
    const categoryMap: { [key: string]: string } = {
      questions: "question",
      tips: "tip",
      journal: "journal",
      travel: "travel",
      preparation: "preparation",
      insights: "insights",
      support: "support",
      moments: "moments",
      reflections: "reflections",
      integration: "integration",
      connections: "connections"
    };
    
    return formattedPosts.filter(post => post.category === categoryMap[category]);
  };

  return (
    <div className="mt-6">
      {showCreatePost ? (
        <RichContentEditor
          onSubmit={handlePostCreated}
          onCancel={() => setShowCreatePost(false)}
          placeholder={`Share your thoughts about the ${phase}-retreat experience...`}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">
                {phase.charAt(0).toUpperCase() + phase.slice(1)}-Retreat Discussions
              </h2>
              <p className="text-sm text-muted-foreground">
                {phase === "pre" && "Connect and prepare with your fellow participants"}
                {phase === "during" && "Share your experience as it unfolds"}
                {phase === "post" && "Reflect and stay connected after your retreat"}
              </p>
            </div>
            <button
              onClick={() => setShowCreatePost(true)}
              className="px-4 py-2 bg-brand-primary text-white rounded-lg text-sm hover:bg-brand-primary/90 transition-colors"
            >
              New Post
            </button>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 w-full justify-start overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.key}
                  value={category.key} 
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  {category.label}
                  {category.count > 0 && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {category.count}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category.key} value={category.key}>
                {(() => {
                  const filteredPosts = filterPostsByCategory(category.key);
                  
                  return filteredPosts.length > 0 ? (
                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {filteredPosts.map((post) => (
                        <CommunityPost key={post.id} post={post as any} />
                      ))}
                    </motion.div>
                  ) : (
                    <EmptyDiscussionState 
                      category={category.label.toLowerCase()} 
                      onCreatePost={() => setShowCreatePost(true)} 
                    />
                  );
                })()}
              </TabsContent>
            ))}
          </Tabs>
        </>
      )}
    </div>
  );
};

export default RetreatDiscussions;
