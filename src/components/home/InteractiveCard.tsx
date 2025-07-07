
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InteractiveCardProps {
  title: string;
  description: string;
  detailedContent: string;
  backgroundImage: string;
  emoji: string;
  isExpanded: boolean;
  onExpand: () => void;
  onClose: () => void;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  description,
  detailedContent,
  backgroundImage,
  emoji,
  isExpanded,
  onExpand,
  onClose,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      {/* Card */}
      <motion.div
        className={`relative overflow-hidden rounded-3xl cursor-pointer group ${
          isExpanded ? "col-span-full" : ""
        }`}
        style={{ 
          minHeight: isExpanded ? "500px" : "400px",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
        onClick={!isExpanded ? onExpand : undefined}
        initial={false}
        animate={{
          scale: isExpanded ? 1.02 : 1,
          zIndex: isExpanded ? 10 : 1
        }}
        whileHover={!isExpanded ? { 
          scale: 1.05,
          transition: { duration: 0.3, ease: "easeOut" }
        } : {}}
        transition={{ 
          duration: 0.5, 
          ease: [0.23, 1, 0.32, 1] // Custom easing for smoother animation
        }}
      >
        {/* Image Preloader */}
        <img 
          src={backgroundImage} 
          alt=""
          style={{ display: 'none' }}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Enhanced Gradient Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"
          animate={{
            opacity: isExpanded ? 0.95 : 0.8
          }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Card Content */}
        <motion.div 
          className="relative h-full flex flex-col justify-end p-8"
          animate={{
            y: isExpanded ? -20 : 0
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Emoji */}
          <motion.div 
            className="mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <span className="text-3xl">{emoji}</span>
            </div>
          </motion.div>
          
          {/* Title */}
          <motion.h3 
            className="text-2xl lg:text-3xl font-bold text-white mb-3"
            animate={{
              scale: isExpanded ? 1.05 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          
          {/* Description */}
          <motion.p 
            className="text-white/90 text-lg leading-relaxed mb-4"
            animate={{
              opacity: isExpanded ? 0.95 : 0.85
            }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
          
          {/* Expand Indicator */}
          {!isExpanded && (
            <motion.div 
              className="flex items-center text-white/80 group-hover:text-white transition-colors"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-sm font-medium mr-2">Learn More</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Expanded Modal Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.23, 1, 0.32, 1],
                staggerChildren: 0.1
              }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors z-10 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <X className="w-5 h-5 text-gray-700" />
              </motion.button>
              
              {/* Expanded Background Header */}
              <motion.div
                className="h-64 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${backgroundImage})` }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <motion.div 
                  className="absolute bottom-8 left-8"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <motion.div 
                    className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-4xl">{emoji}</span>
                  </motion.div>
                  <h2 className="text-4xl font-bold text-white">{title}</h2>
                </motion.div>
              </motion.div>
              
              {/* Expanded Content */}
              <motion.div 
                className="p-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-brand-slate leading-relaxed mb-6">
                    {description}
                  </p>
                  <div className="text-brand-slate leading-relaxed">
                    {detailedContent.split('\n').map((paragraph, index) => (
                      <motion.p 
                        key={index} 
                        className="mb-4"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + (index * 0.1), duration: 0.4 }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                </div>
                
                <motion.div 
                  className="mt-8 pt-6 border-t border-brand-subtle/20"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  <Button 
                    className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
                    onClick={onClose}
                  >
                    Continue Exploring
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InteractiveCard;
