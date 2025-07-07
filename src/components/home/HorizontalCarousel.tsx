
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

  const toggleExpand = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="relative">
      {/* Desktop Grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <CarouselCard
            key={item.id}
            item={item}
            isExpanded={expandedCard === item.id}
            onToggleExpand={() => toggleExpand(item.id)}
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
                isExpanded={expandedCard === item.id}
                onToggleExpand={() => toggleExpand(item.id)}
                isMobile={true}
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
  isExpanded: boolean;
  onToggleExpand: () => void;
  isMobile?: boolean;
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  item,
  isExpanded,
  onToggleExpand,
  isMobile = false
}) => {
  return (
    <motion.div
      className={`
        motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-in-out
        ${isMobile 
          ? 'h-[388px] w-[80vw] max-w-[1440px]' 
          : 'h-[388px] md:h-[658px] w-full'
        }
      `}
      initial={false}
      animate={{
        height: isExpanded ? (isMobile ? "500px" : "auto") : undefined
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="h-full w-full overflow-hidden rounded-xl">
        <div className="grid h-full grid-cols-4 grid-rows-4 gap-4 relative">
          {/* Background Image Layer */}
          <div className="col-start-1 col-end-5 row-start-1 row-end-5 absolute inset-0">
            <motion.div
              className="relative w-full h-full"
              style={{ height: "110%" }}
              animate={{ transform: "translateY(-5%)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img
                alt={item.title}
                draggable="false"
                loading="lazy"
                decoding="async"
                className="object-cover w-full h-full"
                src={item.backgroundImage}
              />
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
            </motion.div>
          </div>

          {/* Category Badge */}
          <div className="col-start-1 col-end-4 row-start-1 row-end-2 pt-6 pl-6 z-10 relative">
            <div className="relative inline-flex items-center gap-x-2.5 overflow-hidden px-4 py-3 md:px-6 md:py-4">
              <div 
                className="absolute inset-0 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20"
                aria-hidden="true"
              />
              <div className="relative text-white w-5 h-5 flex items-center justify-center">
                {item.icon}
              </div>
              <span className="text-xs text-white font-sans leading-normal font-normal relative">
                {item.category}
              </span>
            </div>
          </div>

          {/* Expand Button */}
          <div className="col-start-4 col-end-5 row-start-1 row-end-2 relative flex flex-col items-end pt-6 pr-6 z-10">
            <motion.button
              onClick={onToggleExpand}
              className="rounded-full text-center inline-block transition bg-white/20 backdrop-blur-sm text-white p-4 md:p-5 hover:bg-white/30 border border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.title} card`}
              aria-expanded={isExpanded}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Plus className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>

          {/* Title */}
          <div className="col-start-1 col-end-4 row-start-4 row-end-5 relative max-w-[400px] self-end px-6 pb-6 z-10">
            <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-sans leading-tight font-light">
              {item.title}
            </h3>
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="col-start-1 col-end-5 row-start-5 row-end-6 relative z-10"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div className="p-6 bg-white/95 backdrop-blur-sm rounded-t-xl">
                  <p className="text-gray-800 text-lg leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="text-gray-700 leading-relaxed">
                    {item.detailedContent.split('\n').map((paragraph, index) => (
                      paragraph.trim() && (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      )
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <motion.button
                      onClick={onToggleExpand}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <span>Continue Exploring</span>
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default HorizontalCarousel;
