
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Users, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ContentGateProps {
  isVisible: boolean;
  onDismiss: () => void;
  articleTitle?: string;
}

const ContentGate = ({ isVisible, onDismiss, articleTitle }: ContentGateProps) => {
  const benefits = [
    "Access to premium wellness insights and guides",
    "Personalized retreat recommendations",
    "Exclusive community discussions",
    "Early access to new content and features"
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onDismiss}
          />
          
          {/* Gate Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onDismiss}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Content */}
            <div className="p-8 pt-6">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-primary/80 rounded-full flex items-center justify-center shadow-lg">
                  <Lock className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Headline */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-brand-dark mb-3 leading-tight">
                  Continue Reading Premium Content
                </h2>
                <p className="text-brand-slate text-base leading-relaxed">
                  {articleTitle ? (
                    <>Unlock the full article "<span className="font-medium">{articleTitle}</span>" and discover more wellness insights.</>
                  ) : (
                    "Join thousands of wellness seekers accessing premium content and personalized recommendations."
                  )}
                </p>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center gap-2 mb-6 text-brand-slate">
                <Users className="h-5 w-5 text-brand-primary" />
                <span className="text-sm font-medium">Join 10,000+ wellness enthusiasts</span>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-brand-slate leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-r from-sage-50 to-brand-subtle/10 rounded-xl p-4 mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-brand-dark">4.9/5</span>
                </div>
                <p className="text-sm text-brand-slate italic leading-relaxed">
                  "Sanghos has transformed my approach to wellness. The content is incredibly valuable and the community is supportive."
                </p>
                <p className="text-xs text-brand-slate/70 mt-2">- Sarah M., Community Member</p>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4">
                <Link to="/signup" className="block w-full">
                  <Button className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-3 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                    Create Free Account
                  </Button>
                </Link>
                
                <div className="text-center">
                  <Link to="/login" className="text-sm text-brand-primary hover:underline font-medium">
                    Already have an account? Sign in
                  </Link>
                </div>
              </div>

              {/* Fine Print */}
              <p className="text-xs text-brand-slate/60 text-center mt-6">
                Free to join. No credit card required. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContentGate;
