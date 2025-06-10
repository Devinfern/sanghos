
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OptimizedImage from "@/components/OptimizedImage";
import { formatCurrency, getRemainingText } from "@/lib/data";

interface BookingSectionProps {
  retreat: any;
}

const BookingSection = ({ retreat }: BookingSectionProps) => {
  return (
    <div className="lg:sticky lg:top-0 bg-white z-10 pb-6 border-b border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {formatCurrency(retreat.price)}
          </div>
          <Badge 
            variant={retreat.remaining < 5 ? "secondary" : "outline"} 
            className={retreat.remaining < 5 ? "bg-amber-100 text-amber-700" : ""}
          >
            {getRemainingText(retreat.remaining)}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <OptimizedImage
              src={retreat.instructor.image}
              alt={retreat.instructor.name}
              className="w-full h-full object-cover"
              aspectRatio="square"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{retreat.instructor.name}</h3>
            <p className="text-sm text-gray-500">{retreat.instructor.title}</p>
          </div>
        </div>
      </div>

      {/* Booking Buttons */}
      <div className="flex gap-3">
        {retreat.sourceUrl ? (
          <Button asChild className="flex-1 h-12 text-base bg-sage-600 hover:bg-sage-700">
            <a href={retreat.sourceUrl} target="_blank" rel="noopener noreferrer">
              Book on {retreat.organizer?.name || 'External Site'}
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        ) : (
          <Button disabled={retreat.remaining <= 0} asChild className="flex-1 h-12 text-base">
            <Link to={`/booking/${retreat.id}`}>
              {retreat.remaining > 0 ? "Book Now" : "Sold Out"}
            </Link>
          </Button>
        )}
        
        <Button variant="outline" asChild className="h-12 px-6">
          <Link to={`/instructor/${retreat.instructor.id}`}>
            Instructor
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default BookingSection;
