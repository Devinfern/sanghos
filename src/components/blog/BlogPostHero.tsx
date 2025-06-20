
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';

interface BlogPostHeroProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category?: string;
}

const BlogPostHero = ({ title, excerpt, author, date, readTime, category }: BlogPostHeroProps) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-brand-subtle/10 to-white">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Link to="/blog" className="inline-flex items-center text-brand-primary hover:text-brand-primary/80 mb-8 group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>
          
          {category && (
            <div className="mb-6">
              <span className="bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium">
                {category}
              </span>
            </div>
          )}
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-brand-dark">
            {title}
          </h1>
          
          <p className="text-xl text-brand-slate mb-8 leading-relaxed">
            {excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-brand-slate">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{readTime}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPostHero;
