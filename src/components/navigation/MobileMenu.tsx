
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { NavLink } from "./NavLink";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onSignOut: () => void;
}

export const MobileMenu = ({ isOpen, onClose, isLoggedIn, onSignOut }: MobileMenuProps) => {
  const [retreatsExpanded, setRetreatsExpanded] = useState(false);
  
  const handleCommunityClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      // Navigate to community teaser for non-logged in users
      window.location.href = '/community-teaser';
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[1000] lg:hidden"
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[1001] lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <span className="text-lg font-semibold text-brand-dark">Menu</span>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-6 py-8">
                <div className="space-y-6">
                  {/* Retreats Dropdown */}
                  <div>
                    <button 
                      onClick={() => setRetreatsExpanded(!retreatsExpanded)}
                      className="flex items-center justify-between w-full text-lg font-medium text-brand-dark"
                    >
                      <span>Retreats</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${retreatsExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {retreatsExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pl-4 space-y-3"
                        >
                          <Link to="/retreats" onClick={onClose} className="block text-base text-muted-foreground hover:text-brand-primary">
                            Browse All Retreats
                          </Link>
                          <Link to="/vendors-marketplace-teaser" onClick={onClose} className="block text-base text-muted-foreground hover:text-brand-primary">
                            Find Vendors
                          </Link>
                          <Link to="/become-host" onClick={onClose} className="block text-base text-muted-foreground hover:text-brand-primary">
                            Host a Retreat
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <NavLink to="/blog" onClick={onClose} className="block text-lg">
                    Insights
                  </NavLink>
                  <NavLink 
                    to="/community" 
                    onClick={handleCommunityClick} 
                    className="block text-lg"
                  >
                    Community
                  </NavLink>
                  <NavLink to="/about-us" onClick={onClose} className="block text-lg">
                    About
                  </NavLink>
                </div>
              </nav>

              {/* Auth Buttons */}
              <div className="p-6 border-t border-gray-100 space-y-3">
                {isLoggedIn ? (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      asChild
                    >
                      <Link to="/dashboard" onClick={onClose}>Dashboard</Link>
                    </Button>
                    <Button 
                      onClick={() => {
                        onSignOut();
                        onClose();
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full border-brand-primary/20 text-brand-primary hover:bg-brand-primary/5"
                      asChild
                    >
                      <Link to="/login" onClick={onClose}>Sign In</Link>
                    </Button>
                    <Button 
                      className="w-full bg-brand-primary hover:bg-brand-primary/90"
                      asChild
                    >
                      <Link to="/signup" onClick={onClose}>Join Sanghos</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
