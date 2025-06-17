
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "./navigation/Logo";
import { FloatingNavigation } from "./navigation/FloatingNavigation";
import { FloatingActionButtons } from "./navigation/FloatingActionButtons";
import { FloatingMenuToggle } from "./navigation/FloatingMenuToggle";
import { EnhancedMobileMenu } from "./navigation/EnhancedMobileMenu";
import { useScrollDetection } from "./navigation/useScrollDetection";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isScrolled = useScrollDetection(20);
  
  // Reset menu state on route change
  useEffect(() => {
    console.log("Route changed, closing mobile menu");
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
    console.log("toggleMobileMenu called, current state:", mobileMenuOpen);
    const newMenuState = !mobileMenuOpen;
    setMobileMenuOpen(newMenuState);
    console.log("Setting mobile menu to:", newMenuState);
    
    if (newMenuState) {
      document.body.style.overflow = 'hidden';
      console.log("Body overflow set to hidden");
    } else {
      document.body.style.removeProperty('overflow');
      console.log("Body overflow removed");
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

  // Debug logging for mobile menu state
  useEffect(() => {
    console.log("Mobile menu state changed:", mobileMenuOpen);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Enhanced Floating Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[2000] w-full transition-all duration-500",
          isScrolled 
            ? "py-4" 
            : "py-6"
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo - Enhanced with floating effect */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative z-[1002]"
            >
              <div className="bg-white/90 backdrop-blur-lg border border-white/20 rounded-full px-4 py-2 shadow-lg">
                <Logo />
              </div>
            </motion.div>
            
            {/* Floating Navigation - Desktop */}
            <FloatingNavigation 
              isLoggedIn={isLoggedIn}
              onCommunityClick={handleCommunityClick}
            />
            
            {/* Floating Action Buttons - Desktop */}
            <FloatingActionButtons 
              isLoggedIn={isLoggedIn}
              onSignOut={handleSignOut}
            />
          </div>
        </div>
      </header>

      {/* Floating Menu Toggle - Mobile */}
      <FloatingMenuToggle 
        isOpen={mobileMenuOpen} 
        onClick={toggleMobileMenu}
      />

      {/* Enhanced Mobile Menu */}
      <EnhancedMobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => {
          console.log("Mobile menu onClose called");
          setMobileMenuOpen(false);
        }}
        isLoggedIn={isLoggedIn}
        onSignOut={handleSignOut}
        onCommunityClick={handleCommunityClick}
      />
    </>
  );
};

export default Header;
