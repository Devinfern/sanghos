import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { forumSpaces, forumPosts } from "@/lib/communityData";
import { MessageSquare, Calendar, Users, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import CommunityPostEditor from "@/components/CommunityPostEditor";
import { useState } from "react";
import { ForumPost } from "@/lib/communityData";
import { toast } from "sonner";

const CommunitySpaceDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [spacePosts, setSpacePosts] = useState<ForumPost[]>(() => {
    // Filter posts for this space
    const spaceName = getSpaceName(slug || "").name;
    return forumPosts.filter(post => post.postedIn.toLowerCase() === spaceName.toLowerCase());
  });
  
  // Function to convert slug back to space name
  const getSpaceName = (slug: string) => {
    const spaceName = slug.replace(/-/g, ' ');
    
    // Find the space in our data
    let foundSpace = null;
    for (const category of forumSpaces) {
      const space = category.spaces.find(
        (s) => s.name.toLowerCase() === spaceName.toLowerCase()
      );
      if (space) {
        foundSpace = space;
        break;
      }
    }
    
    return {
      name: foundSpace?.name || spaceName,
      icon: foundSpace?.icon || "MessageSquare"
    };
  };
  
  const space = getSpaceName(slug || "");

  const handleNewPostCreated = (newPost: Partial<ForumPost>) => {
    const fullPost: ForumPost = {
      id: Date.now(),
      author: {
        name: "You",
        role: "Member",
        avatar: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      },
      postedIn: space.name,
      timeAgo: "just now",
      title: newPost.title || "Untitled",
      content: newPost.content || "",
      likes: 0,
      comments: 0,
      bookmarked: false
    };
    
    setSpacePosts([fullPost, ...spacePosts]);
    toast.success("Post created successfully!");
  };
  
  // Helper function to render the correct icon
  const renderSpaceIcon = (iconName: string) => {
    switch (iconName) {
      case "MessageSquare":
        return <MessageSquare className="h-6 w-6 mr-2" />;
      case "Calendar":
        return <Calendar className="h-6 w-6 mr-2" />;
      case "Users":
        return <Users className="h-6 w-6 mr-2" />;
      default:
        return <MessageSquare className="h-6 w-6 mr-2" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>{space.name} | Sanghos Community</title>
        <meta name="description" content={`Posts and discussions in the ${space.name} space`} />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16 min-h-screen bg-slate-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Button variant="link" className="p-0" onClick={() => window.history.back()}>
                Back to Community
              </Button>
            </div>
            <div className="flex items-center">
              {renderSpaceIcon(space.icon)}
              <h1 className="text-3xl font-bold">{space.name}</h1>
            </div>
            <p className="text-muted-foreground mt-2">
              Discussions, posts, and resources for {space.name}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Posts</h2>
                <CommunityPostEditor 
                  onPostCreated={handleNewPostCreated}
                  buttonLabel="Create Post"
                  initialPost={{ postedIn: space.name }}
                />
              </div>
              
              {spacePosts.length > 0 ? (
                <div className="space-y-6">
                  {spacePosts.map((post) => (
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
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {post.timeAgo}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                        <div className="text-sm mb-3 whitespace-pre-line">
                          {post.content}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-6 text-center">
                  <h3 className="text-lg font-medium mb-2">No posts yet</h3>
                  <p className="text-muted-foreground mb-4">Be the first to start a conversation in this space!</p>
                  <CommunityPostEditor 
                    onPostCreated={handleNewPostCreated}
                    buttonLabel="Create Post"
                    initialPost={{ postedIn: space.name }}
                  />
                </Card>
              )}
            </div>
            
            <div>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">About this Space</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  This is a dedicated space for discussions about {space.name}. 
                  Share your thoughts, ask questions, and connect with others interested in this topic.
                </p>
                <div className="border-t pt-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Members active in this space</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CommunitySpaceDetails;
