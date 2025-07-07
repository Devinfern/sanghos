
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import InteractiveCard from "./InteractiveCard";

interface PurposeItem {
  id: string;
  title: string;
  description: string;
  detailedContent: string;
  backgroundImage: string;
  emoji: string;
}

interface PurposeCarouselProps {
  items: PurposeItem[];
}

const PurposeCarousel: React.FC<PurposeCarouselProps> = ({ items }) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleExpand = (cardId: string) => {
    setExpandedCard(cardId);
  };

  const handleClose = () => {
    setExpandedCard(null);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="relative">
      {/* Desktop Grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <InteractiveCard
            key={item.id}
            title={item.title}
            description={item.description}
            detailedContent={item.detailedContent}
            backgroundImage={item.backgroundImage}
            emoji={item.emoji}
            isExpanded={expandedCard === item.id}
            onExpand={() => handleExpand(item.id)}
            onClose={handleClose}
          />
        ))}
      </div>

      {/* Mobile/Tablet Carousel */}
      <div className="lg:hidden relative">
        <div className="overflow-hidden rounded-3xl">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {items.map((item) => (
              <div key={item.id} className="w-full flex-shrink-0">
                <InteractiveCard
                  title={item.title}
                  description={item.description}
                  detailedContent={item.detailedContent}
                  backgroundImage={item.backgroundImage}
                  emoji={item.emoji}
                  isExpanded={expandedCard === item.id}
                  onExpand={() => handleExpand(item.id)}
                  onClose={handleClose}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-6">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-brand-primary w-8" : "bg-brand-primary/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurposeCarousel;
