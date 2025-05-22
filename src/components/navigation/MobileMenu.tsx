
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MobileNavLink } from "./NavLink";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onSignOut: () => void;
}

export const MobileMenu = ({ 
  isOpen, 
  onClose,
  isLoggedIn,
  onSignOut
}: MobileMenuProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  if (!isOpen) return null;
  
  const handleCommunityClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isLoggedIn) {
      e.preventDefault();
      onClose();
      navigate('/community-teaser');
    } else {
      onClose();
    }
  };

  return createPortal(
    /* 
      IMPORTANT Z-INDEX FIX:
      The mobile menu has z-[1000], which is lower than the header's new z-[2000].
      Since the mobile menu is rendered directly to the document body via Portal,
      it exists outside the header's stacking context hierarchy.
      The header (z-[2000]) and its children appear above this menu overlay.
    */
    <div 
      className="fixed inset-0 bg-white z-[1000] flex flex-col pt-20 pb-6 px-6 md:hidden"
    >
      <div className="flex flex-col space-y-6 mt-4">
        <MobileNavLink
          to="/"
          active={location.pathname === "/"}
          onClick={onClose}
        >
          Home
        </MobileNavLink>
        
        <MobileNavLink
          to="/retreats"
          active={location.pathname === "/retreats"}
          onClick={onClose}
        >
          Retreats
        </MobileNavLink>
        
        <MobileNavLink
          to="/wellness-journal"
          active={location.pathname === "/wellness-journal"}
          onClick={onClose}
        >
          AI Retreat Finder
        </MobileNavLink>
        
        <MobileNavLink
          to="/about"
          active={location.pathname === "/about"}
          onClick={onClose}
        >
          About Us
        </MobileNavLink>
        
        <MobileNavLink
          to={isLoggedIn ? "/community" : "/community-teaser"}
          active={location.pathname === "/community" || location.pathname === "/community-teaser"}
          onClick={handleCommunityClick}
        >
          Community
        </MobileNavLink>
        
        <div className="flex flex-col space-y-3 mt-4">
          {isLoggedIn ? (
            <>
              <Button 
                asChild 
                variant="outline"
                className="w-full justify-start"
              >
                <MobileNavLink to="/dashboard" active={false} onClick={onClose}>
                  <User size={16} className="mr-2" />
                  My Dashboard
                </MobileNavLink>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  onSignOut();
                  onClose();
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="default">
                <MobileNavLink to="/join" active={false} onClick={onClose}>
                  Join Sanghos
                </MobileNavLink>
              </Button>
              <Button asChild variant="outline">
                <MobileNavLink to="/login" active={false} onClick={onClose}>
                  Sign In
                </MobileNavLink>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
