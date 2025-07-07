
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, Users, ArrowUpRight } from "lucide-react";

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
        <ul className="flex snap-x snap-mandatory overflow-x-auto gap-6 pb-8 no-scrollbar">
          {items.map((item) => (
            <li key={item.id} className="snap-start flex-shrink-0">
              <CarouselCard
                item={item}
                isExpanded={expandedCard === item.id}
                onToggleExpand={() => toggleExpand(item.id)}
                isMobile={true}
              />
            </li>
          ))}
        </ul>
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
          <div className="col-start-1 col-end-5 row-start-1 row-end-5 relative">
            <motion.div
              className="relative"
              style={{ height: "110%" }}
              animate={{ transform: "translateY(-11.006%)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img
                alt={item.title}
                draggable="false"
                loading="lazy"
                decoding="async"
                className="object-cover absolute inset-0 w-full h-full"
                src={item.backgroundImage}
              />
            </motion.div>
          </div>

          {/* Category Badge */}
          <div className="col-start-1 col-end-4 row-start-1 row-end-2 pt-6 pl-6 z-10">
            <div className="relative inline-flex items-center gap-x-2.5 overflow-hidden px-4 py-3 md:px-6 md:py-4">
              <div 
                className="absolute inset-0 rounded-3xl bg-white/10 backdrop-blur-xl"
                aria-hidden="true"
              />
              <div className="relative text-white w-6 h-6 flex items-center justify-center">
                {item.icon}
              </div>
              <span className="text-[0.75rem] text-white font-sans leading-normal font-normal relative">
                {item.category}
              </span>
            </div>
          </div>

          {/* Expand Button */}
          <div className="col-start-4 col-end-5 row-start-1 row-end-2 relative flex flex-col items-end pt-6 pr-6 z-10">
            <motion.button
              onClick={onToggleExpand}
              className="rounded-full text-center inline-block transition bg-white/20 backdrop-blur-sm text-white p-4 md:p-5 hover:bg-white/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.title} card`}
              aria-expanded={isExpanded}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="13"
                  viewBox="0 0 13 13"
                  width="13"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect fill="currentColor" height="13" width="2" x="5.5" y="0" />
                  <rect fill="currentColor" height="13" transform="rotate(90 13 5)" width="2" x="13" y="5" />
                </svg>
              </motion.div>
            </motion.button>
          </div>

          {/* Title */}
          <div className="col-start-1 col-end-4 row-start-4 row-end-5 relative max-w-[400px] self-end px-6 pb-6 z-10">
            <h3 className="text-[1.75rem] tracking-normal md:text-[2rem] lg:text-[2.5rem] text-white font-sans leading-none font-light">
              {item.title}
            </h3>
          </div>

          {/* Expanded Content */}
          <motion.div
            className="col-start-1 col-end-5 row-start-5 row-end-6 relative z-10"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            {isExpanded && (
              <div className="p-6 bg-white/95 backdrop-blur-sm rounded-t-xl">
                <p className="text-brand-slate text-lg leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="text-brand-slate leading-relaxed">
                  {item.detailedContent.split('\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    )
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-brand-subtle/20">
                  <motion.button
                    onClick={onToggleExpand}
                    className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary/80 font-medium transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span>Continue Exploring</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HorizontalCarousel;
