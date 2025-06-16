
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock, Star, ExternalLink } from 'lucide-react';
import { Retreat } from '@/lib/data';
import OptimizedImage from '@/components/OptimizedImage';
import { Link } from 'react-router-dom';

interface RetreatQuickPreviewProps {
  retreat: Retreat | null;
  isOpen: boolean;
  onClose: () => void;
}

const RetreatQuickPreview: React.FC<RetreatQuickPreviewProps> = ({ retreat, isOpen, onClose }) => {
  if (!retreat) return null;

  const formatShortDate = (dateString: string) => {
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

  const handleBookingClick = () => {
    if (retreat.bookingUrl) {
      window.open(retreat.bookingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{retreat.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Image */}
          <div className="relative h-64 rounded-lg overflow-hidden">
            <OptimizedImage
              src={retreat.image}
              alt={retreat.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3">
              <Badge className="bg-white/90 text-sage-800 font-semibold">
                {formatPrice(retreat.price)}
              </Badge>
            </div>
          </div>

          {/* Quick info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              {formatShortDate(retreat.date)}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              {retreat.duration}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              {retreat.location.city}, {retreat.location.state}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              {retreat.remaining} spots left
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {retreat.category.slice(0, 3).map((cat) => (
              <Badge key={cat} variant="outline" className="bg-sage-50 text-sage-600 border-sage-200">
                {cat}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <div>
            <h4 className="font-medium mb-2">About this retreat</h4>
            <p className="text-sm text-muted-foreground line-clamp-4">
              {retreat.description}
            </p>
          </div>

          {/* Instructor */}
          {retreat.instructor && (
            <div>
              <h4 className="font-medium mb-2">Instructor</h4>
              <div className="flex items-center gap-3">
                {retreat.instructor.image && (
                  <OptimizedImage
                    src={retreat.instructor.image}
                    alt={retreat.instructor.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-medium text-sm">{retreat.instructor.name}</p>
                  <p className="text-xs text-muted-foreground">Wellness Instructor</p>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Link to={`/retreat/${retreat.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Full Details
              </Button>
            </Link>
            
            {retreat.bookingUrl && (
              <Button 
                onClick={handleBookingClick}
                className="bg-sage-600 hover:bg-sage-700 text-white px-6"
              >
                Book Now
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RetreatQuickPreview;
