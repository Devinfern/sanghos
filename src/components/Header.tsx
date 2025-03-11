
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Logo from "./header/Logo";
import DesktopNavigation from "./header/DesktopNavigation";
import MobileNavigation from "./header/MobileNavigation";
import MobileMenuToggle from "./header/MobileMenuToggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.style.removeProperty('overflow');
  }, [location.pathname]);

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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 w-full",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Logo />
        <DesktopNavigation isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />
        <MobileMenuToggle isOpen={mobileMenuOpen} onToggle={toggleMobileMenu} />
      </div>
      
      <MobileNavigation 
        isOpen={mobileMenuOpen} 
        isLoggedIn={isLoggedIn} 
        onSignOut={handleSignOut}
      />
    </header>
  );
};

export default Header;
