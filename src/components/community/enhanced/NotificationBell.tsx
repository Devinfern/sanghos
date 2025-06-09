
import { useState, useEffect } from "react";
import { Bell, Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New discussion started",
      message: "Sarah started a discussion about mindful breathing",
      time: "2 min ago",
      unread: true,
      type: "discussion"
    },
    {
      id: 2,
      title: "Event reminder",
      message: "Yoga session starts in 30 minutes",
      time: "5 min ago",
      unread: true,
      type: "event"
    },
    {
      id: 3,
      title: "New retreat available",
      message: "Mountain Meditation Retreat - Early bird pricing",
      time: "1 hour ago",
      unread: false,
      type: "retreat"
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-brand-subtle/10 w-9 h-9">
          <Bell className="h-4 w-4 text-brand-dark" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-0.5 -right-0.5 z-10"
              >
                <Badge className="h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white text-xs rounded-full border-2 border-white min-w-[16px]">
                  {unreadCount}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-80 max-h-96 overflow-y-auto bg-white/95 backdrop-blur-md border-brand-subtle/20 shadow-xl"
      >
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-xs text-brand-primary hover:text-brand-primary/80"
            >
              Mark all read
            </Button>
          )}
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="flex items-start space-x-3 p-3 cursor-pointer hover:bg-brand-subtle/10 transition-colors"
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex-shrink-0 mt-1">
                {notification.unread && (
                  <Dot className="h-4 w-4 text-blue-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${notification.unread ? 'text-brand-dark' : 'text-muted-foreground'}`}>
                  {notification.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {notification.time}
                </p>
              </div>
            </DropdownMenuItem>
          ))
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="text-center text-brand-primary hover:text-brand-primary/80 cursor-pointer">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
