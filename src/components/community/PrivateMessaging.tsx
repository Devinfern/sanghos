
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

interface PrivateMessagingProps {
  currentUserId: string;
  retreatMembers: any[];
}

const PrivateMessaging = ({ currentUserId, retreatMembers }: PrivateMessagingProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  
  // Mock data - in real app this would come from Supabase
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      participantId: "user-2",
      participantName: "Sarah Johnson",
      participantAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      lastMessage: "Looking forward to the retreat!",
      lastMessageTime: "5m ago",
      unreadCount: 2,
      isOnline: true
    },
    {
      id: "2",
      participantId: "user-3",
      participantName: "Michael Chen",
      participantAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      lastMessage: "Thanks for the packing tips",
      lastMessageTime: "1h ago",
      unreadCount: 0,
      isOnline: false
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "user-2",
      senderName: "Sarah Johnson",
      senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      content: "Hi! I saw your post about meditation techniques. Do you have any recommendations for beginners?",
      timestamp: "10:30 AM",
      read: true
    },
    {
      id: "2",
      senderId: currentUserId,
      senderName: "You",
      senderAvatar: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400",
      content: "Absolutely! I'd recommend starting with guided meditations. There are some great apps like Headspace or Calm.",
      timestamp: "10:32 AM",
      read: true
    },
    {
      id: "3",
      senderId: "user-2",
      senderName: "Sarah Johnson",
      senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      content: "Looking forward to the retreat!",
      timestamp: "10:35 AM",
      read: false
    }
  ]);

  const totalUnreadCount = conversations.reduce((total, conv) => total + conv.unreadCount, 0);

  const filteredConversations = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const sendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: currentUserId,
        senderName: "You",
        senderAvatar: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400",
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage("");
      
      // Update conversation last message
      setConversations(prev => prev.map(conv => 
        conv.id === selectedConversation 
          ? { ...conv, lastMessage: newMessage.trim(), lastMessageTime: "now" }
          : conv
      ));
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg bg-brand-primary hover:bg-brand-primary/90"
        size="sm"
      >
        <MessageCircle className="h-5 w-5" />
        {totalUnreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
          >
            {totalUnreadCount}
          </Badge>
        )}
      </Button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 w-80 h-96 z-50"
    >
      <Card className="h-full flex flex-col shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Messages</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {!selectedConversation && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-8"
              />
            </div>
          )}
        </CardHeader>
        
        <CardContent className="flex-1 overflow-hidden p-0">
          {!selectedConversation ? (
            // Conversations List
            <div className="h-full overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className="p-3 border-b cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={conversation.participantAvatar} />
                        <AvatarFallback>{conversation.participantName[0]}</AvatarFallback>
                      </Avatar>
                      {conversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{conversation.participantName}</p>
                        <p className="text-xs text-muted-foreground">{conversation.lastMessageTime}</p>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Chat View
            <div className="h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-3 border-b flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedConversation(null)}
                  className="p-1 h-6 w-6"
                >
                  ←
                </Button>
                <Avatar className="h-6 w-6">
                  <AvatarImage src={selectedConv?.participantAvatar} />
                  <AvatarFallback>{selectedConv?.participantName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{selectedConv?.participantName}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedConv?.isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.senderId !== currentUserId && (
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={message.senderAvatar} />
                        <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] rounded-lg p-2 text-sm ${
                        message.senderId === currentUserId
                          ? 'bg-brand-primary text-white'
                          : 'bg-muted'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === currentUserId ? 'text-white/80' : 'text-muted-foreground'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-3 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 h-8"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PrivateMessaging;
