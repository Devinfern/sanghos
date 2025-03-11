
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { forumSpaces } from "@/lib/forumData";
import { MessageSquare, Calendar, Users } from "lucide-react";

const ForumSpaceDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Function to convert slug back to space name
  const getSpaceName = (slug: string) => {
    const spaceName = slug.replace(/-/g, ' ');
    
    // Find the space in our data
    let foundSpace = null;
    for (const category of forumSpaces) {
      const space = category.spaces.find(
        (s) => s.name.toLowerCase() === spaceName
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
        <title>{space.name} | Sanghos Forum</title>
        <meta name="description" content={`Posts and discussions in the ${space.name} space`} />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16 min-h-screen bg-slate-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Button variant="link" className="p-0" onClick={() => window.history.back()}>
                Back to Forum
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
          
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-2xl font-medium mb-4">Welcome to {space.name}</h2>
            <p className="text-muted-foreground mb-6">
              This is a dedicated space for discussions about {space.name}. 
              Start a conversation or browse existing posts.
            </p>
            <Button>Create a Post</Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ForumSpaceDetails;
