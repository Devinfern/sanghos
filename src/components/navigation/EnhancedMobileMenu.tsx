
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SanghosIcon from "@/components/SanghosIcon";

interface EnhancedMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onSignOut: () => void;
  onCommunityClick: (e: React.MouseEvent) => void;
}

export const EnhancedMobileMenu = ({ 
  isOpen, 
  onClose, 
  isLoggedIn, 
  onSignOut,
  onCommunityClick 
}: EnhancedMobileMenuProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const menuSections = [
    {
      id: "retreats",
      title: "Retreats",
      items: [
        { title: "All Retreats", href: "/retreats" },
        { title: "Sanghos Retreats", href: "/retreats?tab=sanghos" },
        { title: "Partner Retreats", href: "/retreats?tab=thirdparty" },
        { title: "Find Vendors", href: "/vendors-marketplace-teaser", badge: "Coming Soon" },
      ]
    },
    {
      id: "insights",
      title: "Insights",
      items: [
        { title: "All Insights", href: "/blog" },
        { title: "Mindfulness News", href: "/blog/mindfulness-news" },
      ]
    },
    {
      id: "community",
      title: "Community",
      items: [
        { title: "Community Hub", href: "/community" },
        { title: "Community Preview", href: "/community-teaser" },
      ]
    },
    {
      id: "about",
      title: "About",
      items: [
        { title: "Our Story", href: "/about-us" },
        { title: "Teach With Us", href: "/teach-with-us" },
        { title: "Become a Host", href: "/become-host" },
      ]
    }
  ];

  const handleSectionClick = (sectionId: string) => {
    console.log("Section clicked:", sectionId);
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleCommunityItemClick = (e: React.MouseEvent, href: string) => {
    console.log("Community item clicked:", href);
    if (href === "/community") {
      onCommunityClick(e);
    }
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      console.log("Backdrop clicked, closing menu");
      onClose();
    }
  };

  const handleCloseClick = () => {
    console.log("Close button clicked");
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
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[1999] lg:hidden"
            onClick={handleBackdropClick}
          />
          
          {/* Full Screen Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-0 z-[2000] lg:hidden bg-gradient-to-br from-white via-white to-brand-subtle/20"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-brand-subtle/20">
                <div className="flex items-center space-x-3">
                  <SanghosIcon className="w-8 h-8" />
                  <span className="text-xl font-bold text-brand-dark">Menu</span>
                </div>
                <button
                  onClick={handleCloseClick}
                  className="p-2 hover:bg-brand-subtle/20 rounded-full transition-colors touch-manipulation"
                >
                  <X className="h-6 w-6 text-brand-slate" />
                </button>
              </div>

              {/* Navigation Content */}
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="space-y-6">
                  {menuSections.map((section) => (
                    <div key={section.id} className="space-y-3">
                      <button
                        onClick={() => handleSectionClick(section.id)}
                        className="w-full flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm hover:shadow-md transition-all duration-200 touch-manipulation"
                      >
                        <span className="text-lg font-medium text-brand-dark">
                          {section.title}
                        </span>
                        <ChevronRight 
                          className={`h-5 w-5 text-brand-slate transition-transform duration-200 ${
                            expandedSection === section.id ? "rotate-90" : ""
                          }`} 
                        />
                      </button>
                      
                      <AnimatePresence>
                        {expandedSection === section.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-2 pl-4">
                              {section.items.map((item, index) => (
                                <Link
                                  key={index}
                                  to={item.href}
                                  onClick={(e) => handleCommunityItemClick(e, item.href)}
                                  className="block p-3 text-brand-slate hover:text-brand-primary hover:bg-brand-primary/5 rounded-lg transition-colors touch-manipulation"
                                >
                                  <div className="flex items-center space-x-2">
                                    <span>{item.title}</span>
                                    {item.badge && (
                                      <span className="px-2 py-1 text-xs bg-brand-primary/10 text-brand-primary rounded-full font-medium">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Auth Section */}
              <div className="p-6 border-t border-brand-subtle/20 space-y-3">
                {isLoggedIn ? (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full bg-white/80 backdrop-blur-sm border-brand-subtle/30 touch-manipulation"
                      asChild
                    >
                      <Link to="/dashboard" onClick={onClose}>Dashboard</Link>
                    </Button>
                    <Button 
                      onClick={() => {
                        console.log("Sign out clicked");
                        onSignOut();
                        onClose();
                      }}
                      variant="outline"
                      className="w-full bg-white/80 backdrop-blur-sm border-brand-subtle/30 touch-manipulation"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full bg-white/80 backdrop-blur-sm border-brand-subtle/30 touch-manipulation"
                      asChild
                    >
                      <Link to="/login" onClick={onClose}>Sign In</Link>
                    </Button>
                    <Button 
                      className="w-full bg-gradient-to-r from-brand-primary to-brand-primary/90 touch-manipulation"
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
