
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BeehiivNewsletterSignup from '@/components/BeehiivNewsletterSignup';
import BlogPostHero from '@/components/blog/BlogPostHero';
import BlogPostCTA from '@/components/blog/BlogPostCTA';
import RelatedReading from '@/components/blog/RelatedReading';
import ContentGate from '@/components/blog/ContentGate';
import { useScrollGate } from '@/hooks/useScrollGate';

interface BlogPostLayoutProps {
  title: string;
  description: string;
  heroProps: {
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    category?: string;
  };
  relatedLinks: {
    internalLinks: Array<{ title: string; href: string }>;
    exploreLinks: Array<{ title: string; href: string }>;
  };
  ctaProps: {
    title: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
  };
  children: React.ReactNode;
}

const BlogPostLayout = ({ 
  title, 
  description, 
  heroProps, 
  relatedLinks, 
  ctaProps, 
  children 
}: BlogPostLayoutProps) => {
  const { shouldShowGate, dismissGate } = useScrollGate({ threshold: 0.4 });

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <Header />

      <main className="bg-white pt-20">
        <BlogPostHero {...heroProps} />

        <section className="py-16">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="prose prose-lg max-w-none">
              {children}

              <RelatedReading 
                internalLinks={relatedLinks.internalLinks}
                exploreLinks={relatedLinks.exploreLinks}
              />

              <BlogPostCTA {...ctaProps} />
            </motion.div>
          </div>
        </section>

        <BeehiivNewsletterSignup />
      </main>

      <ContentGate 
        isVisible={shouldShowGate}
        onDismiss={dismissGate}
        articleTitle={heroProps.title}
      />

      <Footer />
    </>
  );
};

export default BlogPostLayout;
