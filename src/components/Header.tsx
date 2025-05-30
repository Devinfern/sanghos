import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Logo } from "./navigation/Logo";
import { MenuToggle } from "./navigation/MenuToggle";
import { MobileMenu } from "./navigation/MobileMenu";
import { DesktopNav } from "./navigation/DesktopNav";
import { useScrollDetection } from "./navigation/useScrollDetection";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isScrolled = useScrollDetection(20);
  
  // Reset menu state on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.style.removeProperty('overflow');
  }, [location.pathname]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, []);

  const toggleMobileMenu = () => {
    const newMenuState = !mobileMenuOpen;
    setMobileMenuOpen(newMenuState);
    
    if (newMenuState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }
  };

  const isLoggedIn = localStorage.getItem("sanghos_user") !== null;
  
  const handleSignOut = () => {
    localStorage.removeItem("sanghos_user");
    window.location.href = "/";
  };

  const handleCommunityClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/community-teaser');
    }
  };

  return (
    <>
      {/* 
        IMPORTANT Z-INDEX FIX:
        Increased the header's z-index from z-50 to z-[2000] to create a higher stacking context.
        This ensures the header and its children (logo and menu toggle) appear above the mobile menu
        which is rendered at the document body level with z-[1000].
      */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[2000] w-full transition-all duration-300",
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
            : "bg-white/95 backdrop-blur-md shadow-sm py-4"
        )}
      >
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          <Logo />
          
          <DesktopNav 
            isLoggedIn={isLoggedIn}
            onSignOut={handleSignOut}
            onCommunityClick={handleCommunityClick}
          />
          
          <MenuToggle 
            isOpen={mobileMenuOpen} 
            onClick={toggleMobileMenu}
          />
        </div>
      </header>

      {/* 
        MobileMenu is rendered via Portal directly to document.body
        It needs to have a lower z-index than the header
      */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isLoggedIn={isLoggedIn}
        onSignOut={handleSignOut}
      />
    </>
  );
};

export default Header;
