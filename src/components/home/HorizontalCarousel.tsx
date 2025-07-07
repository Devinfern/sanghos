
import React from "react";
import { motion } from "framer-motion";

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
  return (
    <div className="relative">
      {/* Desktop Grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <CarouselCard
            key={item.id}
            item={item}
            isMobile={false}
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
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  item,
  isMobile = false
}) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl transition-all duration-500 ease-in-out ${
        isMobile 
          ? 'h-[388px] w-[80vw] max-w-[1440px]' 
          : 'h-[388px] md:h-[658px] w-full'
      }`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
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

      {/* Content Grid */}
      <div className="relative h-full grid grid-cols-4 grid-rows-4 gap-4 p-6">
        {/* Category Badge */}
        <div className="col-span-4 row-span-1 flex items-start justify-start">
          <div className="inline-flex items-center gap-x-2.5 px-4 py-3 md:px-6 md:py-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20">
            <div className="text-white w-5 h-5 flex items-center justify-center">
              {item.icon}
            </div>
            <span className="text-xs text-white font-sans leading-normal font-normal">
              {item.category}
            </span>
          </div>
        </div>

        {/* Empty Middle Space */}
        <div className="col-span-4 row-span-2"></div>

        {/* Title */}
        <div className="col-span-4 row-span-1 flex items-end">
          <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-sans leading-tight font-light max-w-[400px]">
            {item.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default HorizontalCarousel;
