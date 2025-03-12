
import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DesktopNavigationProps {
  isLoggedIn: boolean;
  onSignOut: () => void;
  onCommunityClick: (e: React.MouseEvent) => void;
  isOnDarkBackground?: boolean;
}

const DesktopNavigation = ({ 
  isLoggedIn, 
  onSignOut, 
  onCommunityClick, 
  isOnDarkBackground = false 
}: DesktopNavigationProps) => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <NavLink
        to="/"
        className={({ isActive }) =>
          cn(
            "text-sm font-medium transition-colors hover:text-primary",
            isActive 
              ? "text-primary" 
              : isOnDarkBackground 
                ? "text-white" 
                : "text-muted-foreground"
          )
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/retreats"
        className={({ isActive }) =>
          cn(
            "text-sm font-medium transition-colors hover:text-primary",
            isActive 
              ? "text-primary" 
              : isOnDarkBackground 
                ? "text-white" 
                : "text-muted-foreground"
          )
        }
      >
        Retreats
      </NavLink>
      <NavLink
        to="/instructors"
        className={({ isActive }) =>
          cn(
            "text-sm font-medium transition-colors hover:text-primary",
            isActive 
              ? "text-primary" 
              : isOnDarkBackground 
                ? "text-white" 
                : "text-muted-foreground"
          )
        }
      >
        Instructors
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          cn(
            "text-sm font-medium transition-colors hover:text-primary",
            isActive 
              ? "text-primary" 
              : isOnDarkBackground 
                ? "text-white" 
                : "text-muted-foreground"
          )
        }
      >
        About Us
      </NavLink>
      {isLoggedIn ? (
        <NavLink
          to="/community"
          className={({ isActive }) =>
            cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive 
                ? "text-primary" 
                : isOnDarkBackground 
                  ? "text-white" 
                  : "text-muted-foreground"
            )
          }
          onClick={onCommunityClick}
        >
          Community
        </NavLink>
      ) : (
        <Link
          to="/community-teaser"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            isOnDarkBackground 
              ? "text-white" 
              : "text-muted-foreground"
          )}
        >
          Community
        </Link>
      )}
      {isLoggedIn ? (
        <Button 
          size="sm" 
          variant={isOnDarkBackground ? "outline" : "outline"}
          className={isOnDarkBackground ? "border-white text-white hover:bg-white/10" : ""}
          onClick={onSignOut}
        >
          Sign Out
        </Button>
      ) : (
        <>
          <Button 
            size="sm" 
            variant="outline" 
            asChild 
            className={cn(
              "ml-4", 
              isOnDarkBackground ? "border-white text-white hover:bg-white/10" : ""
            )}
          >
            <Link to="/login">Sign In</Link>
          </Button>
          <Button 
            size="sm" 
            asChild
            className={isOnDarkBackground ? "bg-white text-sage-900 hover:bg-white/90" : ""}
          >
            <Link to="/join">Join Sanghos</Link>
          </Button>
        </>
      )}
    </nav>
  );
};

export default DesktopNavigation;
