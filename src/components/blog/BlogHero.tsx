
import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface BlogHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const BlogHero = ({ searchQuery, onSearchChange }: BlogHeroProps) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="bg-gradient-to-b from-brand-subtle/10 to-white pt-32 pb-16">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeUp} 
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-brand-dark">
            Wellness Insights
          </h1>
          <p className="text-lg md:text-xl text-brand-slate mb-8 leading-relaxed">
            Discover expert guidance on meditation, breathwork, and wellness practices 
            delivered every week to inspire your journey toward mindful living.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-primary/60" />
            <Input 
              type="text" 
              placeholder="Search articles..." 
              className="pl-12 py-3 bg-white border-sand-200 rounded-full shadow-sm focus:ring-brand-primary/20" 
              value={searchQuery} 
              onChange={(e) => onSearchChange(e.target.value)} 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogHero;
