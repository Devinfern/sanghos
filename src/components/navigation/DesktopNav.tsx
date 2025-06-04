
import { NavLink } from "./NavLink";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface DesktopNavProps {
  isLoggedIn: boolean;
  onSignOut: () => void;
  onCommunityClick: (e: React.MouseEvent) => void;
}

export const DesktopNav = ({ isLoggedIn, onSignOut, onCommunityClick }: DesktopNavProps) => {
  return (
    <div className="hidden lg:flex items-center space-x-8">
      <nav className="flex items-center space-x-8">
        <NavLink to="/retreats">Retreats</NavLink>
        <NavLink to="/blog">Insights</NavLink>
        <NavLink 
          to="/community" 
          onClick={onCommunityClick}
        >
          Community
        </NavLink>
        <NavLink to="/about-us">About</NavLink>
        <NavLink to="/contact-us">Contact</NavLink>
      </nav>
      
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <Button variant="outline" asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button 
              onClick={onSignOut}
              variant="outline"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Join Sanghos</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
