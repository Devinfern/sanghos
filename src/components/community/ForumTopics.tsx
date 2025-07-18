
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, MessageSquare, Users, Loader2 } from "lucide-react";
import ForumTopicDiscussion from "./ForumTopicDiscussion";
import { forumSpaces, forumPosts, loadForumSpaces, loadForumPosts } from "@/lib/forumData";
import { motion } from "framer-motion";

const ForumTopics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [spacesByCategory, setSpacesByCategory] = useState<Record<string, any[]>>({});

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([loadForumSpaces(), loadForumPosts()]);
      
      // Group spaces by category
      const categories: Record<string, any[]> = { all: [] };
      
      forumSpaces.forEach(categoryGroup => {
        categories[categoryGroup.name.toLowerCase()] = categoryGroup.spaces;
        categories.all = [...categories.all, ...categoryGroup.spaces];
      });
      
      setSpacesByCategory(categories);
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  // Filter spaces based on search query
  const filteredSpaces = activeCategory === 'all'
    ? spacesByCategory.all || []
    : spacesByCategory[activeCategory] || [];
  
  const matchingSpaces = searchQuery.trim() === ''
    ? filteredSpaces
    : filteredSpaces.filter(space => 
        space.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (space.description && space.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  // Find related posts for each space
  const getSpacePosts = (spaceName: string) => {
    return forumPosts.filter(post => post.postedIn === spaceName).slice(0, 2);
  };

  // Get unique categories for tabs
  const categories = Object.keys(spacesByCategory).filter(cat => cat !== 'all');

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary mb-4" />
        <p className="text-muted-foreground">Loading topics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search spaces..."
            className="pl-9 pr-9 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 rounded-full" 
              onClick={() => setSearchQuery("")}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        <Button 
          className="flex items-center space-x-2 bg-gradient-to-r from-brand-primary to-brand-primary/90 hover:from-brand-primary/90 hover:to-brand-primary shadow-sm hover:shadow-md transition-all duration-300 rounded-full"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Create Space</span>
        </Button>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveCategory}>
        <TabsList className="mb-6 overflow-auto flex w-full justify-start space-x-1 pb-1 bg-transparent">
          <TabsTrigger 
            value="all" 
            className="px-4 rounded-full data-[state=active]:bg-brand-primary data-[state=active]:text-white"
          >
            All Topics
          </TabsTrigger>
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="px-4 whitespace-nowrap rounded-full data-[state=active]:bg-brand-primary data-[state=active]:text-white"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeCategory}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {matchingSpaces.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchingSpaces.map(space => (
                  <motion.div key={space.name} variants={fadeIn}>
                    <ForumTopicDiscussion 
                      space={space} 
                      recentPosts={getSpacePosts(space.name)}
                      participantCount={Math.floor(Math.random() * 30) + 5}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div variants={fadeIn} className="text-center py-12 border rounded-lg bg-white">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium mb-1">No matching topics found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? 'Try a different search term' : 'There are no topics in this category yet'}
                </p>
                <Button 
                  className="bg-gradient-to-r from-brand-primary to-brand-primary/90 hover:from-brand-primary/90 hover:to-brand-primary shadow-sm hover:shadow-md transition-all rounded-full"
                >
                  Create a new topic
                </Button>
              </motion.div>
            )}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ForumTopics;
