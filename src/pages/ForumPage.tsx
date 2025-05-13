
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { loadForumSpaces, loadForumPosts, loadTrendingPosts } from '@/lib/api/forum';
import { ForumSpace, ForumPost, TrendingPost, ForumCategory } from '@/lib/types/community';
import { motion } from 'framer-motion';

const ForumPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [spaces, setSpaces] = useState<ForumSpace[]>([]);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [trending, setTrending] = useState<TrendingPost[]>([]);
  const [activeTab, setActiveTab] = useState('discussions');

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          loadForumSpaces(),
          loadForumPosts(),
          loadTrendingPosts()
        ]);
        
        // These would be populated from the imported state after loading
        import('@/lib/api/forum').then(({ forumSpaces, forumPosts, trendingPosts }) => {
          // Convert ForumCategory[] to ForumSpace[] by flattening the structure
          const allSpaces: ForumSpace[] = [];
          if (Array.isArray(forumSpaces)) {
            forumSpaces.forEach((category: ForumCategory) => {
              if (category.spaces && Array.isArray(category.spaces)) {
                allSpaces.push(...category.spaces);
              }
            });
          }
          
          setSpaces(allSpaces || []);
          setPosts(forumPosts || []);
          setTrending(trendingPosts || []);
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Error loading forum data:", error);
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-6 text-brand-dark">Community Forum</h1>
            <p className="text-lg mb-8 text-brand-dark/80">
              Connect with fellow wellness enthusiasts, share your experiences, and learn from others.
            </p>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-brand-primary mb-4" />
                <p className="text-muted-foreground">Loading forum content...</p>
              </div>
            ) : (
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="discussions">Discussions</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                </TabsList>
                
                <TabsContent value="discussions">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="bg-brand-light p-8 rounded-lg border border-brand-sand/20"
                  >
                    {spaces.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {spaces.map((space, index) => (
                          <Card key={index} className="p-4 flex items-center gap-3 cursor-pointer hover:bg-brand-subtle/10 transition-colors">
                            <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center">
                              <MessageSquare size={20} className="text-brand-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">{space.name}</h3>
                              <p className="text-sm text-muted-foreground">{space.count || 0} posts</p>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center">
                          <MessageSquare size={32} className="text-brand-primary" />
                        </div>
                        <h2 className="text-2xl font-semibold text-brand-dark">Join the Discussion</h2>
                        <p className="text-center text-muted-foreground max-w-md">
                          Connect, share, and grow with like-minded individuals in our community forums.
                        </p>
                        <div className="mt-4 flex gap-4">
                          <Button className="bg-brand-primary hover:bg-brand-primary/90">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Start Discussion
                          </Button>
                          <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary/5">
                            <Users className="mr-2 h-4 w-4" />
                            Browse Topics
                          </Button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="trending">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="bg-brand-light p-8 rounded-lg border border-brand-sand/20"
                  >
                    {trending.length > 0 ? (
                      <div className="space-y-4">
                        {trending.map((post, index) => (
                          <Card key={index} className="p-4 cursor-pointer hover:bg-brand-subtle/10 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden">
                                <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <h3 className="font-medium">{post.title}</h3>
                                <p className="text-sm text-muted-foreground">By {post.author}</p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-2">No trending posts yet</h2>
                        <p className="text-muted-foreground mb-4">Be the first to create a popular post!</p>
                        <Button className="bg-brand-primary hover:bg-brand-primary/90">
                          Start a Discussion
                        </Button>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ForumPage;
