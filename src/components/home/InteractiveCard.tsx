
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
  return (
    <>
      {/* Card */}
      <motion.div
        layout
        className={`relative overflow-hidden rounded-3xl cursor-pointer group ${
          isExpanded ? "col-span-full" : ""
        }`}
        style={{ minHeight: isExpanded ? "500px" : "400px" }}
        onClick={!isExpanded ? onExpand : undefined}
        whileHover={!isExpanded ? { scale: 1.02 } : {}}
        transition={{ duration: 0.3 }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        {/* Card Content */}
        <div className="relative h-full flex flex-col justify-end p-8">
          {/* Emoji */}
          <div className="mb-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-3xl">{emoji}</span>
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-white/90 text-lg leading-relaxed mb-4">
            {description}
          </p>
          
          {/* Expand Indicator */}
          {!isExpanded && (
            <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
              <span className="text-sm font-medium mr-2">Learn More</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          )}
        </div>
      </motion.div>

      {/* Expanded Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              
              {/* Expanded Background */}
              <div
                className="h-64 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                    <span className="text-4xl">{emoji}</span>
                  </div>
                  <h2 className="text-4xl font-bold text-white">{title}</h2>
                </div>
              </div>
              
              {/* Expanded Content */}
              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-brand-slate leading-relaxed mb-6">
                    {description}
                  </p>
                  <div className="text-brand-slate leading-relaxed">
                    {detailedContent.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-brand-subtle/20">
                  <Button 
                    className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-3 rounded-full"
                    onClick={onClose}
                  >
                    Continue Exploring
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InteractiveCard;
