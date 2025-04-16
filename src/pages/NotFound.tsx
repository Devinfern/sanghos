
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-sand-50 px-4 pt-16">
        <div className="text-center max-w-md">
          <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
          <p className="text-2xl font-medium mb-4">Page not found</p>
          <p className="text-muted-foreground mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Button asChild size="lg">
            <Link to="/" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
