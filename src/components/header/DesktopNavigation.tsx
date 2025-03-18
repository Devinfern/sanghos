
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
                : "text-slate-700"
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
                : "text-slate-700"
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
                : "text-slate-700"
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
                : "text-slate-700"
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
                  : "text-slate-700"
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
              : "text-slate-700"
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
              isOnDarkBackground 
                ? "border-white text-slate-900 bg-white hover:bg-white/90 hover:text-slate-900" 
                : "text-slate-900"
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
