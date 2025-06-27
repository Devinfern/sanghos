
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Star, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ContentGateProps {
  isVisible: boolean;
  onDismiss: () => void;
  articleTitle?: string;
}

const ContentGate = ({ isVisible, onDismiss, articleTitle }: ContentGateProps) => {
  console.log('ContentGate render - isVisible:', isVisible);

  const benefits = [
    "Access to premium wellness insights and guides",
    "Personalized retreat recommendations", 
    "Exclusive community discussions",
    "Early access to new content and features"
  ];

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
            onClick={onDismiss}
          >
            {/* Modal - positioned within the backdrop flexbox */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onDismiss}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Header with Icon */}
                <div className="text-center mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                    <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-3 sm:mb-4">
                    Continue Reading
                  </h2>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed px-2">
                    Join thousands discovering wellness insights and personalized retreat recommendations
                  </p>
                </div>

                {/* Social Proof */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-brand-primary flex-shrink-0" />
                  <span className="font-semibold text-brand-dark text-sm sm:text-base">10,000+ wellness enthusiasts</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-6 sm:mb-8">
                  <ul className="space-y-3 sm:space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 font-medium text-sm sm:text-base">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 sm:space-y-4">
                  <Link to="/signup" className="block w-full">
                    <Button className="w-full bg-gradient-to-r from-brand-primary to-purple-600 hover:from-brand-primary/90 hover:to-purple-600/90 text-white font-bold py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
                      Join Sanghos Free
                    </Button>
                  </Link>
                  
                  <div className="text-center">
                    <Link to="/login" className="text-brand-primary hover:underline font-semibold text-sm sm:text-base">
                      Already have an account? Sign in
                    </Link>
                  </div>
                </div>

                {/* Fine Print */}
                <p className="text-xs sm:text-sm text-gray-500 text-center mt-4 sm:mt-6">
                  Free to join • No credit card required • Unsubscribe anytime
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContentGate;
