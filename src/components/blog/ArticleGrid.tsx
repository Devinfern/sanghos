
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, User, Clock } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

interface ArticleGridProps {
  articles: Article[];
}

const ArticleGrid = ({ articles }: ArticleGridProps) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-16 pb-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 text-brand-primary px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg md:text-xl font-bold mb-3 text-brand-dark line-clamp-2 leading-tight">
                  {article.title}
                </h3>
                <p className="text-brand-slate mb-4 line-clamp-3 text-sm md:text-base leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-4 mb-6 text-xs md:text-sm text-brand-slate">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <Link 
                  to={`/blog/${article.id}`} 
                  className="text-brand-primary font-medium hover:text-brand-primary/80 transition-colors flex items-center gap-2 group/link"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-brand-slate text-lg">No articles found matching your search criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleGrid;
