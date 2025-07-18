import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Smile, Paperclip, MoreVertical, Heart, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  user_id: string;
  channel_id: string;
  created_at: string;
  reactions: Record<string, number>;
  user_profiles?: {
    username: string;
    avatar_url?: string;
  };
}

interface UnifiedMessagingProps {
  channelId?: string;
  placeholder?: string;
  className?: string;
}

const UnifiedMessaging = ({ 
  channelId = "general", 
  placeholder = "Type a message...",
  className 
}: UnifiedMessagingProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get current user
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    getCurrentUser();

    // Fetch initial messages
    const fetchMessages = async () => {
      const { data: messagesData } = await supabase
        .from('messages')
        .select('*')
        .eq('channel_id', channelId)
        .order('created_at', { ascending: true });

      if (messagesData) {
        // Get user profiles for all message authors
        const userIds = [...new Set(messagesData.map(msg => msg.user_id).filter(Boolean))];
        
        const { data: profilesData } = await supabase
          .from('user_profiles')
          .select('*')
          .in('user_id', userIds);

        // Combine messages with user profiles
        const typedMessages = messagesData.map(msg => ({
          ...msg,
          reactions: (msg.reactions as any) || {},
          user_profiles: profilesData?.find(profile => profile.user_id === msg.user_id)
        }));
        
        setMessages(typedMessages);
      }
    };

    fetchMessages();

    // Set up real-time subscription
    const channel = supabase
      .channel(`messages-${channelId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `channel_id=eq.${channelId}`
      }, async (payload) => {
        const newMessage = payload.new as any;
        
        // Get user profile for the new message
        const { data: profileData } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', newMessage.user_id)
          .single();

        const messageWithProfile = {
          ...newMessage,
          reactions: newMessage.reactions || {},
          user_profiles: profileData
        };

        setMessages(prev => [...prev, messageWithProfile]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [channelId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentUserId) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          content: newMessage,
          user_id: currentUserId,
          channel_id: channelId
        });

      if (!error) {
        setNewMessage("");
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const addReaction = async (messageId: string, emoji: string) => {
    try {
      const message = messages.find(m => m.id === messageId);
      if (!message) return;

      const newReactions = { ...message.reactions };
      newReactions[emoji] = (newReactions[emoji] || 0) + 1;

      const { error } = await supabase
        .from('messages')
        .update({ reactions: newReactions })
        .eq('id', messageId);

      if (!error) {
        setMessages(prev => prev.map(m => 
          m.id === messageId 
            ? { ...m, reactions: newReactions }
            : m
        ));
      }
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  return (
    <Card className={cn("flex flex-col h-full", className)}>
      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="group"
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={message.user_profiles?.avatar_url} />
                  <AvatarFallback>
                    {message.user_profiles?.username?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-brand-dark">
                      {message.user_profiles?.username || 'Anonymous'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(message.created_at), 'HH:mm')}
                    </span>
                  </div>
                  
                  <div className="bg-brand-subtle/5 rounded-lg p-3 relative group-hover:bg-brand-subtle/10 transition-colors">
                    <p className="text-sm text-brand-dark whitespace-pre-wrap">
                      {message.content}
                    </p>
                    
                    {/* Quick Actions */}
                    <div className="absolute -top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-1 bg-white shadow-sm border rounded-full p-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => addReaction(message.id, '❤️')}
                          className="h-6 w-6 p-0 hover:bg-red-50"
                        >
                          <Heart className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-blue-50"
                        >
                          <Reply className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                        >
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Reactions */}
                  {message.reactions && Object.keys(message.reactions).length > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      {Object.entries(message.reactions).map(([emoji, count]) => (
                        <Button
                          key={emoji}
                          variant="ghost"
                          size="sm"
                          onClick={() => addReaction(message.id, emoji)}
                          className="h-6 px-2 text-xs bg-brand-subtle/5 hover:bg-brand-subtle/10 rounded-full"
                        >
                          {emoji} {count}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-brand-subtle/20 p-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="pr-20 rounded-full border-brand-subtle/20 focus:border-brand-primary"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-brand-subtle/10 rounded-full"
              >
                <Smile className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-brand-subtle/10 rounded-full"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim() || isLoading}
            className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full h-9 w-9 p-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default UnifiedMessaging;