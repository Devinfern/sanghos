
import { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { 
  forumSpaces as initialForumSpaces, 
  forumPosts as initialForumPosts, 
  forumEvents as initialForumEvents, 
  trendingPosts as initialTrendingPosts,
  updateForumSpaces, 
  updateForumPosts, 
  updateForumEvents, 
  updateTrendingPosts,
  loadForumSpaces,
  loadForumPosts,
  loadForumEvents,
  loadTrendingPosts
} from "@/lib/forumData";
import { SpacesTab } from "@/components/forum-cms/SpacesTab";
import { PostsTab } from "@/components/forum-cms/PostsTab";
import { EventsTab } from "@/components/forum-cms/EventsTab";
import { TrendingTab } from "@/components/forum-cms/TrendingTab";

const ForumCMS = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [forumSpaces, setForumSpaces] = useState(initialForumSpaces);
  const [forumPosts, setForumPosts] = useState(initialForumPosts);
  const [forumEvents, setForumEvents] = useState(initialForumEvents);
  const [trendingPosts, setTrendingPosts] = useState(initialTrendingPosts);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          loadForumSpaces(),
          loadForumPosts(),
          loadForumEvents(),
          loadTrendingPosts()
        ]);
        
        setForumSpaces([...initialForumSpaces]);
        setForumPosts([...initialForumPosts]);
        setForumEvents([...initialForumEvents]);
        setTrendingPosts([...initialTrendingPosts]);
      } catch (error) {
        console.error("Error loading forum data:", error);
        toast.error("Failed to load forum data");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAllData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading content...</span>
      </div>
    );
  }

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await Promise.all([
        updateForumSpaces(forumSpaces),
        updateForumPosts(forumPosts),
        updateForumEvents(forumEvents),
        updateTrendingPosts(trendingPosts)
      ]);
      
      toast.success("All changes saved successfully");
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto py-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Forum Content Management System</CardTitle>
          <CardDescription>
            Easily manage all your forum content in one place
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={handleSaveAll} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving Changes...
              </>
            ) : (
              'Save All Changes'
            )}
          </Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="spaces">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="spaces">Spaces & Categories</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>

        <TabsContent value="spaces">
          <SpacesTab />
        </TabsContent>

        <TabsContent value="posts">
          <PostsTab />
        </TabsContent>

        <TabsContent value="events">
          <EventsTab />
        </TabsContent>

        <TabsContent value="trending">
          <TrendingTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ForumCMS;
