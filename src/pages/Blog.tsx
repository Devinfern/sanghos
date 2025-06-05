import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, User, Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BeehiivNewsletterSignup from '@/components/BeehiivNewsletterSignup';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredArticle = {
    id: 'mindful-breathing-techniques',
    title: 'Mindful Breathing Techniques: Your Gateway to Inner Peace',
    excerpt: 'Transform your daily stress into moments of calm and clarity with these powerful, evidence-based breathing practices.',
    author: 'Devin Fernandez',
    date: 'December 15, 2024',
    readTime: '8 min read',
    image: '/lovable-uploads/cf8fc774-aba1-4ccc-a684-8a94a89150ce.jpg',
    category: 'Breathwork',
    featured: true
  };

  const articles = [
    {
      id: 'forest-bathing-guide',
      title: 'The Science Behind Forest Bathing: Why Nature Heals',
      excerpt: 'Explore the Japanese practice of Shinrin-yoku and how immersing yourself in nature can boost immunity and reduce stress.',
      author: 'Devin Fernandez',
      date: 'December 12, 2024',
      readTime: '6 min read',
      image: '/lovable-uploads/eb5e3a10-e1d3-49a7-9bd6-f9cfd8a697fc.jpg',
      category: 'Nature Therapy'
    },
    {
      id: 'meditation-retreat-preparation',
      title: 'Preparing for Your First Meditation Retreat: A Complete Guide',
      excerpt: 'Everything you need to know before embarking on your meditation journey, from packing essentials to mental preparation.',
      author: 'Devin Fernandez',
      date: 'December 10, 2024',
      readTime: '10 min read',
      image: '/lovable-uploads/1bb523ae-38ed-4377-8a20-53ad930f2cba.png',
      category: 'Meditation'
    },
    {
      id: 'morning-wellness-rituals',
      title: '7 Morning Rituals That Will Transform Your Day',
      excerpt: 'Simple yet powerful practices to start your morning with intention and create lasting positive change.',
      author: 'Devin Fernandez',
      date: 'December 8, 2024',
      readTime: '5 min read',
      image: '/lovable-uploads/374c6d8d-b72d-4385-b859-d37c9b4869ed.png',
      category: 'Wellness'
    },
    {
      id: 'yoga-for-beginners',
      title: 'Yoga for Absolute Beginners: Finding Your Practice',
      excerpt: 'A gentle introduction to yoga that will help you build confidence and discover the style that resonates with you.',
      author: 'Devin Fernandez',
      date: 'December 5, 2024',
      readTime: '7 min read',
      image: '/lovable-uploads/82cdec7c-edd5-46fb-be36-0bacda6e756d.png',
      category: 'Yoga'
    },
    {
      id: 'digital-detox-retreat',
      title: 'The Art of Digital Detox: Reclaiming Your Mental Space',
      excerpt: 'Learn how to disconnect from technology and reconnect with yourself through mindful digital boundaries.',
      author: 'Devin Fernandez',
      date: 'December 3, 2024',
      readTime: '6 min read',
      image: '/lovable-uploads/fb2aad72-57e6-4306-9ada-dd61eb448e1b.png',
      category: 'Mindfulness'
    },
    {
      id: 'sound-healing-benefits',
      title: 'Sound Healing: Ancient Practice for Modern Stress',
      excerpt: 'Discover how sound frequencies can promote healing, reduce anxiety, and enhance your meditation practice.',
      author: 'Devin Fernandez',
      date: 'November 30, 2024',
      readTime: '8 min read',
      image: '/lovable-uploads/440cf0e4-ee06-4235-9ec4-b3ecdefd7ee9.jpg',
      category: 'Sound Therapy'
    }
  ];

  const categories = ['All', 'Meditation', 'Breathwork', 'Yoga', 'Nature Therapy', 'Wellness', 'Mindfulness', 'Sound Therapy'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = articles.filter(article => 
    (selectedCategory === 'All' || article.category === selectedCategory) &&
    (article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Wellness Insights | Sanghos</title>
        <meta name="description" content="Explore our collection of wellness articles, meditation guides, and retreat insights to enhance your journey toward mindful living." />
      </Helmet>

      <Header />

      <main className="bg-white">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-brand-subtle/10 to-white my-[64px]">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-brand-dark">
                Wellness Insights
              </h1>
              <p className="text-xl text-brand-slate mb-8">
                Discover expert guidance on meditation, breathwork, and wellness practices 
                delivered every week to inspire your journey toward mindful living.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-primary/60" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-12 py-6 bg-white border-sand-200 rounded-full shadow-sm focus:ring-brand-primary/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-16">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-gradient-to-r from-brand-primary/5 to-brand-subtle/10 rounded-3xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-sm font-medium text-brand-primary uppercase tracking-wider mb-3">
                    Featured Article
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-lg text-brand-slate mb-6">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mb-6 text-sm text-brand-slate">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{featuredArticle.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredArticle.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{featuredArticle.readTime}</span>
                    </div>
                  </div>
                  <Button size="lg" className="bg-brand-primary hover:bg-brand-primary/90 rounded-full group w-fit" asChild>
                    <Link to={`/blog/${featuredArticle.id}`}>
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
                <div className="relative h-80 lg:h-full">
                  <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 text-brand-primary px-3 py-1 rounded-full text-sm font-medium">
                      {featuredArticle.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-brand-primary text-white'
                      : 'bg-sand-100 text-brand-slate hover:bg-sand-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
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
                    <h3 className="text-xl font-bold mb-3 text-brand-dark line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-brand-slate mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mb-4 text-sm text-brand-slate">
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

            {filteredArticles.length === 0 && (
              <div className="text-center py-16">
                <p className="text-brand-slate text-lg">No articles found matching your search criteria.</p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <BeehiivNewsletterSignup />
      </main>

      <Footer />
    </>
  );
};

export default Blog;
