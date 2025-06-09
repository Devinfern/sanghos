
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Calendar, MapPin, Share2, Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface EnhancedRetreatHeaderProps {
  retreat: {
    id?: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    image: string;
    participants?: number;
    maxParticipants?: number;
  };
  userJoined?: boolean;
  onJoinCommunity?: () => void;
  onLeaveCommunity?: () => void;
}

const EnhancedRetreatHeader = ({ 
  retreat, 
  userJoined = false, 
  onJoinCommunity, 
  onLeaveCommunity 
}: EnhancedRetreatHeaderProps) => {
  const navigate = useNavigate();
  const [isNotifying, setIsNotifying] = useState(false);

  const formatDateRange = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return "Dates TBA";
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return `${start.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })} - ${end.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })}`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: retreat.title,
          text: retreat.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="relative">
      {/* Hero Image Section */}
      <div className="relative h-80 md:h-96 overflow-hidden rounded-xl">
        <img 
          src={retreat.image || "/placeholder.svg"} 
          alt={retreat.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => navigate('/community')}
            className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Community
          </Button>
        </div>
        
        {/* Share Button */}
        <div className="absolute top-6 right-6">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handleShare}
            className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-brand-primary text-white border-0">
                Community
              </Badge>
              {retreat.participants && (
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {retreat.participants} members
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
              {retreat.title}
            </h1>
            
            <p className="text-lg text-white/90 mb-4 max-w-2xl leading-relaxed">
              {retreat.description || "Join this amazing retreat community and connect with like-minded individuals."}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80 mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDateRange(retreat.startDate, retreat.endDate)}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{retreat.location || "Location TBA"}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>
                  {retreat.participants || 0}
                  {retreat.maxParticipants && ` / ${retreat.maxParticipants}`} participants
                </span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {userJoined ? (
                <>
                  <Button 
                    variant="secondary"
                    onClick={onLeaveCommunity}
                    className="bg-white/90 text-brand-dark hover:bg-white"
                  >
                    Leave Community
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setIsNotifying(!isNotifying)}
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    {isNotifying ? (
                      <>
                        <BellOff className="h-4 w-4 mr-2" />
                        Turn off notifications
                      </>
                    ) : (
                      <>
                        <Bell className="h-4 w-4 mr-2" />
                        Get notifications
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={onJoinCommunity}
                  className="bg-brand-primary hover:bg-brand-primary/90 text-white"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Join Community
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedRetreatHeader;
