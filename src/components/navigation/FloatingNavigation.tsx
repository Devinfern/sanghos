
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calendar, Users, BookOpen, Heart, Star, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import SanghosIcon from "@/components/SanghosIcon";

interface MegaMenuContent {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface MegaMenuSection {
  title: string;
  items: MegaMenuContent[];
}

const megaMenuData: Record<string, MegaMenuSection[]> = {
  retreats: [
    {
      title: "Browse Retreats",
      items: [
        {
          title: "All Retreats",
          description: "Explore our full collection of wellness retreats",
          href: "/retreats",
          icon: Calendar
        },
        {
          title: "Sanghos Retreats",
          description: "Curated experiences in unique private spaces",
          href: "/retreats?tab=sanghos",
          icon: Star,
          badge: "Featured"
        },
        {
          title: "Partner Retreats",
          description: "Retreats from our trusted wellness partners",
          href: "/retreats?tab=thirdparty",
          icon: Heart
        }
      ]
    },
    {
      title: "Popular Categories",
      items: [
        {
          title: "Mindfulness",
          description: "Find peace through guided meditation",
          href: "/retreats?category=Mindfulness",
          icon: Heart
        },
        {
          title: "Yoga",
          description: "Movement and breath practices",
          href: "/retreats?category=Yoga",
          icon: Users
        },
        {
          title: "Wellness",
          description: "Holistic health and wellbeing",
          href: "/retreats?category=Wellness",
          icon: Star
        }
      ]
    }
  ],
  insights: [
    {
      title: "Learn & Grow",
      items: [
        {
          title: "All Insights",
          description: "Latest wellness articles and guides",
          href: "/blog",
          icon: BookOpen
        },
        {
          title: "Mindfulness News",
          description: "Stay updated with mindfulness trends",
          href: "/blog/mindfulness-news",
          icon: Heart
        }
      ]
    }
  ],
  community: [
    {
      title: "Connect",
      items: [
        {
          title: "Community Hub",
          description: "Connect with like-minded wellness enthusiasts",
          href: "/community",
          icon: Users,
          badge: "Members Only"
        },
        {
          title: "Community Preview",
          description: "See what our community is all about",
          href: "/community-teaser",
          icon: Heart
        }
      ]
    }
  ],
  about: [
    {
      title: "About Sanghos",
      items: [
        {
          title: "Our Story",
          description: "Learn about our mission and values",
          href: "/about-us",
          icon: Heart
        },
        {
          title: "Teach With Us",
          description: "Share your expertise with our community",
          href: "/teach-with-us",
          icon: Users
        },
        {
          title: "Become a Host",
          description: "Open your space for wellness retreats",
          href: "/become-host",
          icon: MapPin
        }
      ]
    }
  ]
};

// Utility function to determine layout configuration
const getLayoutConfig = (sections: MegaMenuSection[]) => {
  const totalSections = sections.length;
  const totalItems = sections.reduce((acc, section) => acc + section.items.length, 0);
  
  // Single column for menus with 1 section or fewer items
  const useSingleColumn = totalSections === 1 || totalItems <= 3;
  
  // Calculate dynamic width based on content
  const baseWidth = useSingleColumn ? 320 : 480;
  const itemPadding = totalItems * 8; // Additional width per item
  const dynamicWidth = Math.min(baseWidth + itemPadding, 600);
  
  return {
    useSingleColumn,
    width: dynamicWidth,
    gridCols: useSingleColumn ? 1 : 2
  };
};

interface FloatingNavigationProps {
  isLoggedIn: boolean;
  onCommunityClick: (e: React.MouseEvent) => void;
}

export const FloatingNavigation = ({ isLoggedIn, onCommunityClick }: FloatingNavigationProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const navItems = [
    { id: "retreats", label: "Retreats", hasDropdown: true },
    { id: "insights", label: "Insights", hasDropdown: true },
    { id: "community", label: "Community", hasDropdown: true, onClick: onCommunityClick },
    { id: "about", label: "About", hasDropdown: true }
  ];

  return (
    <div className="hidden lg:flex items-center justify-center relative">
      {/* Main Floating Navigation Pill */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-50"
      >
        <div className="bg-white/90 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 shadow-xl shadow-black/5">
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                {item.hasDropdown ? (
                  <button
                    onClick={item.onClick}
                    className={cn(
                      "flex items-center space-x-1 text-brand-slate hover:text-brand-primary transition-colors duration-200 font-medium py-2 px-3 rounded-full hover:bg-brand-primary/5",
                      activeMenu === item.id && "text-brand-primary bg-brand-primary/5"
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronDown 
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        activeMenu === item.id && "rotate-180"
                      )} 
                    />
                  </button>
                ) : (
                  <Link
                    to={`/${item.id}`}
                    className="text-brand-slate hover:text-brand-primary transition-colors duration-200 font-medium py-2 px-3 rounded-full hover:bg-brand-primary/5"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Individual Button Positioned Dropdown */}
                <AnimatePresence>
                  {activeMenu === item.id && megaMenuData[item.id] && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-1 z-40"
                      onMouseEnter={() => handleMouseEnter(activeMenu)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {(() => {
                        const sections = megaMenuData[item.id];
                        const layoutConfig = getLayoutConfig(sections);
                        
                        return (
                          <div 
                            className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-black/10 p-6"
                            style={{ width: `${layoutConfig.width}px` }}
                          >
                            <div 
                              className={cn(
                                "gap-6",
                                layoutConfig.useSingleColumn ? "space-y-6" : "grid grid-cols-2 gap-8"
                              )}
                            >
                              {sections.map((section, sectionIndex) => (
                                <div key={sectionIndex} className="space-y-4">
                                  <h3 className="text-sm font-semibold text-brand-slate/60 uppercase tracking-wide">
                                    {section.title}
                                  </h3>
                                  <div className="space-y-2">
                                    {section.items.map((item, itemIndex) => (
                                      <Link
                                        key={itemIndex}
                                        to={item.href}
                                        className="group flex items-start space-x-3 p-3 rounded-xl hover:bg-brand-primary/5 transition-all duration-200"
                                      >
                                        <div className="flex-shrink-0 w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                                          <item.icon className="h-4 w-4 text-brand-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center space-x-2">
                                            <h4 className="text-sm font-medium text-brand-dark group-hover:text-brand-primary transition-colors">
                                              {item.title}
                                            </h4>
                                            {item.badge && (
                                              <span className="px-2 py-0.5 text-xs font-medium bg-brand-primary/10 text-brand-primary rounded-full">
                                                {item.badge}
                                              </span>
                                            )}
                                          </div>
                                          <p className="text-xs text-brand-slate/70 mt-0.5 leading-relaxed">
                                            {item.description}
                                          </p>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </motion.nav>
    </div>
  );
};
