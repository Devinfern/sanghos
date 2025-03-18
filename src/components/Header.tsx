
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if current page has dark background hero - home page and retreat detail pages
  const hasDarkHero = location.pathname === "/" || 
                      location.pathname.startsWith('/retreat/');

  // Handle scrolling effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.style.removeProperty('overflow');
  }, [location.pathname]);

  // Cleanup body overflow style when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, []);

  // Toggle mobile menu and handle body scroll
  const toggleMobileMenu = () => {
    const newMenuState = !mobileMenuOpen;
    setMobileMenuOpen(newMenuState);
    
    if (newMenuState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }
  };

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("sanghos_user") !== null;
  
  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem("sanghos_user");
    window.location.href = "/";
  };

  // Handle community link click for non-logged in users
  const handleCommunityClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/community-teaser');
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        isScrolled || !hasDarkHero
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        {/* Logo */}
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
                <Link 
                  to="/"
                  className={cn(
                    "group inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors",
                    location.pathname === "/" 
                      ? "text-primary" 
                      : (hasDarkHero && !isScrolled) 
                        ? "text-white hover:text-white/80" 
                        : "text-slate-700 hover:text-primary"
                  )}
                >
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/retreats"
                  className={cn(
                    "group inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors",
                    location.pathname === "/retreats" 
                      ? "text-primary" 
                      : (hasDarkHero && !isScrolled) 
                        ? "text-white hover:text-white/80" 
                        : "text-slate-700 hover:text-primary"
                  )}
                >
                  Retreats
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/instructors"
                  className={cn(
                    "group inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors",
                    location.pathname === "/instructors" 
                      ? "text-primary" 
                      : (hasDarkHero && !isScrolled) 
                        ? "text-white hover:text-white/80" 
                        : "text-slate-700 hover:text-primary"
                  )}
                >
                  Instructors
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/about"
                  className={cn(
                    "group inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors",
                    location.pathname === "/about" 
                      ? "text-primary" 
                      : (hasDarkHero && !isScrolled) 
                        ? "text-white hover:text-white/80" 
                        : "text-slate-700 hover:text-primary"
                  )}
                >
                  About Us
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to={isLoggedIn ? "/community" : "/community-teaser"}
                  className={cn(
                    "group inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors",
                    (location.pathname === "/community" || location.pathname === "/community-teaser") 
                      ? "text-primary" 
                      : (hasDarkHero && !isScrolled) 
                        ? "text-white hover:text-white/80" 
                        : "text-slate-700 hover:text-primary"
                  )}
                  onClick={handleCommunityClick}
                >
                  Community
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3 ml-6">
            {isLoggedIn ? (
              <Button 
                size="sm" 
                variant={hasDarkHero && !isScrolled ? "outline" : "outline"}
                className={hasDarkHero && !isScrolled 
                  ? "border-white text-white hover:bg-white/10" 
                  : "border-slate-300 text-slate-800 hover:bg-slate-100"
                }
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            ) : (
              <>
                <Button 
                  size="sm" 
                  variant="outline" 
                  asChild
                  className={hasDarkHero && !isScrolled 
                    ? "border-white text-white hover:bg-white/10" 
                    : "border-slate-300 text-slate-800 hover:bg-slate-100"
                  }
                >
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button 
                  size="sm" 
                  asChild
                  className={hasDarkHero && !isScrolled 
                    ? "bg-white text-sage-900 hover:bg-white/90" 
                    : ""
                  }
                >
                  <Link to="/join">Join Sanghos</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden flex items-center z-50"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X size={24} className={hasDarkHero && !isScrolled ? "text-white" : "text-slate-800"} />
          ) : (
            <Menu size={24} className={hasDarkHero && !isScrolled ? "text-white" : "text-slate-800"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 flex flex-col pt-20 pb-6 px-6 transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col space-y-6 mt-4">
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
            to="/instructors"
            className={cn(
              "text-lg font-medium py-2 border-b border-slate-100",
              location.pathname === "/instructors" ? "text-primary" : "text-slate-800"
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            Instructors
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
          
          {/* Auth Buttons for Mobile */}
          <div className="flex flex-col space-y-3 mt-4">
            {isLoggedIn ? (
              <Button 
                variant="outline" 
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
              >
                Sign Out
              </Button>
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
      </div>
    </header>
  );
};

export default Header;
