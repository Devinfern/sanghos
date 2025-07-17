import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Flag, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuickActionsProps {
  itemId: string;
  itemType: 'post' | 'comment' | 'event';
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
  isOwner: boolean;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onBookmark: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

const QuickActions = ({
  itemId,
  itemType,
  likes,
  comments,
  isLiked,
  isBookmarked,
  isOwner,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onEdit,
  onDelete,
  className
}: QuickActionsProps) => {
  const [showMore, setShowMore] = useState(false);

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const actionButtons = [
    {
      icon: Heart,
      label: 'Like',
      count: likes,
      isActive: isLiked,
      onClick: onLike,
      activeColor: 'text-red-500',
      hoverColor: 'hover:bg-red-50 hover:text-red-500'
    },
    {
      icon: MessageCircle,
      label: 'Comment',
      count: comments,
      isActive: false,
      onClick: onComment,
      activeColor: 'text-blue-500',
      hoverColor: 'hover:bg-blue-50 hover:text-blue-500'
    },
    {
      icon: Share2,
      label: 'Share',
      count: 0,
      isActive: false,
      onClick: onShare,
      activeColor: 'text-green-500',
      hoverColor: 'hover:bg-green-50 hover:text-green-500'
    },
    {
      icon: Bookmark,
      label: 'Save',
      count: 0,
      isActive: isBookmarked,
      onClick: onBookmark,
      activeColor: 'text-yellow-500',
      hoverColor: 'hover:bg-yellow-50 hover:text-yellow-500'
    }
  ];

  const moreActions = [
    ...(isOwner ? [
      {
        icon: Edit,
        label: 'Edit',
        onClick: onEdit,
        color: 'text-blue-600 hover:bg-blue-50'
      },
      {
        icon: Trash2,
        label: 'Delete',
        onClick: onDelete,
        color: 'text-red-600 hover:bg-red-50'
      }
    ] : []),
    {
      icon: Flag,
      label: 'Report',
      onClick: () => console.log('Report:', itemId),
      color: 'text-orange-600 hover:bg-orange-50'
    }
  ];

  return (
    <div className={cn("flex items-center justify-between", className)}>
      {/* Main Actions */}
      <div className="flex items-center gap-1">
        {actionButtons.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              variant="ghost"
              size="sm"
              onClick={action.onClick}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-full transition-all",
                action.hoverColor,
                action.isActive && action.activeColor
              )}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className={cn(
                  "h-4 w-4",
                  action.isActive && action.activeColor
                )} />
              </motion.div>
              {action.count > 0 && (
                <span className="text-sm font-medium">
                  {formatCount(action.count)}
                </span>
              )}
            </Button>
          );
        })}
      </div>

      {/* More Actions */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowMore(!showMore)}
          className="p-2 hover:bg-brand-subtle/10 rounded-full"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>

        <AnimatePresence>
          {showMore && (
            <>
              {/* Overlay */}
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setShowMore(false)}
              />
              
              {/* Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-full mt-1 z-50"
              >
                <Card className="shadow-lg border-brand-subtle/20 py-1 min-w-32">
                  {moreActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={action.label}
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          action.onClick?.();
                          setShowMore(false);
                        }}
                        className={cn(
                          "w-full justify-start gap-3 px-3 py-2 rounded-none",
                          action.color
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm">{action.label}</span>
                      </Button>
                    );
                  })}
                </Card>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuickActions;