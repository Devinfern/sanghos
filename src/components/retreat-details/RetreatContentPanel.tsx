
import { motion } from "framer-motion";
import { Tag, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingSection from "./BookingSection";
import InstructorSection from "./InstructorSection";

interface RetreatContentPanelProps {
  retreat: any;
  isVisible: boolean;
}

const RetreatContentPanel = ({ retreat, isVisible }: RetreatContentPanelProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="lg:h-screen lg:overflow-y-auto"
    >
      <div className="p-8 lg:p-12 space-y-8">
        <BookingSection retreat={retreat} />

        {/* Description */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">About This Retreat</h2>
          <p className="text-gray-600 leading-relaxed text-lg">{retreat.description}</p>
        </div>

        {/* Location Details */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">Location</h3>
          <div className="bg-sage-50 rounded-lg p-6">
            <h4 className="font-medium text-gray-900 mb-2">{retreat.location.name}</h4>
            <p className="text-gray-600 mb-2">{retreat.location.city}, {retreat.location.state}</p>
            <p className="text-sm text-gray-500 italic">{retreat.location.description}</p>
          </div>
        </div>

        {/* What's Included */}
        {retreat.amenities && retreat.amenities.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">What's Included</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {retreat.amenities.map((amenity: string, i: number) => (
                <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Tag className="h-4 w-4 text-sage-500 flex-shrink-0" />
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <InstructorSection instructor={retreat.instructor} />

        {/* Original Event Link */}
        {retreat.sourceUrl && (
          <div className="border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-500 mb-3">
              For more details and the latest information, visit the official event page:
            </p>
            <Button asChild variant="outline" className="w-full">
              <a href={retreat.sourceUrl} target="_blank" rel="noopener noreferrer">
                View on {retreat.organizer?.name || 'Original Website'}
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        )}

        {/* Support Section */}
        <div className="bg-sage-50 rounded-lg p-6 text-center">
          <h3 className="font-semibold mb-2 text-gray-900">Need assistance?</h3>
          <p className="text-sm text-gray-600 mb-4">
            If you have questions about this retreat or need help with your booking, our team is here to help.
          </p>
          <Button variant="secondary" className="w-full">
            Contact Support
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default RetreatContentPanel;
