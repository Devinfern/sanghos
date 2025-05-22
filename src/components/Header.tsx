
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // Add a ref for storing the pre-menu-open overflow style
  const previousOverflowStyle = useRef("");
  
  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset menu state on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    if (previousOverflowStyle.current) {
      document.body.style.overflow = previousOverflowStyle.current;
      previousOverflowStyle.current = "";
    } else {
      document.body.style.removeProperty('overflow');
    }
  }, [location.pathname]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (previousOverflowStyle.current) {
        document.body.style.overflow = previousOverflowStyle.current;
      } else {
        document.body.style.removeProperty('overflow');
      }
    };
  }, []);

  const toggleMobileMenu = () => {
    const newMenuState = !mobileMenuOpen;
    setMobileMenuOpen(newMenuState);
    
    if (newMenuState) {
      // Store the current overflow style before changing it
      previousOverflowStyle.current = document.body.style.overflow || "";
      document.body.style.overflow = 'hidden';
    } else {
      // Restore previous overflow style
      if (previousOverflowStyle.current) {
        document.body.style.overflow = previousOverflowStyle.current;
      } else {
        document.body.style.removeProperty('overflow');
      }
      previousOverflowStyle.current = "";
    }
  };

  const isLoggedIn = localStorage.getItem("sanghos_user") !== null;
  
  const handleSignOut = () => {
    localStorage.removeItem("sanghos_user");
    window.location.href = "/";
  };

  const handleCommunityClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/community-teaser');
    }
  };

  const NavLink = ({ to, children, className, onClick }) => {
    return (
      <Link 
        to={to}
        className={className}
        onClick={(e) => {
          if (onClick) onClick(e);
        }}
      >
        {children}
      </Link>
    );
  };

  // Mobile Menu Component rendered through a Portal
  const MobileMenu = () => {
    if (!mobileMenuOpen) return null;
    
    return createPortal(
      // Removed transform from the main container to avoid stacking context issues
      // Using static positioning and full-screen absolute dimensions
      <div 
        className="fixed inset-0 bg-white z-[2000] flex flex-col pt-20 pb-6 px-6 md:hidden"
        style={{ isolation: 'isolate' }} // Ensures this creates its own stacking context
      >
        <div className="flex flex-col space-y-6 mt-4">
          {/* Navigation links */}
          <Link
            to="/"
            className={cn(
              "text-lg font-medium py-2 border-b border-slate-100",
              location.pathname === "/" ? "text-primary" : "text-slate-800"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/retreats"
            className={cn(
              "text-lg font-medium py-2 border-b border-slate-100",
              location.pathname === "/retreats" ? "text-primary" : "text-slate-800"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            Retreats
          </Link>
          <Link
            to="/wellness-journal"
            className={cn(
              "text-lg font-medium py-2 border-b border-slate-100",
              location.pathname === "/wellness-journal" ? "text-primary" : "text-slate-800"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            AI Retreat Finder
          </Link>
          <Link
            to="/about"
            className={cn(
              "text-lg font-medium py-2 border-b border-slate-100",
              location.pathname === "/about" ? "text-primary" : "text-slate-800"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to={isLoggedIn ? "/community" : "/community-teaser"}
            className={cn(
              "text-lg font-medium py-2 border-b border-slate-100",
              (location.pathname === "/community" || location.pathname === "/community-teaser") 
                ? "text-primary" : "text-slate-800"
            )}
            onClick={(e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                setMobileMenuOpen(false);
                navigate('/community-teaser');
              } else {
                setMobileMenuOpen(false);
              }
            }}
          >
            Community
          </Link>
          
          {/* Account actions */}
          <div className="flex flex-col space-y-3 mt-4">
            {isLoggedIn ? (
              <>
                <Button 
                  asChild 
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <User size={16} className="mr-2" />
                    My Dashboard
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="default">
                  <Link 
                    to="/join" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Join Sanghos
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link 
                    to="/login" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>,
      document.body // Mount directly to body to escape all stacking contexts
    );
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
            : "bg-white/95 backdrop-blur-md shadow-sm py-4"
        )}
      >
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          <Link to="/" className="relative z-10">
            <img 
              src="/lovable-uploads/e38deb47-fbee-4a9f-9466-0ad53f2d7a19.png" 
              alt="Sanghos Logo" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavLink 
                    to="/"
                    className={cn(
                      "group inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors",
                      location.pathname === "/" 
                        ? "text-primary" 
                        : "text-slate-700 hover:text-primary"
                    )}
                    onClick={null}
                  >
                    Home
                  </NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavLink 
                    to="/retreats"
                    className={cn(
                      "group inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors",
                      location.pathname === "/retreats" 
                        ? "text-primary" 
                        : "text-slate-700 hover:text-primary"
                    )}
                    onClick={null}
                  >
                    Retreats
                  </NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavLink 
                    to="/wellness-journal"
                    className={cn(
                      "group inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors",
                      location.pathname === "/wellness-journal" 
                        ? "text-primary" 
                        : "text-slate-700 hover:text-primary"
                    )}
                    onClick={null}
                  >
                    AI Retreat Finder
                  </NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavLink 
                    to="/about"
                    className={cn(
                      "group inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors",
                      location.pathname === "/about" 
                        ? "text-primary" 
                        : "text-slate-700 hover:text-primary"
                    )}
                    onClick={null}
                  >
                    About Us
                  </NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavLink 
                    to={isLoggedIn ? "/community" : "/community-teaser"}
                    className={cn(
                      "group inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors",
                      (location.pathname === "/community" || location.pathname === "/community-teaser") 
                        ? "text-primary" 
                        : "text-slate-700 hover:text-primary"
                    )}
                    onClick={handleCommunityClick}
                  >
                    Community
                  </NavLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Account actions desktop */}
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
                    <DropdownMenuItem onClick={handleSignOut}>
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

          {/* Mobile menu button - ultra high z-index and fixed position to ensure it's always accessible */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center justify-center z-[2001] bg-white rounded-full w-10 h-10 shadow-sm relative"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            style={{ isolation: 'isolate' }} // Creates its own stacking context
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-slate-800" />
            ) : (
              <Menu size={24} className="text-slate-800" />
            )}
          </button>
        </div>
      </header>

      {/* Render mobile menu through portal */}
      <MobileMenu />
    </>
  );
};

export default Header;
