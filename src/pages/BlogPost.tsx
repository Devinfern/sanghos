
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BeehiivNewsletterSignup from '@/components/BeehiivNewsletterSignup';

const BlogPost = () => {
  const { id } = useParams();

  // Sample blog post data - in a real app, this would come from an API
  const blogPosts = {
    'mindful-breathing-techniques': {
      title: 'Mindful Breathing Techniques: Your Gateway to Inner Peace',
      author: 'Dr. Sarah Chen',
      date: 'December 15, 2024',
      readTime: '8 min read',
      image: '/lovable-uploads/cf8fc774-aba1-4ccc-a684-8a94a89150ce.jpg',
      category: 'Breathwork',
      content: `
        <p>In our fast-paced world, the simple act of breathing mindfully can be a powerful tool for finding peace and clarity. Today, we'll explore proven breathing techniques that can transform your daily experience and help you navigate stress with greater ease.</p>

        <h2>The Science Behind Mindful Breathing</h2>
        <p>Mindful breathing activates the parasympathetic nervous system, which is responsible for the body's "rest and digest" response. When we breathe consciously and slowly, we signal to our brain that we're safe, which helps reduce cortisol levels and promote a sense of calm.</p>

        <h2>4-7-8 Breathing Technique</h2>
        <p>This technique, popularized by Dr. Andrew Weil, is excellent for reducing anxiety and promoting sleep:</p>
        <ol>
          <li>Exhale completely through your mouth</li>
          <li>Close your mouth and inhale through your nose for 4 counts</li>
          <li>Hold your breath for 7 counts</li>
          <li>Exhale through your mouth for 8 counts</li>
          <li>Repeat the cycle 3-4 times</li>
        </ol>

        <h2>Box Breathing (Square Breathing)</h2>
        <p>Used by Navy SEALs and meditation practitioners alike, box breathing helps improve focus and emotional regulation:</p>
        <ol>
          <li>Inhale for 4 counts</li>
          <li>Hold for 4 counts</li>
          <li>Exhale for 4 counts</li>
          <li>Hold empty for 4 counts</li>
          <li>Repeat for 5-10 cycles</li>
        </ol>

        <h2>Coherent Breathing</h2>
        <p>This technique involves breathing at a rate of 5 breaths per minute, which has been shown to optimize heart rate variability and promote emotional balance. Simply inhale for 6 seconds and exhale for 6 seconds, maintaining this rhythm for 5-20 minutes.</p>

        <h2>Creating Your Daily Practice</h2>
        <p>The key to benefiting from breathwork is consistency. Start with just 5 minutes a day, choosing one technique that resonates with you. You can practice:</p>
        <ul>
          <li>First thing in the morning to set a calm tone for your day</li>
          <li>During work breaks to reset your energy</li>
          <li>Before meals to improve digestion</li>
          <li>Before bed to promote restful sleep</li>
        </ul>

        <p>Remember, like any skill, mindful breathing improves with practice. Be patient with yourself as you develop this powerful tool for well-being.</p>
      `
    },
    'forest-bathing-guide': {
      title: 'The Science Behind Forest Bathing: Why Nature Heals',
      author: 'Michael Torres',
      date: 'December 12, 2024',
      readTime: '6 min read',
      image: '/lovable-uploads/eb5e3a10-e1d3-49a7-9bd6-f9cfd8a697fc.jpg',
      category: 'Nature Therapy',
      content: `
        <p>Forest bathing, or "Shinrin-yoku" as it's known in Japan, is more than just a walk in the woods. It's a practice of mindful immersion in nature that has been scientifically proven to boost immune function, reduce stress hormones, and improve overall well-being.</p>

        <h2>The Origins of Forest Bathing</h2>
        <p>Developed in Japan in the 1980s as a form of preventive medicine and healing, forest bathing was created in response to rising stress levels and urbanization. The practice involves slowly and mindfully experiencing the forest through all five senses.</p>

        <h2>Scientific Benefits</h2>
        <p>Research has shown that forest bathing can:</p>
        <ul>
          <li>Increase natural killer (NK) cell activity, boosting immune function</li>
          <li>Reduce cortisol levels by up to 50%</li>
          <li>Lower blood pressure and heart rate</li>
          <li>Improve mood and reduce anxiety</li>
          <li>Enhance creativity and problem-solving abilities</li>
        </ul>

        <h2>How to Practice Forest Bathing</h2>
        <p>Unlike hiking, forest bathing is about slowing down and being present. Here's how to practice:</p>
        <ol>
          <li><strong>Find a natural space:</strong> Any forest, park, or wooded area will work</li>
          <li><strong>Leave devices behind:</strong> Disconnect from technology completely</li>
          <li><strong>Move slowly:</strong> Walk at a leisurely pace, or simply sit</li>
          <li><strong>Engage your senses:</strong> Listen to bird songs, feel tree bark, breathe in forest air</li>
          <li><strong>Stay present:</strong> When your mind wanders, gently return to the sensory experience</li>
        </ol>

        <p>A typical session lasts 2-4 hours, but even 20-30 minutes can provide benefits. The key is quality over quantity – deep, mindful engagement with nature.</p>
      `
    }
    // Add more blog posts as needed
  };

  const post = blogPosts[id as keyof typeof blogPosts];

  if (!post) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Post not found</h1>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Sanghos Blog</title>
        <meta name="description" content={post.title} />
      </Helmet>

      <Header />

      <main className="bg-white">
        {/* Back to Blog */}
        <section className="py-8 border-b border-sand-100">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <Button variant="ghost" asChild className="group">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-12">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <span className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-brand-dark leading-tight">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-6 mb-8 text-brand-slate">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" size="sm" className="group">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="group">
                  <Heart className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="mb-12">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-96 object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-16">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="prose prose-lg max-w-none"
              style={{
                '--tw-prose-body': 'rgb(81 96 114)',
                '--tw-prose-headings': 'rgb(29 74 77)',
                '--tw-prose-links': 'rgb(37 182 164)',
                '--tw-prose-bold': 'rgb(29 74 77)',
                '--tw-prose-counters': 'rgb(37 182 164)',
                '--tw-prose-bullets': 'rgb(37 182 164)',
              } as React.CSSProperties}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </section>

        {/* Newsletter Section */}
        <BeehiivNewsletterSignup />
      </main>

      <Footer />
    </>
  );
};

export default BlogPost;
