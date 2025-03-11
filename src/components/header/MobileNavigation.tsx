
import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

interface MobileNavigationProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  onSignOut: () => void;
  onCommunityClick: (e: React.MouseEvent) => void;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, isLoggedIn, onSignOut, onCommunityClick, onClose }: MobileNavigationProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 bg-white z-40 flex flex-col transition-transform duration-300 ease-in-out md:hidden",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <Logo />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          aria-label="Close menu"
          className="focus:outline-none"
        >
          <X size={24} />
        </Button>
      </div>
      
      <nav className="flex flex-col space-y-6 px-8 py-8 overflow-y-auto">
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              "text-lg font-medium py-2 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground"
            )
          }
          onClick={onClose}
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
          onClick={onClose}
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
          onClick={onClose}
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
          onClick={onClose}
        >
          About Us
        </NavLink>
        {isLoggedIn ? (
          <NavLink
            to="/community"
            className={({ isActive }) =>
              cn(
                "text-lg font-medium py-2 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
            onClick={onClose}
          >
            Community
          </NavLink>
        ) : (
          <Link
            to="/community"
            className="text-lg font-medium py-2 transition-colors text-muted-foreground"
            onClick={(e) => {
              onCommunityClick(e);
              onClose();
            }}
          >
            Community
          </Link>
        )}
        <div className="flex flex-col space-y-4 pt-4">
          {isLoggedIn ? (
            <Button variant="outline" onClick={() => {
              onSignOut();
              onClose();
            }}>
              Sign Out
            </Button>
          ) : (
            <>
              <Button variant="outline" asChild className="w-full">
                <Link to="/login" onClick={onClose}>Sign In</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/join" onClick={onClose}>Join Sanghos</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MobileNavigation;
