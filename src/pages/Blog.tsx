
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BeehiivNewsletterSignup from '@/components/BeehiivNewsletterSignup';
import BlogHero from '@/components/blog/BlogHero';
import FeaturedArticle from '@/components/blog/FeaturedArticle';
import CategoryFilter from '@/components/blog/CategoryFilter';
import ArticleGrid from '@/components/blog/ArticleGrid';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const featuredArticle = {
    id: 'spirituality-wellness-science',
    title: 'The Science of Spiritual Wellness: Why Connection Matters More Than Ever',
    excerpt: 'Emerging research reveals how spiritual health—from finding purpose to fostering connection—directly impacts our physical and mental well-being, especially for younger generations seeking meaning.',
    author: 'Devin Fernandez',
    date: 'June 26, 2025',
    readTime: '8 min read',
    image: '/lovable-uploads/cf8fc774-aba1-4ccc-a684-8a94a89150ce.jpg',
    category: 'Wellness Research',
    featured: true
  };

  const articles = [{
    id: 'vendor-ecosystem-trust-first',
    title: 'Behind the Scenes: Building a Trust-First Vendor Ecosystem for Wellness Retreats',
    excerpt: 'An inside look at how Sanghos is revolutionizing retreat planning through community-driven vendor vetting, rigorous quality standards, and authentic relationships that put trust first.',
    author: 'Devin Fernandez',
    date: 'January 9, 2025',
    readTime: '9 min read',
    image: '/lovable-uploads/1bb523ae-38ed-4377-8a20-53ad930f2cba.png',
    category: 'Behind the Scenes'
  }, {
    id: 'mindfulness-news-june-2025',
    title: 'Mindfulness in the News: June 2025',
    excerpt: 'A comprehensive roundup of the most significant mindfulness and meditation developments from around the world this month, from breakthrough apps to educational initiatives.',
    author: 'Devin Fernandez',
    date: 'June 17, 2025',
    readTime: '12 min read',
    image: '/lovable-uploads/cf8fc774-aba1-4ccc-a684-8a94a89150ce.jpg',
    category: 'News & Trends'
  }, {
    id: 'wellness-retreats-modern-burnout-solution',
    title: 'Why Wellness Retreats Are the Modern Solution to Burnout',
    excerpt: 'As burnout reaches epidemic levels and Gen Z reshapes wellness culture, discover how luxury wellness retreats are evolving to meet the needs of a stressed-out generation.',
    author: 'Devin Fernandez',
    date: 'June 20, 2025',
    readTime: '9 min read',
    image: '/lovable-uploads/1bb523ae-38ed-4377-8a20-53ad930f2cba.png',
    category: 'Wellness'
  }, {
    id: 'mindful-breathing-techniques',
    title: 'Mindful Breathing Techniques: Your Gateway to Inner Peace',
    excerpt: 'Transform your daily stress into moments of calm and clarity with these powerful, evidence-based breathing practices.',
    author: 'Devin Fernandez',
    date: 'December 15, 2024',
    readTime: '8 min read',
    image: '/lovable-uploads/cf8fc774-aba1-4ccc-a684-8a94a89150ce.jpg',
    category: 'Breathwork'
  }, {
    id: 'forest-bathing-guide',
    title: 'The Science Behind Forest Bathing: Why Nature Heals',
    excerpt: 'Explore the Japanese practice of Shinrin-yoku and how immersing yourself in nature can boost immunity and reduce stress.',
    author: 'Devin Fernandez',
    date: 'December 12, 2024',
    readTime: '6 min read',
    image: '/lovable-uploads/eb5e3a10-e1d3-49a7-9bd6-f9cfd8a697fc.jpg',
    category: 'Nature Therapy'
  }, {
    id: 'meditation-retreat-preparation',
    title: 'Preparing for Your First Meditation Retreat: A Complete Guide',
    excerpt: 'Everything you need to know before embarking on your meditation journey, from packing essentials to mental preparation.',
    author: 'Devin Fernandez',
    date: 'December 10, 2024',
    readTime: '10 min read',
    image: '/lovable-uploads/1bb523ae-38ed-4377-8a20-53ad930f2cba.png',
    category: 'Meditation'
  }, {
    id: 'morning-wellness-rituals',
    title: '7 Morning Rituals That Will Transform Your Day',
    excerpt: 'Simple yet powerful practices to start your morning with intention and create lasting positive change.',
    author: 'Devin Fernandez',
    date: 'December 8, 2024',
    readTime: '5 min read',
    image: '/lovable-uploads/374c6d8d-b72d-4385-b859-d37c9b4869ed.png',
    category: 'Wellness'
  }, {
    id: 'yoga-for-beginners',
    title: 'Yoga for Absolute Beginners: Finding Your Practice',
    excerpt: 'A gentle introduction to yoga that will help you build confidence and discover the style that resonates with you.',
    author: 'Devin Fernandez',
    date: 'December 5, 2024',
    readTime: '7 min read',
    image: '/lovable-uploads/82cdec7c-edd5-46fb-be36-0bacda6e756d.png',
    category: 'Yoga'
  }, {
    id: 'digital-detox-retreat',
    title: 'The Art of Digital Detox: Reclaiming Your Mental Space',
    excerpt: 'Learn how to disconnect from technology and reconnect with yourself through mindful digital boundaries.',
    author: 'Devin Fernandez',
    date: 'December 3, 2024',
    readTime: '6 min read',
    image: '/lovable-uploads/fb2aad72-57e6-4306-9ada-dd61eb448e1b.png',
    category: 'Mindfulness'
  }, {
    id: 'sound-healing-benefits',
    title: 'Sound Healing: Ancient Practice for Modern Stress',
    excerpt: 'Discover how sound frequencies can promote healing, reduce anxiety, and enhance your meditation practice.',
    author: 'Devin Fernandez',
    date: 'November 30, 2024',
    readTime: '8 min read',
    image: '/lovable-uploads/440cf0e4-ee06-4235-9ec4-b3ecdefd7ee9.jpg',
    category: 'Sound Therapy'
  }];

  const categories = ['All', 'Wellness Research', 'Behind the Scenes', 'News & Trends', 'Meditation', 'Breathwork', 'Yoga', 'Nature Therapy', 'Wellness', 'Mindfulness', 'Sound Therapy'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = articles.filter(article => 
    (selectedCategory === 'All' || article.category === selectedCategory) && 
    (article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <Helmet>
        <title>Wellness Insights | Sanghos</title>
        <meta name="description" content="Explore our collection of wellness articles, meditation guides, and retreat insights to enhance your journey toward mindful living." />
      </Helmet>

      <Header />

      <main className="bg-white">
        <BlogHero 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <FeaturedArticle article={featuredArticle} />

        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <ArticleGrid articles={filteredArticles} />

        <BeehiivNewsletterSignup />
      </main>

      <Footer />
    </>
  );
};

export default Blog;
