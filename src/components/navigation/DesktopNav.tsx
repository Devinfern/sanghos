
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DesktopNavLink } from "./NavLink";
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DesktopNavProps {
  isLoggedIn: boolean;
  onSignOut: () => void;
  onCommunityClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const DesktopNav = ({ 
  isLoggedIn, 
  onSignOut,
  onCommunityClick
}: DesktopNavProps) => {
  const location = useLocation();

  return (
    <div className="hidden md:flex items-center space-x-1">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <DesktopNavLink 
              to="/"
              active={location.pathname === "/"}
              onClick={null}
            >
              Home
            </DesktopNavLink>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <DesktopNavLink 
              to="/retreats"
              active={location.pathname === "/retreats"}
              onClick={null}
            >
              Retreats
            </DesktopNavLink>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <DesktopNavLink 
              to="/wellness-journal"
              active={location.pathname === "/wellness-journal"}
              onClick={null}
            >
              AI Retreat Finder
            </DesktopNavLink>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <DesktopNavLink 
              to="/about"
              active={location.pathname === "/about"}
              onClick={null}
            >
              About Us
            </DesktopNavLink>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <DesktopNavLink 
              to={isLoggedIn ? "/community" : "/community-teaser"}
              active={location.pathname === "/community" || location.pathname === "/community-teaser"}
              onClick={onCommunityClick}
            >
              Community
            </DesktopNavLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center space-x-3 ml-6">
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                size="sm" 
                variant="outline"
                className="border-slate-300 text-slate-800 hover:bg-slate-100 flex items-center gap-2"
              >
                <User size={16} />
                My Account
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onSignOut}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button 
              size="sm" 
              variant="outline" 
              asChild
              className="border-slate-300 text-slate-800 hover:bg-slate-100"
            >
              <Link to="/login">Sign In</Link>
            </Button>
            <Button 
              size="sm" 
              asChild
            >
              <Link to="/join">Join Sanghos</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
