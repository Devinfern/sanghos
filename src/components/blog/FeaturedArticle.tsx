
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeaturedArticleData {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  featured: boolean;
}

interface FeaturedArticleProps {
  article: FeaturedArticleData;
}

const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeUp} 
          className="bg-gradient-to-r from-brand-primary/5 to-brand-subtle/10 rounded-3xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="text-sm font-medium text-brand-primary uppercase tracking-wider mb-4">
                Featured Article
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-brand-dark leading-tight">
                {article.title}
              </h2>
              <p className="text-base md:text-lg text-brand-slate mb-6 leading-relaxed">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-4 mb-8 text-sm text-brand-slate">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
              <Button 
                size="lg" 
                className="bg-brand-primary hover:bg-brand-primary/90 rounded-full group w-fit" 
                asChild
              >
                <Link to={`/blog/${article.id}`}>
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <div className="relative h-80 lg:h-full">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-4 right-4">
                <span className="bg-white/90 text-brand-primary px-3 py-1 rounded-full text-sm font-medium">
                  {article.category}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedArticle;
