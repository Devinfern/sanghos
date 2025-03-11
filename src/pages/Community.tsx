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
  Settings
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

const CommunityPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [newPostContent, setNewPostContent] = useState<string>("");
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);
  const [showCMS, setShowCMS] = useState<boolean>(false);
  const [currentEvents, setCurrentEvents] = useState(forumEvents);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
              <h1 className="text-2xl font-bold">Community Management</h1>
              <Button onClick={toggleCMS}>Back to Community</Button>
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

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen bg-slate-50">
          <div className="container mx-auto px-4 text-center py-12">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto mb-8"></div>
              <div className="h-32 bg-slate-200 rounded w-full max-w-md mx-auto"></div>
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
        <meta name="description" content="Join our community for discussions, events, and more" />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16 min-h-screen bg-slate-50">
        <div className="container px-4 md:px-6 mx-auto">
          {!isLoggedIn && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Join Our Community</h2>
              <p className="mb-4">To participate in discussions, create posts, and interact with our community, please sign in or create an account.</p>
              <div className="flex gap-3">
                <Button onClick={handleLogin}>Sign In</Button>
                <Button variant="outline" onClick={() => navigate("/join")}>Join Sanghos</Button>
              </div>
            </div>
          )}
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-64 w-full shrink-0">
              <div className="sticky top-24 space-y-8">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="font-semibold text-lg mb-4">Spaces</h3>
                  
                  <div className="space-y-4">
                    {forumSpaces.map((category, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">{category.name}</h4>
                        <div className="space-y-1">
                          {category.spaces.map((space, spaceIndex) => (
                            <Link 
                              key={spaceIndex}
                              to={`/community/space/${createSlug(space.name)}`}
                              className="flex items-center justify-between rounded-md p-2 hover:bg-slate-100"
                            >
                              <div className="flex items-center">
                                {renderSpaceIcon(space.icon)}
                                <span className="text-sm">{space.name}</span>
                              </div>
                              {space.count !== null && (
                                <span className="text-xs text-muted-foreground">{space.count}</span>
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
                <h1 className="text-2xl font-bold">Feed</h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium mr-2">Latest</span>
                  <ChevronDown className="h-4 w-4" />
                  {isAdmin && (
                    <Button variant="outline" onClick={toggleCMS}>
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
                <Card className="p-4 mb-6 border border-slate-200">
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" alt="User" />
                    </Avatar>
                    <div className="flex-1">
                      <Textarea 
                        placeholder="Start a post" 
                        className="resize-none mb-3"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <Button 
                          size="sm" 
                          onClick={handlePostSubmit}
                          disabled={!newPostContent.trim()}
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
                  <Card key={post.id} className="overflow-hidden border border-slate-200">
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <img src={post.author.avatar} alt={post.author.name} />
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{post.author.name}</span>
                              <span className="text-xs px-2 py-1 bg-slate-100 rounded-full">{post.author.role}</span>
                              {post.author.tag && (
                                <span className="text-xs px-2 py-1 bg-slate-100 rounded-full">{post.author.tag}</span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Posted in {post.postedIn} · {post.timeAgo}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                      <div className="text-sm mb-3 whitespace-pre-line">
                        {post.content}
                        <button className="text-primary hover:underline block mt-1">See more</button>
                      </div>

                      <div className="pt-4 flex justify-between items-center border-t">
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground" 
                                  onClick={() => !isLoggedIn ? toast.error("Please log in to like posts") : null}>
                            <Heart className="h-4 w-4" /> {post.likes}
                          </button>
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                                  onClick={() => !isLoggedIn ? toast.error("Please log in to comment") : null}>
                            <MessageCircle className="h-4 w-4" /> {post.comments}
                          </button>
                        </div>
                        <button className={`${post.bookmarked ? 'text-primary' : 'text-muted-foreground'} hover:text-primary`}
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
                <Card className="overflow-hidden border border-slate-200">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Upcoming events</h3>
                  </div>
                  <div className="divide-y">
                    {currentEvents.map((event) => (
                      <div key={event.id} className="p-4 flex gap-3">
                        <div className="text-center w-12">
                          <div className="text-lg font-bold">{event.date.day}</div>
                          <div className="text-xs text-muted-foreground">{event.date.month}</div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">{event.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{event.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="overflow-hidden border border-slate-200">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Trending Posts</h3>
                  </div>
                  <div className="divide-y">
                    {trendingPosts.map((post) => (
                      <div key={post.id} className="p-4 flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <img src={post.avatar} alt={post.author} />
                        </Avatar>
                        <div>
                          <h4 className="text-sm font-medium">{post.title}</h4>
                          <p className="text-xs text-muted-foreground">{post.author}</p>
                        </div>
                      </div>
                    ))}
                  </div>
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
