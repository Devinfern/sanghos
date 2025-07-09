
import { NavLink } from "./NavLink";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DesktopNavProps {
  isLoggedIn: boolean;
  onSignOut: () => void;
  onCommunityClick: (e: React.MouseEvent) => void;
}

export const DesktopNav = ({ isLoggedIn, onSignOut, onCommunityClick }: DesktopNavProps) => {
  return (
    <div className="hidden lg:flex items-center space-x-8">
      <nav className="flex items-center space-x-8">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center space-x-1 text-white hover:text-white/80 transition-colors duration-200 text-base font-medium">
            <span>Retreats</span>
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 mt-2 bg-white/95 backdrop-blur-lg border border-white/20 shadow-lg">
            <DropdownMenuItem asChild>
              <Link to="/retreats" className="w-full">Browse All Retreats</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/vendors-marketplace-teaser" className="w-full">Find Vendors</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/become-host" className="w-full">Host a Retreat</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <NavLink to="/blog">Insights</NavLink>
        <div className="relative">
          <NavLink to="/vendors-marketplace-teaser" className="flex items-center space-x-2">
            <span>Vendors</span>
            <span className="px-2 py-1 text-xs bg-brand-primary/10 text-brand-primary rounded-full font-medium">Coming Soon</span>
          </NavLink>
        </div>
        <NavLink
          to="/community" 
          onClick={onCommunityClick}
        >
          Community
        </NavLink>
        <NavLink to="/about-us">About</NavLink>
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
