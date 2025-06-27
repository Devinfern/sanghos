
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

interface GatedContentProps {
  children: React.ReactNode;
  isGated?: boolean;
  className?: string;
}

const GatedContent = ({ children, isGated = false, className = '' }: GatedContentProps) => {
  const { user } = useAuth();

  // Show full content for authenticated users
  if (user || !isGated) {
    return <div className={className}>{children}</div>;
  }

  // Apply blur effect for gated content
  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 0.5 }}
    >
      {/* Blurred Content */}
      <div className="filter blur-sm pointer-events-none select-none">
        {children}
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none" />
    </motion.div>
  );
};

export default GatedContent;
