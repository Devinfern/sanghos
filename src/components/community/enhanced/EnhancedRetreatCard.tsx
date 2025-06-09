
import { Calendar, MapPin, Users, ArrowRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface EnhancedRetreatCardProps {
  retreat: any;
  index: number;
  onJoinCommunity: () => void;
  onExploreDetails: () => void;
}

const EnhancedRetreatCard = ({ 
  retreat, 
  index, 
  onJoinCommunity, 
  onExploreDetails 
}: EnhancedRetreatCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden border-brand-subtle/20 hover:border-brand-primary/30 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-white">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={retreat.image} 
            alt={retreat.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Enhanced overlay with badges */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute top-3 left-3">
            <Badge className="bg-brand-peach text-brand-dark font-semibold border-0 shadow-lg">
              {retreat.participants >= 10 ? "Popular" : "Upcoming"}
            </Badge>
          </div>
          
          <div className="absolute top-3 right-3">
            <div className="flex items-center bg-white/90 backdrop-blur-sm text-brand-dark rounded-full px-2 py-1 text-xs font-medium">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(retreat.startDate)}
            </div>
          </div>
          
          {/* Participants count - more prominent */}
          <div className="absolute bottom-3 right-3">
            <div className="flex items-center bg-brand-primary/90 backdrop-blur-sm text-white rounded-full px-3 py-1.5 text-sm font-semibold shadow-lg">
              <Users className="h-4 w-4 mr-1.5" />
              {retreat.participants} joined
            </div>
          </div>
        </div>
        
        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
              {retreat.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {retreat.description}
            </p>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1.5 text-brand-primary" />
            <span className="font-medium">{retreat.location}</span>
          </div>
          
          {/* Enhanced action buttons */}
          <div className="flex gap-3 pt-4 border-t border-brand-subtle/20">
            <Button 
              variant="outline"
              size="sm"
              onClick={onExploreDetails}
              className="flex-1 border-brand-primary/30 text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 group/btn"
            >
              <Star className="h-4 w-4 mr-1 group-hover/btn:rotate-12 transition-transform" />
              Explore Details
            </Button>
            <Button 
              size="sm"
              onClick={onJoinCommunity}
              className="flex-1 bg-brand-primary hover:bg-brand-primary/90 transition-all duration-300 group/btn"
            >
              Join Community
              <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnhancedRetreatCard;
