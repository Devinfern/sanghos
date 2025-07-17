import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  MoreHorizontal,
  Clock,
  MapPin,
  Sparkles
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    status?: string;
    badge?: string;
  };
  category: string;
  likes: number;
  comments: number;
  created_at: string;
  tags?: string[];
  image?: string;
  location?: string;
}

interface MasonryPostGridProps {
  posts: Post[];
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onBookmark: (postId: string) => void;
  onShare: (postId: string) => void;
  currentUserId?: string;
}

const MasonryPostGrid = ({ 
  posts, 
  onLike, 
  onComment, 
  onBookmark, 
  onShare, 
  currentUserId 
}: MasonryPostGridProps) => {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set());

  const handleLike = (postId: string) => {
    const newLikedPosts = new Set(likedPosts);
    if (likedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
    onLike(postId);
  };

  const handleBookmark = (postId: string) => {
    const newBookmarkedPosts = new Set(bookmarkedPosts);
    if (bookmarkedPosts.has(postId)) {
      newBookmarkedPosts.delete(postId);
    } else {
      newBookmarkedPosts.add(postId);
    }
    setBookmarkedPosts(newBookmarkedPosts);
    onBookmark(postId);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      meditation: "bg-brand-primary/10 text-brand-primary border-brand-primary/20",
      wellness: "bg-sage-100 text-sage-700 border-sage-200",
      journey: "bg-brand-sand/20 text-brand-sand border-brand-sand/30",
      community: "bg-brand-rose/10 text-brand-rose border-brand-rose/20",
      retreat: "bg-brand-subtle/50 text-brand-dark border-brand-subtle",
      default: "bg-gray-100 text-gray-700 border-gray-200"
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  const getStatusIndicator = (status?: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "meditating": return "bg-brand-primary";
      case "in-retreat": return "bg-brand-sand";
      default: return "bg-gray-400";
    }
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="break-inside-avoid mb-6"
        >
          <Card className="group overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            {/* Post Image */}
            {post.image && (
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <Badge className={`${getCategoryColor(post.category)} backdrop-blur-sm`}>
                    {post.category}
                  </Badge>
                </div>
              </div>
            )}

            <div className="p-6">
              {/* Author Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-brand-subtle text-brand-dark text-sm">
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {post.author.status && (
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusIndicator(post.author.status)}`}></div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-brand-dark text-sm">{post.author.name}</span>
                      {post.author.badge && (
                        <Sparkles className="w-3 h-3 text-brand-sand" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                      {post.location && (
                        <>
                          <span>•</span>
                          <MapPin className="w-3 h-3" />
                          <span>{post.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              {/* Category Badge (if no image) */}
              {!post.image && (
                <Badge className={`${getCategoryColor(post.category)} mb-3`}>
                  {post.category}
                </Badge>
              )}

              {/* Post Content */}
              <div className="mb-4">
                <h3 className="font-semibold text-brand-dark mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {truncateContent(post.content)}
                </p>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 bg-brand-subtle/30 text-brand-dark rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-brand-subtle/20">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`h-8 px-2 gap-1 transition-colors ${
                      likedPosts.has(post.id) 
                        ? 'text-red-500 hover:text-red-600' 
                        : 'text-muted-foreground hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                    <span className="text-xs">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onComment(post.id)}
                    className="h-8 px-2 gap-1 text-muted-foreground hover:text-brand-primary"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">{post.comments}</span>
                  </Button>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleBookmark(post.id)}
                    className={`h-8 w-8 p-0 transition-colors ${
                      bookmarkedPosts.has(post.id)
                        ? 'text-brand-sand hover:text-brand-sand/80'
                        : 'text-muted-foreground hover:text-brand-sand'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarkedPosts.has(post.id) ? 'fill-current' : ''}`} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onShare(post.id)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-brand-primary"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default MasonryPostGrid;