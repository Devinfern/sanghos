
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { megaMenuData, getLayoutConfig, MegaMenuSection } from "./NavigationData";

interface MegaMenuDropdownProps {
  activeMenu: string | null;
  onMouseEnter: (menu: string) => void;
  onMouseLeave: () => void;
}

export const MegaMenuDropdown = ({ activeMenu, onMouseEnter, onMouseLeave }: MegaMenuDropdownProps) => {
  return (
    <AnimatePresence>
      {activeMenu && megaMenuData[activeMenu] && (
        <motion.div
          initial={{ opacity: 0, y: 5, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="fixed left-0 right-0 top-[88px] z-40"
          onMouseEnter={() => onMouseEnter(activeMenu)}
          onMouseLeave={onMouseLeave}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-black/10 p-8 max-w-5xl mx-auto">
              {/* Active menu indicator */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/95 border-l border-t border-white/20 rotate-45 backdrop-blur-xl"></div>
              
              {(() => {
                const sections = megaMenuData[activeMenu];
                const layoutConfig = getLayoutConfig(sections);
                
                return (
                  <div 
                    className={cn(
                      "gap-8",
                      layoutConfig.useSingleColumn ? "space-y-8" : "grid grid-cols-2 gap-12"
                    )}
                  >
                    {sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="space-y-6">
                        <h3 className="text-sm font-semibold text-brand-slate/60 uppercase tracking-wide">
                          {section.title}
                        </h3>
                        <div className="space-y-3">
                          {section.items.map((item, itemIndex) => (
                            <Link
                              key={itemIndex}
                              to={item.href}
                              className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-brand-primary/5 transition-all duration-200"
                            >
                              <div className="flex-shrink-0 w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                                <item.icon className="h-5 w-5 text-brand-primary" />
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
                                <p className="text-xs text-brand-slate/70 mt-1 leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
