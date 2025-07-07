
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Users, Sparkles } from "lucide-react";
import { CardExpand } from "@/components/ui/card-expand";

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
          <CardExpand
            key={item.id}
            image={item.backgroundImage}
            title={item.title}
            description={item.description}
            category={item.category}
            categoryIcon={item.icon}
            isExpanded={expandedCard === item.id}
            onExpand={() => handleExpand(item.id)}
            onClose={handleClose}
            initialWidth={400}
            initialHeight={388}
            expandedWidth={500}
            expandedHeight={600}
            expandedContent={
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
            }
          />
        ))}
      </div>

      {/* Mobile/Tablet Horizontal Scroll */}
      <div className="lg:hidden">
        <div className="flex snap-x snap-mandatory overflow-x-auto gap-6 pb-8 no-scrollbar">
          {items.map((item) => (
            <div key={item.id} className="snap-start flex-shrink-0">
              <CardExpand
                image={item.backgroundImage}
                title={item.title}
                description={item.description}
                category={item.category}
                categoryIcon={item.icon}
                isExpanded={expandedCard === item.id}
                onExpand={() => handleExpand(item.id)}
                onClose={handleClose}
                initialWidth={320}
                initialHeight={388}
                expandedWidth={380}
                expandedHeight={500}
                className="w-[80vw] max-w-[380px]"
                expandedContent={
                  <div className="text-white/85 text-sm leading-relaxed space-y-3">
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
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCarousel;
