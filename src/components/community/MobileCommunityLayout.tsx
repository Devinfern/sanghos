import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import MobileBottomNavigation from "./MobileBottomNavigation";
import SmartNotifications from "./SmartNotifications";
import UnifiedMessaging from "./UnifiedMessaging";
import QuickActions from "./QuickActions";
import CreatePost from "./CreatePost";
import { cn } from "@/lib/utils";

interface MobileCommunityLayoutProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  children: React.ReactNode;
  title?: string;
  showSearch?: boolean;
  showMessaging?: boolean;
  onBack?: () => void;
}

const MobileCommunityLayout = ({
  activeSection,
  onSectionChange,
  children,
  title,
  showSearch = false,
  showMessaging = false,
  onBack
}: MobileCommunityLayoutProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showQuickChat, setShowQuickChat] = useState(false);

  const getSectionTitle = (section: string) => {
    switch (section) {
      case 'dashboard':
        return 'Community';
      case 'discussions':
        return 'Discussions';
      case 'members':
        return 'Members';
      case 'events':
        return 'Events';
      default:
        return section.charAt(0).toUpperCase() + section.slice(1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-brand-subtle/10 md:hidden">
      {/* Mobile Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-brand-subtle/20">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="p-2 hover:bg-brand-subtle/10 rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div>
              <h1 className="text-lg font-semibold text-brand-dark">
                {title || getSectionTitle(activeSection)}
              </h1>
              {activeSection === 'discussions' && (
                <p className="text-sm text-muted-foreground">
                  Stay connected with the community
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {showSearch && (
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-brand-subtle/10 rounded-full"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            <SmartNotifications />
          </div>
        </div>
        
        {/* Search Bar */}
        {showSearch && (
          <div className="px-4 pb-3">
            <Input
              placeholder="Search discussions, people, events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-brand-subtle/5 border-brand-subtle/20 rounded-full"
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 pb-20">
        {children}
      </div>

      {/* Quick Chat Overlay */}
      <AnimatePresence>
        {showQuickChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowQuickChat(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-brand-subtle/20">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Quick Chat</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowQuickChat(false)}
                    className="p-2"
                  >
                    ×
                  </Button>
                </div>
              </div>
              <div className="h-96">
                <UnifiedMessaging />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowCreatePost(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-brand-subtle/20">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Create New Post</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCreatePost(false)}
                    className="p-2"
                  >
                    ×
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <CreatePost 
                  onPostCreated={() => {
                    setShowCreatePost(false);
                    // Refresh posts
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <MobileBottomNavigation
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        onNewPost={() => setShowCreatePost(true)}
      />

      {/* Quick Chat FAB */}
      {showMessaging && (
        <Button
          onClick={() => setShowQuickChat(true)}
          className="fixed bottom-20 right-4 z-40 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full h-12 w-12 p-0 shadow-lg"
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default MobileCommunityLayout;