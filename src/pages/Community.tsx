
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { 
  MessageSquare, 
  Calendar, 
  Users, 
  Plus, 
  MoreHorizontal, 
  Heart, 
  MessageCircle, 
  Bookmark,
  ChevronDown,
  Search,
  Settings,
  ArrowRight,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { 
  forumSpaces, 
  forumPosts as initialPosts, 
  forumEvents, 
  trendingPosts,
  loadForumSpaces,
  loadForumPosts,
  loadForumEvents,
  loadTrendingPosts,
  updateForumPosts
} from "@/lib/communityData";
import CommunityPostEditor from "@/components/CommunityPostEditor";
import ForumCMS from "@/components/ForumCMS";
import { ForumPost } from "@/lib/communityData";
import OptimizedImage from "@/components/OptimizedImage";

const CommunityPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [newPostContent, setNewPostContent] = useState<string>("");
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);
  const [showCMS, setShowCMS] = useState<boolean>(false);
  const [currentEvents, setCurrentEvents] = useState(forumEvents);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const navigate = useNavigate();

  // Load data from Supabase on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        loadForumSpaces(),
        loadForumPosts(),
        loadForumEvents(),
        loadTrendingPosts()
      ]);
      setPosts(initialPosts); // Update with the loaded data
      setCurrentEvents(forumEvents);
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  // Check login status
  useEffect(() => {
    const checkLoginStatus = () => {
      const userString = localStorage.getItem("sanghos_user");
      const mockLoggedIn = userString !== null;
      setIsLoggedIn(mockLoggedIn);
      
      if (mockLoggedIn && userString) {
        try {
          const userData = JSON.parse(userString);
          setIsAdmin(userData.isAdmin || userData.email === "admin@sanghos.com");
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    };
    
    checkLoginStatus();
  }, []);

  // Update events when forumEvents changes
  useEffect(() => {
    setCurrentEvents(forumEvents);
  }, [forumEvents]);

  const handlePostSubmit = async () => {
    if (!isLoggedIn) {
      toast.error("You need to be logged in to post");
      navigate("/login");
      return;
    }
    
    if (!newPostContent.trim()) {
      toast.error("Please enter some content for your post");
      return;
    }
    
    const newPost: ForumPost = {
      id: Date.now(),
      author: {
        name: "You",
        role: "Member",
        avatar: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      },
      postedIn: "Open Conversation",
      timeAgo: "just now",
      title: "Quick post",
      content: newPostContent,
      likes: 0,
      comments: 0,
      bookmarked: false
    };
    
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    await updateForumPosts(updatedPosts);
    toast.success("Post created successfully!");
    setNewPostContent("");
  };

  const handleNewPostCreated = async (newPost: Partial<ForumPost>) => {
    if (!isLoggedIn) {
      toast.error("You need to be logged in to post");
      navigate("/login");
      return;
    }
    
    const fullPost: ForumPost = {
      id: Date.now(),
      author: {
        name: "You",
        role: "Member",
        avatar: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      },
      postedIn: newPost.postedIn || "Open Conversation",
      timeAgo: "just now",
      title: newPost.title || "Untitled",
      content: newPost.content || "",
      likes: 0,
      comments: 0,
      bookmarked: false
    };
    
    const updatedPosts = [fullPost, ...posts];
    setPosts(updatedPosts);
    await updateForumPosts(updatedPosts);
  };

  const toggleCMS = () => {
    if (!isAdmin) {
      toast.error("You need admin privileges to access the CMS");
      return;
    }
    setShowCMS(!showCMS);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const dismissHero = () => {
    setIsHeroVisible(false);
  };

  if (showCMS && isAdmin) {
    return (
      <>
        <Helmet>
          <title>Community Management | Sanghos</title>
        </Helmet>
        <Header />
        <main className="pt-24 pb-16 min-h-screen bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-brand-dark">Community Management</h1>
              <Button onClick={toggleCMS} className="bg-brand-primary hover:bg-brand-primary/90 text-white">
                Back to Community
              </Button>
            </div>
            <ForumCMS />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const renderSpaceIcon = (iconName: string) => {
    switch (iconName) {
      case "MessageSquare":
        return <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />;
      case "Calendar":
        return <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />;
      case "Users":
        return <Users className="h-4 w-4 mr-2 text-muted-foreground" />;
      default:
        return <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />;
    }
  };

  const createSlug = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '-');
  };

  const testimonials = [
    {
      quote: "Joining the Sanghos community transformed my wellness journey. I've found lifelong friends who understand and support my path to mindfulness.",
      author: "Maya L.",
      role: "Member since 2022",
      avatar: "https://images.unsplash.com/photo-1500673922987-e212871fec22"
    },
    {
      quote: "What I love most about Sanghos is how we continue to connect long after the retreats end. This community has become my wellness family.",
      author: "David T.",
      role: "Member since 2023",
      avatar: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    }
  ];

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-brand-subtle/20 to-white">
          <div className="container mx-auto px-4 text-center py-12">
            <div className="animate-pulse">
              <div className="h-8 bg-brand-subtle rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-brand-subtle rounded w-1/2 mx-auto mb-8"></div>
              <div className="h-32 bg-brand-subtle rounded w-full max-w-md mx-auto"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Community | Sanghos</title>
        <meta name="description" content="Join our mindful community of wellness enthusiasts. Connect, share, and grow together on your wellness journey with Sanghos." />
      </Helmet>

      <Header />

      <main className="pt-16 pb-16 min-h-screen bg-gradient-to-b from-brand-subtle/20 to-white">
        {/* New Hero Section */}
        {isHeroVisible && (
          <section className="relative mb-16 overflow-hidden bg-brand-dark text-white">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 to-brand-dark/80 z-10"></div>
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1500673922987-e212871fec22" 
                alt="Community gathering in nature" 
                className="w-full h-full" 
                aspectRatio="custom" 
                objectFit="cover" 
                priority={true} 
              />
            </div>
            <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10">
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-4 right-4 text-white hover:bg-white/10" 
                onClick={dismissHero}
              >
                ×
              </Button>
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-6">
                  Connect. Grow. Renew.<br />
                  <span className="text-brand-peach">Welcome to the Sanghos Community.</span>
                </h1>
                <p className="text-lg md:text-xl mb-8">
                  Join a circle of like-minded individuals on a collective journey toward wellness and mindful living. 
                  In our community, you'll find support, inspiration, and authentic connections that nurture your growth.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    size="lg" 
                    onClick={() => navigate("/join")} 
                    className="bg-brand-peach hover:bg-brand-peach/90 text-white"
                  >
                    Join Our Community
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => navigate("/retreats")} 
                    className="border-white text-white hover:bg-white/10"
                  >
                    Explore Retreats
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="container px-4 md:px-6 mx-auto">
          {/* Benefits Section (New) */}
          <section className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-brand-dark mb-4">Why Join Our Community?</h2>
              <p className="text-lg text-brand-slate max-w-3xl mx-auto">
                Sanghos is more than just retreats—it's a supportive ecosystem where wellness enthusiasts connect, 
                share experiences, and find inspiration on their journey toward mindful living.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 border border-brand-subtle/30 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-brand-dark">Authentic Connections</h3>
                <p className="text-brand-slate">
                  Find kindred spirits who share your passion for wellness and mindful living. Form meaningful 
                  relationships that extend beyond retreat experiences.
                </p>
              </Card>
              
              <Card className="p-6 border border-brand-subtle/30 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-brand-dark">Collective Growth</h3>
                <p className="text-brand-slate">
                  Share insights, discover new perspectives, and grow together through 
                  shared experiences and collaborative learning.
                </p>
              </Card>
              
              <Card className="p-6 border border-brand-subtle/30 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-brand-dark">Ongoing Support</h3>
                <p className="text-brand-slate">
                  Continue your wellness journey with community support long after your retreat ends. 
                  Stay connected, motivated, and inspired.
                </p>
              </Card>
            </div>
          </section>

          {/* Community Vision Section (New) */}
          <section className="mb-16 bg-brand-subtle/10 py-12 px-4 md:px-8 rounded-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-brand-dark mb-6 text-center">Our Community Vision</h2>
              <p className="text-lg text-brand-slate mb-8 text-center">
                We're building a vibrant ecosystem where wellness enthusiasts can connect, share, and grow together.
                Here's what you can look forward to as part of the Sanghos community:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="bg-brand-primary/10 p-3 rounded-full h-min">
                    <MessageSquare className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-brand-dark">Thoughtful Discussions</h3>
                    <p className="text-brand-slate">
                      Engage in meaningful conversations about wellness practices, mindfulness techniques, 
                      and personal growth in our online forums.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-brand-primary/10 p-3 rounded-full h-min">
                    <Calendar className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-brand-dark">Exclusive Events</h3>
                    <p className="text-brand-slate">
                      Participate in community-only virtual gatherings, workshops, and special retreats 
                      designed to deepen your wellness practice.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-brand-primary/10 p-3 rounded-full h-min">
                    <MessageCircle className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-brand-dark">Instructor Access</h3>
                    <p className="text-brand-slate">
                      Connect with our wellness experts outside of retreats for Q&A sessions, 
                      guidance, and continued learning.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-brand-primary/10 p-3 rounded-full h-min">
                    <Users className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-brand-dark">Community Circles</h3>
                    <p className="text-brand-slate">
                      Join interest-based groups focused on specific wellness practices like meditation, 
                      yoga, or mindful nutrition.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section (New) */}
          <section className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-brand-dark mb-4">Community Voices</h2>
              <p className="text-lg text-brand-slate max-w-3xl mx-auto">
                Hear from members who have found connection and growth within our community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 border border-brand-subtle/30 shadow-sm">
                  <div className="mb-4 text-brand-peach flex">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-brand-peach text-brand-peach" />)}
                  </div>
                  <p className="text-brand-slate italic mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <img src={testimonial.avatar} alt={testimonial.author} />
                    </Avatar>
                    <div>
                      <p className="font-medium text-brand-dark">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {!isLoggedIn && (
            <div className="mb-12 py-10 px-8 bg-gradient-to-r from-brand-primary/10 to-brand-peach/10 rounded-2xl text-center">
              <h2 className="text-2xl font-bold mb-4 text-brand-dark">Ready to Begin Your Journey?</h2>
              <p className="text-lg mb-6 text-brand-slate max-w-2xl mx-auto">
                Join our growing community today and connect with like-minded individuals on a path to wellness and mindful living.
                Create an account to unlock all community features and begin sharing your journey.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/join")} 
                  className="bg-brand-primary hover:bg-brand-primary/90 text-white"
                >
                  Join Sanghos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleLogin} 
                  className="border-brand-primary text-brand-primary hover:bg-brand-primary/5"
                >
                  Sign In
                </Button>
              </div>
            </div>
          )}
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-64 w-full shrink-0">
              <div className="sticky top-24 space-y-8">
                <div className="bg-white rounded-lg shadow-sm p-4 border border-brand-subtle/30">
                  <h3 className="font-semibold text-lg mb-4 text-brand-dark">Spaces</h3>
                  
                  <div className="space-y-4">
                    {forumSpaces.map((category, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="text-sm font-medium text-brand-slate">{category.name}</h4>
                        <div className="space-y-1">
                          {category.spaces.map((space, spaceIndex) => (
                            <Link 
                              key={spaceIndex}
                              to={`/community/space/${createSlug(space.name)}`}
                              className="flex items-center justify-between rounded-md p-2 hover:bg-brand-subtle/10"
                            >
                              <div className="flex items-center">
                                {renderSpaceIcon(space.icon)}
                                <span className="text-sm text-brand-slate">{space.name}</span>
                              </div>
                              {space.count !== null && (
                                <span className="text-xs text-brand-slate">{space.count}</span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-brand-dark">Community Feed</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium mr-2 text-brand-slate">Latest</span>
                  <ChevronDown className="h-4 w-4 text-brand-slate" />
                  {isAdmin && (
                    <Button variant="outline" onClick={toggleCMS} className="border-brand-primary text-brand-primary hover:bg-brand-primary/5">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage Content
                    </Button>
                  )}
                  <CommunityPostEditor 
                    onPostCreated={handleNewPostCreated}
                    buttonLabel="New post"
                  />
                </div>
              </div>

              {isLoggedIn && (
                <Card className="p-4 mb-6 border border-brand-subtle/30 shadow-sm">
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" alt="User" />
                    </Avatar>
                    <div className="flex-1">
                      <Textarea 
                        placeholder="Start a post" 
                        className="resize-none mb-3 border-brand-subtle/50 focus:border-brand-primary"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <Button 
                          size="sm" 
                          onClick={handlePostSubmit}
                          disabled={!newPostContent.trim()}
                          className="bg-brand-primary hover:bg-brand-primary/90 text-white"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              <div className="space-y-6">
                {posts.map((post) => (
                  <Card key={post.id} className="overflow-hidden border border-brand-subtle/30 shadow-sm">
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <img src={post.author.avatar} alt={post.author.name} />
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-brand-dark">{post.author.name}</span>
                              <span className="text-xs px-2 py-1 bg-brand-subtle/20 rounded-full text-brand-slate">{post.author.role}</span>
                              {post.author.tag && (
                                <span className="text-xs px-2 py-1 bg-brand-peach/20 rounded-full text-brand-slate">{post.author.tag}</span>
                              )}
                            </div>
                            <div className="text-xs text-brand-slate">
                              Posted in {post.postedIn} · {post.timeAgo}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-brand-slate hover:text-brand-dark hover:bg-brand-subtle/10">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2 text-brand-dark">{post.title}</h3>
                      <div className="text-sm mb-3 whitespace-pre-line text-brand-slate">
                        {post.content}
                        <button className="text-brand-primary hover:underline block mt-1">See more</button>
                      </div>

                      <div className="pt-4 flex justify-between items-center border-t border-brand-subtle/30">
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-sm text-brand-slate hover:text-brand-primary" 
                                  onClick={() => !isLoggedIn ? toast.error("Please log in to like posts") : null}>
                            <Heart className="h-4 w-4" /> {post.likes}
                          </button>
                          <button className="flex items-center gap-1 text-sm text-brand-slate hover:text-brand-primary"
                                  onClick={() => !isLoggedIn ? toast.error("Please log in to comment") : null}>
                            <MessageCircle className="h-4 w-4" /> {post.comments}
                          </button>
                        </div>
                        <button className={`${post.bookmarked ? 'text-brand-primary' : 'text-brand-slate'} hover:text-brand-primary`}
                                onClick={() => !isLoggedIn ? toast.error("Please log in to bookmark posts") : null}>
                          <Bookmark className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="lg:w-80 w-full shrink-0">
              <div className="sticky top-24 space-y-6">
                <Card className="overflow-hidden border border-brand-subtle/30 shadow-sm">
                  <div className="p-4 border-b border-brand-subtle/30 bg-brand-subtle/10">
                    <h3 className="font-semibold text-brand-dark">Upcoming events</h3>
                  </div>
                  <div className="divide-y divide-brand-subtle/30">
                    {currentEvents.map((event) => (
                      <div key={event.id} className="p-4 flex gap-3 hover:bg-brand-subtle/5 transition-colors">
                        <div className="text-center w-12 bg-brand-peach/10 rounded-md p-1">
                          <div className="text-lg font-bold text-brand-primary">{event.date.day}</div>
                          <div className="text-xs text-brand-slate">{event.date.month}</div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-brand-dark">{event.title}</h4>
                          <p className="text-xs text-brand-slate mt-1">{event.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="overflow-hidden border border-brand-subtle/30 shadow-sm">
                  <div className="p-4 border-b border-brand-subtle/30 bg-brand-subtle/10">
                    <h3 className="font-semibold text-brand-dark">Trending Posts</h3>
                  </div>
                  <div className="divide-y divide-brand-subtle/30">
                    {trendingPosts.map((post) => (
                      <div key={post.id} className="p-4 flex items-center gap-3 hover:bg-brand-subtle/5 transition-colors">
                        <Avatar className="h-10 w-10 border-2 border-brand-subtle/30">
                          <img src={post.avatar} alt={post.author} />
                        </Avatar>
                        <div>
                          <h4 className="text-sm font-medium text-brand-dark">{post.title}</h4>
                          <p className="text-xs text-brand-slate">{post.author}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Join CTA for Sidebar */}
                <Card className="border border-brand-subtle/30 shadow-sm bg-gradient-to-br from-brand-primary/5 to-brand-peach/5 p-5">
                  <h3 className="font-semibold text-brand-dark mb-3">Join Our Community</h3>
                  <p className="text-sm text-brand-slate mb-4">
                    Connect with like-minded individuals on your wellness journey and unlock exclusive content.
                  </p>
                  <Button 
                    className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white"
                    onClick={() => navigate("/join")}
                  >
                    Become a Member
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CommunityPage;
