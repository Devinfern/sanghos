
import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/OptimizedImage';
import PropertyTypeIcon from '@/components/PropertyTypeIcon';
import { RetreatCenter } from '@/lib/wellnessCentersData';

interface RetreatCenterCardProps {
  center: RetreatCenter;
  index: number;
}

const RetreatCenterCard = ({ center, index }: RetreatCenterCardProps) => {
  const getPriceDisplay = (priceRange: string) => {
    const priceLabels = {
      '$': 'Budget',
      '$$': 'Moderate',
      '$$$': 'Premium',
      '$$$$': 'Luxury'
    };
    return priceLabels[priceRange as keyof typeof priceLabels] || priceRange;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="h-full"
    >
      <Card className="group overflow-hidden border border-sand-200 hover:border-brand-primary/30 transition-all duration-300 hover:shadow-xl bg-white h-full flex flex-col rounded-xl">
        <div className="relative overflow-hidden">
          <OptimizedImage
            src={center.image}
            alt={center.name}
            aspectRatio="video"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Property Type Badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-white/90 text-brand-dark backdrop-blur-sm shadow-md">
              <PropertyTypeIcon propertyType={center.propertyType} className="h-3 w-3 mr-1" />
              {center.propertyType}
            </Badge>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 text-brand-dark backdrop-blur-sm shadow-md">
              <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
              {center.rating}
            </Badge>
          </div>

          {/* Price Range Badge */}
          <div className="absolute bottom-3 left-3">
            <Badge variant="default" className="bg-brand-primary/90 text-white backdrop-blur-sm shadow-md">
              {getPriceDisplay(center.priceRange)}
            </Badge>
          </div>
        </div>

        <CardContent className="p-5 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-brand-dark mb-1 group-hover:text-brand-primary transition-colors">
              {center.name}
            </h3>
            
            <div className="flex items-center text-sm text-muted-foreground mb-3">
              <MapPin className="h-4 w-4 mr-2 text-brand-primary/80 flex-shrink-0" />
              <span>{center.location}</span>
            </div>

            <p className="text-sm text-slate-600 line-clamp-3 mb-4">
              {center.description}
            </p>

            {/* Specialties */}
            <div className="flex flex-wrap gap-1 mb-4">
              {center.specialties.slice(0, 3).map((specialty) => (
                <Badge key={specialty} variant="outline" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-1 mb-4">
              {center.amenities.slice(0, 2).map((amenity) => (
                <Badge key={amenity} variant="secondary" className="text-xs bg-sage-100 text-sage-700">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-sand-100">
            <Button 
              variant="outline" 
              className="w-full border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white group"
              asChild
            >
              <a href={center.website} target="_blank" rel="noopener noreferrer">
                Visit Website
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RetreatCenterCard;
