
import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  onSignOut: () => void;
}

const MobileNavigation = ({ isOpen, isLoggedIn, onSignOut }: MobileNavigationProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 bg-white z-40 flex flex-col transition-transform duration-300 ease-in-out md:hidden pt-20",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <nav className="flex flex-col space-y-6 px-8 py-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              "text-lg font-medium py-2 transition-colors",
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
              "text-lg font-medium py-2 transition-colors",
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
              "text-lg font-medium py-2 transition-colors",
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
              "text-lg font-medium py-2 transition-colors",
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
                "text-lg font-medium py-2 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            Community
          </NavLink>
        )}
        <div className="flex flex-col space-y-4 pt-4">
          {isLoggedIn ? (
            <Button variant="outline" onClick={onSignOut}>
              Sign Out
            </Button>
          ) : (
            <>
              <Button variant="outline" asChild className="w-full">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/join">Join Sanghos</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MobileNavigation;
