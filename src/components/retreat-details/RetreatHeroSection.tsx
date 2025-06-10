
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import OptimizedImage from "@/components/OptimizedImage";
import { formatDate, getRemainingText } from "@/lib/data";

interface RetreatHeroSectionProps {
  retreat: any;
  isVisible: boolean;
}

const RetreatHeroSection = ({ retreat, isVisible }: RetreatHeroSectionProps) => {
  return (
    <div className="relative h-96 lg:h-screen overflow-hidden">
      <OptimizedImage
        src={retreat.image}
        alt={retreat.title}
        className="w-full h-full object-cover"
        aspectRatio="custom"
        priority={true}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      
      {/* Overlay Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute bottom-0 left-0 right-0 p-8 text-white"
      >
        <div className="flex flex-wrap gap-2 mb-4">
          {retreat.category.map((cat: string) => (
            <Badge key={cat} variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              {cat}
            </Badge>
          ))}
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">{retreat.title}</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/90">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span className="font-medium">{formatDate(retreat.date)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>{retreat.time} • {retreat.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>{retreat.location.city}, {retreat.location.state}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>{getRemainingText(retreat.remaining)}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RetreatHeroSection;
