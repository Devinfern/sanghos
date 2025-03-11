
import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DesktopNavigationProps {
  isLoggedIn: boolean;
  onSignOut: () => void;
}

const DesktopNavigation = ({ isLoggedIn, onSignOut }: DesktopNavigationProps) => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <NavLink
        to="/"
        className={({ isActive }) =>
          cn(
            "text-sm font-medium transition-colors hover:text-primary",
            isActive ? "text-primary" : "text-muted-foreground"
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
            isActive ? "text-primary" : "text-muted-foreground"
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
            isActive ? "text-primary" : "text-muted-foreground"
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
            isActive ? "text-primary" : "text-muted-foreground"
          )
        }
      >
        About Us
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="/community"
          className={({ isActive }) =>
            cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive ? "text-primary" : "text-muted-foreground"
            )
          }
        >
          Community
        </NavLink>
      )}
      {isLoggedIn ? (
        <Button size="sm" variant="outline" onClick={onSignOut}>
          Sign Out
        </Button>
      ) : (
        <>
          <Button size="sm" variant="outline" asChild className="ml-4">
            <Link to="/login">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/join">Join Sanghos</Link>
          </Button>
        </>
      )}
    </nav>
  );
};

export default DesktopNavigation;
