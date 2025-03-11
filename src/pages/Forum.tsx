
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
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
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { forumSpaces, forumPosts as initialPosts, forumEvents, trendingPosts } from "@/lib/forumData";
import ForumPostEditor from "@/components/ForumPostEditor";
import { ForumPost } from "@/lib/forumData";

const ForumPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [newPostContent, setNewPostContent] = useState<string>("");
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);
  const navigate = useNavigate();

  // Check login status
  useEffect(() => {
    // In a real app, this would check your authentication system
    const checkLoginStatus = () => {
      // Mock authentication - replace with your actual auth check
      const mockLoggedIn = localStorage.getItem("sanghos_user") !== null;
      setIsLoggedIn(mockLoggedIn);
      
      if (!mockLoggedIn) {
        toast.error("You need to be logged in to access the forum");
        navigate("/login");
      }
    };
    
    checkLoginStatus();
  }, [navigate]);

  const handlePostSubmit = () => {
    if (!newPostContent.trim()) {
      toast.error("Please enter some content for your post");
      return;
    }
    
    // Create a quick post with just the content
    const newPost: ForumPost = {
      id: Date.now(), // Use timestamp as temporary ID
      author: {
        name: "You",
        role: "Member",
        avatar: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      },
      postedIn: "Open Conversation",
      timeAgo: "just now",
      title: "Quick post", // For quick posts, we use a default title
      content: newPostContent,
      likes: 0,
      comments: 0,
      bookmarked: false
    };
    
    setPosts([newPost, ...posts]);
    toast.success("Post created successfully!");
    setNewPostContent("");
  };

  const handleNewPostCreated = (newPost: Partial<ForumPost>) => {
    const fullPost: ForumPost = {
      id: Date.now(), // Use timestamp as temporary ID
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
    
    setPosts([fullPost, ...posts]);
  };

  if (!isLoggedIn) {
    return null; // Don't render anything if not logged in
  }

  // Helper function to render the correct icon
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

  return (
    <>
      <Helmet>
        <title>Community Forum | Sanghos</title>
        <meta name="description" content="Join our community forum for discussions, events, and more" />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16 min-h-screen bg-slate-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
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
                            <a 
                              key={spaceIndex}
                              href="#" 
                              className="flex items-center justify-between rounded-md p-2 hover:bg-slate-100"
                            >
                              <div className="flex items-center">
                                {renderSpaceIcon(space.icon)}
                                <span className="text-sm">{space.name}</span>
                              </div>
                              {space.count !== null && (
                                <span className="text-xs text-muted-foreground">{space.count}</span>
                              )}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Feed</h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium mr-2">Latest</span>
                  <ChevronDown className="h-4 w-4" />
                  <ForumPostEditor 
                    onPostCreated={handleNewPostCreated}
                    buttonLabel="New post"
                  />
                </div>
              </div>

              {/* New Post Input */}
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

              {/* Posts Feed */}
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
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                            <Heart className="h-4 w-4" /> {post.likes}
                          </button>
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                            <MessageCircle className="h-4 w-4" /> {post.comments}
                          </button>
                        </div>
                        <button className={`${post.bookmarked ? 'text-primary' : 'text-muted-foreground'} hover:text-primary`}>
                          <Bookmark className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:w-80 w-full shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Upcoming Events */}
                <Card className="overflow-hidden border border-slate-200">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Upcoming events</h3>
                  </div>
                  <div className="divide-y">
                    {forumEvents.map((event) => (
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

                {/* Trending Posts */}
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

export default ForumPage;
