import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import { Retreat } from "@/lib/data";
import SanghosIcon from "./SanghosIcon";

interface RetreatCardProps {
  retreat: Retreat;
  index: number;
  comingSoon?: boolean;
}

const RetreatCard: React.FC<RetreatCardProps> = ({ retreat, index, comingSoon = false }) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105",
        isEven ? "transform translate-y-2" : "",
        comingSoon ? "opacity-90" : ""
      )}
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={retreat.image}
          alt={retreat.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {comingSoon && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-blue-500 text-white">Coming Soon</Badge>
          </div>
        )}
        {retreat.isSanghos && (
          <div className="absolute bottom-3 right-3 flex items-center bg-white text-sage-500 rounded-full px-3 py-1 text-sm font-medium">
            <SanghosIcon className="h-4 w-4 mr-1" />
            <span>Sanghos</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">{retreat.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{retreat.description}</p>

        <div className="flex items-center mt-4 text-gray-500">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">{retreat.date}</span>
        </div>

        <div className="flex items-center mt-2 text-gray-500">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm line-clamp-1">{retreat.location.city}, {retreat.location.state}</span>
        </div>

        <div className="flex items-center mt-2 text-gray-500">
          <Users className="h-4 w-4 mr-2" />
          <span className="text-sm">{retreat.remaining} spots left</span>
        </div>
        
        {/* Update the Link to use /retreat/ prefix for all retreats */}
        <Link to={`/retreat/${retreat.id}`}>
          <Button
            className="w-full mt-6 relative overflow-hidden bg-sage-600 hover:bg-sage-700 text-white"
          >
            {comingSoon ? "View Details" : "Book Now"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RetreatCard;
