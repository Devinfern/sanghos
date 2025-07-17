import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, MessageCircle, Users, Calendar, Heart, Reply, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Notification {
  id: string;
  type: 'message' | 'mention' | 'event' | 'like' | 'comment' | 'follow';
  title: string;
  content: string;
  user?: {
    name: string;
    avatar?: string;
  };
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

interface SmartNotificationsProps {
  className?: string;
}

const SmartNotifications = ({ className }: SmartNotificationsProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'message',
      title: 'New message from Sarah',
      content: 'Hey! How was your meditation session today?',
      user: { name: 'Sarah Johnson', avatar: '/placeholder.svg' },
      timestamp: new Date().toISOString(),
      read: false,
      actionUrl: '/community/discussions'
    },
    {
      id: '2',
      type: 'like',
      title: 'Someone liked your post',
      content: 'Your post about mindfulness got a new like',
      user: { name: 'Alex Chen', avatar: '/placeholder.svg' },
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: false,
      actionUrl: '/community/discussions'
    },
    {
      id: '3',
      type: 'event',
      title: 'Upcoming retreat reminder',
      content: 'Mountain Wellness Retreat starts in 2 days',
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      read: true,
      actionUrl: '/community/events'
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return MessageCircle;
      case 'mention':
        return Reply;
      case 'event':
        return Calendar;
      case 'like':
        return Heart;
      case 'comment':
        return MessageCircle;
      case 'follow':
        return Users;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return 'text-blue-500';
      case 'mention':
        return 'text-purple-500';
      case 'event':
        return 'text-green-500';
      case 'like':
        return 'text-red-500';
      case 'comment':
        return 'text-blue-500';
      case 'follow':
        return 'text-brand-primary';
      default:
        return 'text-brand-primary';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className={cn("relative", className)}>
      {/* Bell Icon */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-brand-subtle/10 rounded-full"
      >
        <Bell className="h-5 w-5 text-brand-dark" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notifications Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Notification Panel */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 w-80 md:w-96 z-50"
            >
              <Card className="shadow-xl border-brand-subtle/20">
                {/* Header */}
                <div className="p-4 border-b border-brand-subtle/20">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-brand-dark">
                      Notifications
                    </h3>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={markAllAsRead}
                          className="text-xs text-brand-primary hover:bg-brand-primary/10"
                        >
                          Mark all read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsOpen(false)}
                        className="p-1 hover:bg-brand-subtle/10 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Notifications List */}
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <Bell className="h-12 w-12 mx-auto mb-4 text-brand-subtle" />
                      <p className="text-muted-foreground">No notifications yet</p>
                    </div>
                  ) : (
                    <div className="space-y-0">
                      {notifications.map((notification) => {
                        const Icon = getNotificationIcon(notification.type);
                        const iconColor = getNotificationColor(notification.type);
                        
                        return (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={cn(
                              "p-4 border-b border-brand-subtle/10 last:border-b-0 cursor-pointer hover:bg-brand-subtle/5 transition-colors group",
                              !notification.read && "bg-brand-primary/5"
                            )}
                            onClick={() => {
                              markAsRead(notification.id);
                              if (notification.actionUrl) {
                                // Navigate to action URL
                                console.log('Navigate to:', notification.actionUrl);
                              }
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div className={cn(
                                "shrink-0 p-2 rounded-full bg-white shadow-sm",
                                iconColor
                              )}>
                                <Icon className="h-4 w-4" />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="text-sm font-medium text-brand-dark truncate">
                                    {notification.title}
                                  </p>
                                  {!notification.read && (
                                    <div className="shrink-0 w-2 h-2 bg-brand-primary rounded-full" />
                                  )}
                                </div>
                                
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {notification.content}
                                </p>
                                
                                <div className="flex items-center justify-between mt-2">
                                  <div className="flex items-center gap-2">
                                    {notification.user && (
                                      <Avatar className="h-4 w-4">
                                        <AvatarImage src={notification.user.avatar} />
                                        <AvatarFallback className="text-xs">
                                          {notification.user.name[0]}
                                        </AvatarFallback>
                                      </Avatar>
                                    )}
                                    <span className="text-xs text-muted-foreground">
                                      {format(new Date(notification.timestamp), 'HH:mm')}
                                    </span>
                                  </div>
                                  
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeNotification(notification.id);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 hover:text-red-500"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-brand-subtle/20">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-sm text-brand-primary hover:bg-brand-primary/10"
                  >
                    View all notifications
                  </Button>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartNotifications;