
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SanghosStory from "@/components/SanghosStory";
import HomeCategories from "@/components/HomeCategories";
import { FeatureRetreatFinder } from "@/components/ui/feature-retreat-finder";
import HowItWorks from "@/components/HowItWorks";
import JoinCommunity from "@/components/JoinCommunity";
import Footer from "@/components/Footer";
import EventsSection from "@/components/sections/EventsSection";
import { useEvents } from "@/hooks/useEvents";
import { motion } from "framer-motion";
import { forumPosts, trendingPosts, loadForumPosts, loadTrendingPosts } from "@/lib/forumData";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, ArrowRight } from "lucide-react";

const Index = () => {
  const { events, isLoading } = useEvents();
  const [isVisible, setIsVisible] = useState(false);
  const [featuredPosts, setFeaturedPosts] = useState<typeof forumPosts>([]);
  const [isLoadingCommunity, setIsLoadingCommunity] = useState(true);

  useEffect(() => {
    // Add a slight delay before showing content for smoother transitions
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadCommunityData = async () => {
      setIsLoadingCommunity(true);
      await Promise.all([loadForumPosts(), loadTrendingPosts()]);
      
      // Get a few popular posts for the homepage
      const featured = forumPosts
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 3);
      
      setFeaturedPosts(featured);
      setIsLoadingCommunity(false);
    };
    
    loadCommunityData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <>
      <Helmet>
        <title>Sanghos | Wellness Retreats in Private Homes</title>
        <meta
          name="description"
          content="Discover transformative daylong wellness retreats hosted by expert instructors in unique private spaces."
        />
      </Helmet>

      <Header />
      <Hero />

      <motion.div 
        className="overflow-hidden"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <SanghosStory />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <EventsSection events={events} isLoading={isLoading} />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <HomeCategories />
        </motion.div>

        <motion.div variants={itemVariants}>
          <section className="py-16 bg-brand-subtle/10">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">Wellness Community</h2>
                  <p className="text-lg text-muted-foreground max-w-xl">
                    Join our growing community of wellness enthusiasts sharing experiences and supporting each other's journeys.
                  </p>
                </div>
                <div className="mt-6 md:mt-0">
                  <Button asChild size="lg" className="group">
                    <Link to="/community">
                      <span>Join Community</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>

              {isLoadingCommunity ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                          <div className="space-y-2">
                            <div className="h-4 w-24 bg-slate-200 rounded"></div>
                            <div className="h-3 w-16 bg-slate-200 rounded"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-5 w-3/4 bg-slate-200 rounded"></div>
                          <div className="h-4 w-full bg-slate-200 rounded"></div>
                          <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredPosts.map(post => (
                    <motion.div 
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <Avatar className="h-10 w-10">
                              <img src={post.author.avatar} alt={post.author.name} />
                            </Avatar>
                            <div>
                              <div className="font-medium">{post.author.name}</div>
                              <div className="text-xs text-muted-foreground flex items-center">
                                <span>{post.timeAgo}</span>
                                <span className="mx-1">•</span>
                                <span>{post.postedIn}</span>
                              </div>
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                          <p className="text-muted-foreground line-clamp-3 mb-4">{post.content.substring(0, 120)}...</p>
                          
                          <div className="flex items-center justify-between mt-auto pt-4 border-t">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center text-muted-foreground text-sm">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                <span>{post.comments}</span>
                              </div>
                              <div className="flex items-center text-muted-foreground text-sm">
                                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M7 10v12" />
                                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                                </svg>
                                <span>{post.likes}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                              <Link to="/community">Read more</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="mt-12 text-center">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Users className="h-5 w-5 text-brand-primary" />
                  <span className="text-xl font-semibold">Join {Math.floor(Math.random() * 900) + 1000} wellness enthusiasts</span>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  Connect with like-minded individuals, share your wellness journey, participate in discussions, 
                  and get support from our community of wellness practitioners.
                </p>
                <Button asChild size="lg" variant="outline" className="mx-2">
                  <Link to="/community">Explore Community</Link>
                </Button>
              </div>
            </div>
          </section>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <FeatureRetreatFinder />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <HowItWorks />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <JoinCommunity />
        </motion.div>
      </motion.div>
      
      <Footer />
    </>
  );
};

export default Index;
