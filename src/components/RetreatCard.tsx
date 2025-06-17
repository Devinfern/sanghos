
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Calendar, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import { cn } from '@/lib/utils';
import { useRetreatContext } from '@/contexts/RetreatContext';
import { formatDistance, type UserLocation } from '@/lib/utils/distanceUtils';

interface RetreatCardProps {
  retreat: any;
  index: number;
  comingSoon?: boolean;
  viewMode?: 'grid' | 'list';
  userLocation?: UserLocation | null;
}

const RetreatCard: React.FC<RetreatCardProps> = ({ 
  retreat, 
  index, 
  comingSoon = false,
  viewMode = 'grid',
  userLocation 
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite, addToRecentlyViewed } = useRetreatContext();

  const handleCardClick = () => {
    addToRecentlyViewed(retreat);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite(retreat.id)) {
      removeFromFavorites(retreat.id);
    } else {
      addToFavorites(retreat.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const isListView = viewMode === 'list';

  const cardContent = (
    <Card className={cn(
      "group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden h-full",
      isListView && "flex flex-row h-auto"
    )}>
      <div className={cn(
        "relative overflow-hidden bg-gradient-to-br from-sage-50 to-sage-100",
        isListView ? "w-48 flex-shrink-0" : "aspect-[4/3]"
      )}>
        <OptimizedImage
          src={retreat.image}
          alt={retreat.title}
          className={cn(
            "w-full h-full object-cover transition-all duration-700 group-hover:scale-105",
            isImageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Favorite button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleFavoriteClick}
          className={cn(
            "absolute top-3 right-3 h-8 w-8 p-0 rounded-full bg-white/80 hover:bg-white transition-all duration-200",
            isFavorite(retreat.id) && "text-red-500"
          )}
        >
          <Heart className={cn(
            "h-4 w-4 transition-all duration-200",
            isFavorite(retreat.id) && "fill-current"
          )} />
        </Button>

        {/* Coming soon badge */}
        {comingSoon && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-sage-600 text-white font-medium">
              Coming Soon
            </Badge>
          </div>
        )}

        {/* Price badge */}
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-white/90 text-sage-800 font-semibold">
            {formatPrice(retreat.price)}
          </Badge>
        </div>
      </div>

      <CardContent className={cn(
        "p-6 flex-1",
        isListView && "flex flex-col justify-between"
      )}>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 mb-2">
            {retreat.category.slice(0, 2).map((cat: string) => (
              <Badge key={cat} variant="outline" className="bg-sage-50 text-sage-600 border-sage-200 text-xs">
                {cat}
              </Badge>
            ))}
          </div>

          <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-sage-700 transition-colors">
            {retreat.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {retreat.description}
          </p>

          <div className={cn(
            "space-y-2 text-sm text-muted-foreground",
            isListView && "grid grid-cols-2 gap-2 space-y-0"
          )}>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-sage-500" />
              {retreat.location.city}, {retreat.location.state}
              {userLocation && retreat.distance && (
                <span className="ml-2 text-sage-600 font-medium">
                  • {formatDistance(retreat.distance)}
                </span>
              )}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-sage-500" />
              {formatDate(retreat.date)}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-sage-500" />
              {retreat.duration}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-sage-500" />
              {retreat.remaining} spots left
            </div>
          </div>
        </div>

        {isListView && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-sage-700">
                {formatPrice(retreat.price)}
              </span>
              <Button 
                size="sm"
                className="bg-sage-600 hover:bg-sage-700 text-white"
              >
                View Details
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={handleCardClick}
      className="h-full"
    >
      <Link to={`/retreat/${retreat.id}`} className="block h-full">
        {cardContent}
      </Link>
    </motion.div>
  );
};

export default RetreatCard;
