
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import SanghosIcon from './SanghosIcon';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Check if the user has the wellness practitioner flag in metadata
  // Since User type doesn't have is_wellness_practitioner by default
  const isWellnessPractitioner = user && 
    ((user as any).is_wellness_practitioner === true || 
     (user.user_metadata && (user.user_metadata as any).is_wellness_practitioner === true));

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center font-bold text-xl text-sage-700">
            <SanghosIcon className="mr-2 h-6 w-6" />
            Sanghos
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sage-700 hover:text-sage-900 transition-colors">
              Home
            </Link>
            <Link to="/retreats" className="text-sage-700 hover:text-sage-900 transition-colors">
              Retreats
            </Link>
            <Link to="/events" className="text-sage-700 hover:text-sage-900 transition-colors">
              Events
            </Link>
            <Link to="/community" className="text-sage-700 hover:text-sage-900 transition-colors">
              Community
            </Link>
            {user ? (
              <>
                {isWellnessPractitioner && (
                  <Link to="/host" className="text-sage-700 hover:text-sage-900 transition-colors">
                    Host
                  </Link>
                )}
                <Button variant="secondary" size="sm" onClick={signOut}>Sign Out</Button>
              </>
            ) : (
              <>
                <Link to="/sign-in" className="text-sage-700 hover:text-sage-900 transition-colors">
                  Sign In
                </Link>
                <Link to="/sign-up" className="text-sage-700 hover:text-sage-900 transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
          
          <Sheet>
            <SheetTrigger className="md:hidden">
              <Menu className="h-6 w-6 text-sage-700" />
            </SheetTrigger>
            <SheetContent side="right" className="sm:max-w-sm">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Explore Sanghos
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col px-6 py-8 space-y-6">
                <Link to="/" className="text-xl text-sage-800" onClick={closeMobileMenu}>
                  Home
                </Link>
                <Link to="/retreats" className="text-xl text-sage-800" onClick={closeMobileMenu}>
                  Retreats
                </Link>
                <Link to="/events" className="text-xl text-sage-800" onClick={closeMobileMenu}>
                  Events
                </Link>
                <Link to="/community" className="text-xl text-sage-800" onClick={closeMobileMenu}>
                  Community
                </Link>
                {user ? (
                  <>
                    {isWellnessPractitioner && (
                      <Link to="/host" className="text-xl text-sage-800" onClick={closeMobileMenu}>
                        Host
                      </Link>
                    )}
                    <Button variant="secondary" size="sm" onClick={signOut}>Sign Out</Button>
                  </>
                ) : (
                  <>
                    <Link to="/sign-in" className="text-xl text-sage-800" onClick={closeMobileMenu}>
                      Sign In
                    </Link>
                    <Link to="/sign-up" className="text-xl text-sage-800" onClick={closeMobileMenu}>
                      Sign Up
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
