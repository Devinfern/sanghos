
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
      className="h-full"
    >
      <Card className="group overflow-hidden border-brand-subtle/20 hover:border-brand-primary/30 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-white h-full flex flex-col">
        <div className="relative h-56 overflow-hidden">
          <img 
            src={retreat.image} 
            alt={retreat.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Enhanced overlay with badges */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute top-4 left-4">
            <Badge className="bg-brand-peach text-brand-dark font-semibold border-0 shadow-lg px-3 py-1">
              {retreat.participants >= 10 ? "Popular" : "Upcoming"}
            </Badge>
          </div>
          
          <div className="absolute top-4 right-4">
            <div className="flex items-center bg-white/90 backdrop-blur-sm text-brand-dark rounded-full px-3 py-1.5 text-sm font-medium shadow-lg">
              <Calendar className="h-3 w-3 mr-1.5" />
              {formatDate(retreat.startDate)}
            </div>
          </div>
          
          {/* Participants count - more prominent */}
          <div className="absolute bottom-4 right-4">
            <div className="flex items-center bg-brand-primary/90 backdrop-blur-sm text-white rounded-full px-4 py-2 text-sm font-semibold shadow-lg">
              <Users className="h-4 w-4 mr-2" />
              {retreat.participants} joined
            </div>
          </div>
        </div>
        
        <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-primary transition-colors line-clamp-2 leading-tight">
              {retreat.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
              {retreat.description}
            </p>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mr-2 text-brand-primary flex-shrink-0" />
            <span className="font-medium">{retreat.location}</span>
          </div>
          
          {/* Enhanced action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-brand-subtle/20 mt-auto">
            <Button 
              variant="outline"
              size="sm"
              onClick={onExploreDetails}
              className="flex-1 border-brand-primary/30 text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 group/btn py-2.5"
            >
              <Star className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
              Explore Details
            </Button>
            <Button 
              size="sm"
              onClick={onJoinCommunity}
              className="flex-1 bg-brand-primary hover:bg-brand-primary/90 transition-all duration-300 group/btn py-2.5"
            >
              Join Community
              <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnhancedRetreatCard;
