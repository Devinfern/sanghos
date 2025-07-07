
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Users, Sparkles, Plus, X } from "lucide-react";

interface CarouselItem {
  id: string;
  title: string;
  description: string;
  detailedContent: string;
  backgroundImage: string;
  icon: React.ReactNode;
  category: string;
}

interface HorizontalCarouselProps {
  items: CarouselItem[];
}

const HorizontalCarousel: React.FC<HorizontalCarouselProps> = ({ items }) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleExpand = (cardId: string) => {
    setExpandedCard(cardId);
  };

  const handleClose = () => {
    setExpandedCard(null);
  };

  return (
    <div className="relative">
      {/* Desktop Grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <CarouselCard
            key={item.id}
            item={item}
            isMobile={false}
            isExpanded={expandedCard === item.id}
            onExpand={() => handleExpand(item.id)}
            onClose={handleClose}
          />
        ))}
      </div>

      {/* Mobile/Tablet Horizontal Scroll */}
      <div className="lg:hidden">
        <div className="flex snap-x snap-mandatory overflow-x-auto gap-6 pb-8 no-scrollbar">
          {items.map((item) => (
            <div key={item.id} className="snap-start flex-shrink-0">
              <CarouselCard
                item={item}
                isMobile={true}
                isExpanded={expandedCard === item.id}
                onExpand={() => handleExpand(item.id)}
                onClose={handleClose}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface CarouselCardProps {
  item: CarouselItem;
  isMobile?: boolean;
  isExpanded: boolean;
  onExpand: () => void;
  onClose: () => void;
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  item,
  isMobile = false,
  isExpanded,
  onExpand,
  onClose
}) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl transition-all duration-500 ease-in-out cursor-pointer ${
        isMobile 
          ? 'w-[80vw] max-w-[1440px]' 
          : 'w-full'
      }`}
      style={{
        minHeight: isExpanded ? "auto" : isMobile ? "388px" : "388px",
        height: isExpanded ? "auto" : isMobile ? "388px" : "658px"
      }}
      whileHover={{ scale: isExpanded ? 1 : 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      layout
      onClick={!isExpanded ? onExpand : undefined}
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0">
        <img
          src={item.backgroundImage}
          alt={item.title}
          className="w-full h-full object-cover"
          style={{ height: '110%', transform: 'translateY(-5%)' }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6">
        {/* Top Section - Category Badge and Close Button */}
        <div className="flex items-start justify-between">
          <div className="inline-flex items-center gap-x-2.5 px-4 py-3 md:px-6 md:py-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20">
            <div className="text-white w-5 h-5 flex items-center justify-center">
              {item.icon}
            </div>
            <span className="text-xs text-white font-sans leading-normal font-normal">
              {item.category}
            </span>
          </div>
          
          {isExpanded && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>
          )}
        </div>

        {/* Bottom Section - Title and Content */}
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-sans leading-tight font-light max-w-[400px]">
            {item.title}
          </h3>
          
          {/* Description - always visible */}
          <p className="text-white/90 text-base md:text-lg leading-relaxed">
            {item.description}
          </p>
          
          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="text-white/85 text-sm md:text-base leading-relaxed space-y-3">
                  {item.detailedContent.split('\n\n').map((paragraph, index) => (
                    <motion.p 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + (index * 0.1), duration: 0.3 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Expand Button */}
          {!isExpanded && (
            <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
              <span className="text-sm font-medium mr-2">Learn More</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Plus className="w-4 h-4" />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HorizontalCarousel;
