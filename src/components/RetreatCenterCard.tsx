
import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import OptimizedImage from '@/components/OptimizedImage';
import { RetreatCenter } from '@/lib/wellnessCentersData';

interface RetreatCenterCardProps {
  center: RetreatCenter;
  index: number;
}

const RetreatCenterCard = ({ center, index }: RetreatCenterCardProps) => {
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
          <div className="absolute top-3 left-3 flex gap-2">
            {center.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="bg-white/90 text-brand-dark backdrop-blur-sm shadow-md">
                {specialty}
              </Badge>
            ))}
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
