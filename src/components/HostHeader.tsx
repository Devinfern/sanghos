
import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useHost } from "@/contexts/HostContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const HostHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { host, logout } = useHost();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = !mobileMenuOpen ? "hidden" : "auto";
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
        <Link to="/" className="text-2xl font-semibold flex items-center">
          <span className="text-primary">Sanghos</span>
          <span className="ml-2 text-sm bg-primary/10 text-primary px-2 py-1 rounded">Host</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink
            to="/host/dashboard"
            className={({ isActive }) =>
              cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/host/retreats"
            className={({ isActive }) =>
              cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            My Retreats
          </NavLink>
          <NavLink
            to="/host/spaces"
            className={({ isActive }) =>
              cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            My Spaces
          </NavLink>
          
          {host ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={host.image} alt={host.name} />
                    <AvatarFallback>{host.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{host.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {host.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/host/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" asChild>
              <Link to="/host/login">Host Login</Link>
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden flex items-center"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 flex flex-col transition-transform duration-300 ease-in-out md:hidden pt-20",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-6 px-8 py-8">
          <NavLink
            to="/host/dashboard"
            className={({ isActive }) =>
              cn(
                "text-lg font-medium py-2 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/host/retreats"
            className={({ isActive }) =>
              cn(
                "text-lg font-medium py-2 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            My Retreats
          </NavLink>
          <NavLink
            to="/host/spaces"
            className={({ isActive }) =>
              cn(
                "text-lg font-medium py-2 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            My Spaces
          </NavLink>
          {host ? (
            <>
              <NavLink
                to="/host/profile"
                className={({ isActive }) =>
                  cn(
                    "text-lg font-medium py-2 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )
                }
              >
                Profile
              </NavLink>
              <Button variant="outline" onClick={logout}>
                Log out
              </Button>
            </>
          ) : (
            <Button asChild className="w-full">
              <Link to="/host/login">Host Login</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default HostHeader;
