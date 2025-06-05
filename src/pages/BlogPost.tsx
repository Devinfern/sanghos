import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, Share2, Heart, BookmarkPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BeehiivNewsletterSignup from '@/components/BeehiivNewsletterSignup';

const BlogPost = () => {
  const { id } = useParams();

  // Enhanced blog post data with wellness focus
  const blogPosts = {
    'mindful-breathing-techniques': {
      title: 'Mindful Breathing Techniques: Your Gateway to Inner Peace',
      subtitle: 'Transform your daily stress into moments of calm and clarity with these powerful practices.',
      author: 'Devin Fernandez',
      authorBio: 'Certified meditation teacher and breathwork specialist with 15+ years of experience.',
      date: 'December 15, 2024',
      readTime: '8 min read',
      image: '/lovable-uploads/cf8fc774-aba1-4ccc-a684-8a94a89150ce.jpg',
      category: 'Breathwork',
      tags: ['Meditation', 'Stress Relief', 'Wellness'],
      content: `
        <p class="lead">In our fast-paced world, the simple act of breathing mindfully can be a powerful tool for finding peace and clarity. These evidence-based techniques can transform your relationship with stress and anxiety.</p>

        <h2>The Science Behind Mindful Breathing</h2>
        <p>Mindful breathing activates the parasympathetic nervous system, which is responsible for the body's "rest and digest" response. When we breathe consciously and slowly, we signal to our brain that we're safe, helping to reduce cortisol levels and promote a natural state of calm.</p>

        <blockquote>
          "Breath is the bridge which connects life to consciousness, which unites your body to your thoughts." - Thich Nhat Hanh
        </blockquote>

        <h2>4-7-8 Breathing: The Natural Tranquilizer</h2>
        <p>This technique, developed by Dr. Andrew Weil, is excellent for reducing anxiety and promoting restful sleep:</p>
        <ol>
          <li>Exhale completely through your mouth, making a whoosh sound</li>
          <li>Close your mouth and inhale quietly through your nose for 4 counts</li>
          <li>Hold your breath for 7 counts</li>
          <li>Exhale through your mouth for 8 counts, making the whoosh sound</li>
          <li>Repeat the cycle 3-4 times</li>
        </ol>

        <div class="practice-tip">
          <h3>Practice Tip</h3>
          <p>Start slowly with this technique. The ratio is more important than the speed. As you become comfortable, you can increase the length of each count.</p>
        </div>

        <h2>Box Breathing: The Navy SEAL Technique</h2>
        <p>Used by elite military personnel and meditation practitioners alike, box breathing helps improve focus and emotional regulation:</p>
        <ol>
          <li>Inhale slowly for 4 counts</li>
          <li>Hold your breath for 4 counts</li>
          <li>Exhale slowly for 4 counts</li>
          <li>Hold empty for 4 counts</li>
          <li>Repeat for 5-10 cycles</li>
        </ol>

        <h2>Coherent Breathing: Finding Your Natural Rhythm</h2>
        <p>This technique involves breathing at a rate of 5 breaths per minute, which has been shown to optimize heart rate variability and promote emotional balance. Simply inhale for 6 seconds and exhale for 6 seconds, maintaining this rhythm for 5-20 minutes.</p>

        <h2>Creating Your Daily Practice</h2>
        <p>The key to benefiting from breathwork is consistency. Start with just 5 minutes a day, choosing one technique that resonates with you. Consider practicing:</p>
        <ul>
          <li><strong>Morning:</strong> Set a calm, centered tone for your day</li>
          <li><strong>Midday:</strong> Reset your energy during work breaks</li>
          <li><strong>Before meals:</strong> Improve digestion and mindful eating</li>
          <li><strong>Evening:</strong> Transition into restful sleep</li>
        </ul>

        <p>Remember, like any skill, mindful breathing improves with practice. Be patient and compassionate with yourself as you develop this powerful tool for well-being.</p>
      `
    },
    'forest-bathing-guide': {
      title: 'The Science Behind Forest Bathing: Why Nature Heals',
      subtitle: 'Discover the Japanese practice of Shinrin-yoku and how it can boost immunity and reduce stress.',
      author: 'Devin Fernandez',
      authorBio: 'Nature therapy researcher and certified forest bathing guide.',
      date: 'December 12, 2024',
      readTime: '6 min read',
      image: '/lovable-uploads/eb5e3a10-e1d3-49a7-9bd6-f9cfd8a697fc.jpg',
      category: 'Nature Therapy',
      tags: ['Forest Bathing', 'Stress Relief', 'Immunity'],
      content: `
        <p class="lead">Forest bathing, or "Shinrin-yoku" as it's known in Japan, is more than just a walk in the woods. It's a practice of mindful immersion in nature that has been scientifically proven to boost immune function and reduce stress.</p>

        <h2>The Origins of Forest Bathing</h2>
        <p>Developed in Japan in the 1980s as a form of preventive medicine and healing, forest bathing was created in response to rising stress levels and urbanization. The practice involves slowly and mindfully experiencing the forest through all five senses.</p>

        <h2>Remarkable Health Benefits</h2>
        <p>Extensive research has shown that forest bathing can:</p>
        <ul>
          <li>Increase natural killer (NK) cell activity by up to 50%, boosting immune function</li>
          <li>Reduce cortisol levels significantly</li>
          <li>Lower blood pressure and heart rate</li>
          <li>Improve mood and reduce symptoms of anxiety and depression</li>
          <li>Enhance creativity and problem-solving abilities</li>
          <li>Increase energy levels and improve sleep quality</li>
        </ul>

        <blockquote>
          "In every walk with nature, one receives far more than they seek." - John Muir
        </blockquote>

        <h2>How to Practice Forest Bathing</h2>
        <p>Unlike hiking, forest bathing is about slowing down and being fully present. Here's your guide:</p>
        
        <h3>Preparation</h3>
        <ol>
          <li><strong>Choose your location:</strong> Any forest, park, or wooded area will work</li>
          <li><strong>Disconnect:</strong> Leave devices behind or turn them off completely</li>
          <li><strong>Set intention:</strong> Commit to being present and open</li>
        </ol>

        <h3>The Practice</h3>
        <ol>
          <li><strong>Enter slowly:</strong> Cross the threshold mindfully</li>
          <li><strong>Find your pace:</strong> Walk much slower than usual, or simply sit</li>
          <li><strong>Engage your senses:</strong> Listen to bird songs, feel tree bark, breathe in forest air</li>
          <li><strong>Stay present:</strong> When your mind wanders, gently return to sensory experience</li>
          <li><strong>Connect:</strong> Touch trees, sit on the ground, observe wildlife</li>
        </ol>

        <div class="practice-tip">
          <h3>Forest Bathing Invitation</h3>
          <p>Find a tree that calls to you. Sit with your back against it for 10-15 minutes. Feel its support, listen to the sounds around you, and breathe deeply. This simple practice can be profoundly restorative.</p>
        </div>

        <p>A typical session lasts 2-4 hours, but even 20-30 minutes can provide significant benefits. The key is quality over quantity – deep, mindful engagement with the natural world.</p>
      `
    },
    'morning-wellness-rituals': {
      title: '7 Morning Rituals That Will Transform Your Day',
      subtitle: 'Simple yet powerful practices to start your morning with intention and create lasting positive change.',
      author: 'Devin Fernandez',
      authorBio: 'Wellness coach and morning routine specialist with expertise in transformative daily practices.',
      date: 'December 8, 2024',
      readTime: '5 min read',
      image: '/lovable-uploads/374c6d8d-b72d-4385-b859-d37c9b4869ed.png',
      category: 'Wellness',
      tags: ['Morning Routine', 'Productivity', 'Wellness'],
      content: `
        <p class="lead">The early hours, often spent in a rush, are being re-envisioned as a powerful window for personal growth. By thoughtfully shaping your first moments, you can unlock a cascade of benefits, from enhanced focus to a greater sense of purpose, that positively influences your entire day.</p>

        <h2>The Dawn Advantage</h2>
        <p>The idea of a structured morning isn't new, yet its profound impact is frequently underestimated. From ancient philosophical practices to the routines of modern high-achievers, a consistent theme emerges: intentional beginnings are the bedrock of exceptional outcomes. These aren't just mere habits; they're strategic activators for a better day.</p>

        <h2>Unlocking Your Potential</h2>
        <p>By aligning your mind and body with the sunrise, these rituals are designed to prepare your system for peak performance. This means moving beyond simply waking up and moving into a deliberate activation of your best self.</p>

        <blockquote>
          "How you start your morning sets the tone for your entire day. Choose wisely, and watch your life transform."
        </blockquote>

        <h2>The Transformative Seven</h2>
        
        <h3>1. Instant Hydration</h3>
        <p>Kickstart your metabolism and brain function by rehydrating your body after hours of sleep. A glass of water, perhaps with a squeeze of lemon, is an excellent choice.</p>

        <h3>2. Morning Movement</h3>
        <p>Whether it's a quick stretch, a few yoga poses, or a brisk walk, engaging your body wakes up your muscles and improves circulation, boosting energy and mental clarity.</p>

        <h3>3. Mindful Breathing</h3>
        <p>Just a few minutes of focused breathwork can calm your nervous system, reduce stress, and sharpen your ability to concentrate.</p>

        <h3>4. Purposeful Connection</h3>
        <p>Dedicate time to reflect on your goals or what truly matters to you. This grounds your day in meaning and intention.</p>

        <h3>5. Mental Nourishment</h3>
        <p>Stimulate your intellect before the day's demands take over. Read something inspiring, listen to an educational podcast, or simply journal your thoughts.</p>

        <h3>6. Top Three Planning</h3>
        <p>Identify your three most important tasks for the day. This provides clear direction and helps prevent overwhelm.</p>

        <h3>7. Gratitude Moment</h3>
        <p>Acknowledging what you're thankful for shifts your perspective toward positivity and abundance, setting a powerful tone for the hours ahead.</p>

        <div class="practice-tip">
          <h3>Start Small</h3>
          <p>Don't try to implement all seven rituals at once. Choose one or two that resonate with you and build from there. Consistency with fewer practices is better than sporadic attempts at all seven.</p>
        </div>

        <h2>Cultivating a Prime State</h2>
        <p>These rituals aren't exclusive; they're adaptable frameworks for anyone seeking an edge. From the busiest executive to the creative entrepreneur, the principles of intentional mornings apply universally, fostering a tangible shift in daily experience.</p>

        <h2>The Future of Mornings</h2>
        <p>By prioritizing proactive self-care at dawn, we're challenging the norm of reactive mornings. This approach underscores the advantage of understanding why wellness works and helps individuals feel the difference, one sunrise at a time.</p>
      `
    }
  };

  const post = blogPosts[id as keyof typeof blogPosts];

  if (!post) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brand-subtle/10 to-white">
          <Card className="max-w-md mx-auto text-center p-8">
            <CardContent>
              <h1 className="text-2xl font-bold mb-4 text-brand-dark">Article not found</h1>
              <p className="text-brand-slate mb-6">The article you're looking for doesn't exist or has been moved.</p>
              <Button asChild className="bg-brand-primary hover:bg-brand-primary/90">
                <Link to="/blog">Back to Insights</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </>
    );
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Sanghos Insights</title>
        <meta name="description" content={post.subtitle} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.subtitle} />
        <meta property="og:image" content={post.image} />
      </Helmet>

      <Header />

      <main className="bg-white py-[80px]">
        {/* Navigation */}
        <section className="py-6 border-b border-sand-100 bg-gradient-to-r from-brand-subtle/5 to-transparent">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <Button variant="ghost" asChild className="group text-brand-primary hover:text-brand-primary/80">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                All Insights
              </Link>
            </Button>
          </div>
        </section>

        {/* Article Header */}
        <section className="bg-gradient-to-b from-white to-brand-subtle/5 py-[24px]">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl mx-auto">
              {/* Category and Date */}
              <div className="flex items-center gap-4 mb-6">
                <Badge variant="default" className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20">
                  {post.category}
                </Badge>
                <span className="text-brand-slate text-sm">{post.date}</span>
              </div>
              
              {/* Title and Subtitle */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-brand-dark leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-brand-slate mb-8 leading-relaxed max-w-3xl">
                {post.subtitle}
              </p>
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 mb-8 text-brand-slate">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mb-12">
                <Button variant="outline" size="sm" className="group">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="group">
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" size="sm" className="group">
                  <Heart className="mr-2 h-4 w-4" />
                  Like
                </Button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="mb-16">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, delay: 0.2 }} 
              className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover" 
              />
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-20">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <motion.article 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6, delay: 0.4 }} 
                  className="prose prose-lg prose-brand max-w-none blog-content" 
                  style={{
                    '--tw-prose-body': 'rgb(81 96 114)',
                    '--tw-prose-headings': 'rgb(29 74 77)',
                    '--tw-prose-links': 'rgb(37 182 164)',
                    '--tw-prose-bold': 'rgb(29 74 77)',
                    '--tw-prose-counters': 'rgb(37 182 164)',
                    '--tw-prose-bullets': 'rgb(37 182 164)',
                    '--tw-prose-quotes': 'rgb(29 74 77)'
                  } as React.CSSProperties} 
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.6, delay: 0.6 }} 
                  className="sticky top-24 space-y-8"
                >
                  {/* Author Card */}
                  <Card className="p-6 bg-gradient-to-br from-brand-subtle/10 to-brand-primary/5">
                    <CardContent className="p-0">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <User className="h-8 w-8 text-brand-primary" />
                        </div>
                        <h3 className="font-bold text-brand-dark mb-2">{post.author}</h3>
                        <p className="text-sm text-brand-slate">{post.authorBio}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="p-6">
                    <CardContent className="p-0">
                      <h3 className="font-bold text-brand-dark mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Share2 className="mr-2 h-4 w-4" />
                          Share Article
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <BookmarkPlus className="mr-2 h-4 w-4" />
                          Save for Later
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Heart className="mr-2 h-4 w-4" />
                          Like Article
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <BeehiivNewsletterSignup />
      </main>

      <Footer />

      {/* Custom Styles */}
      <style>{`
        .blog-content .lead {
          font-size: 1.25rem;
          line-height: 1.6;
          color: rgb(81 96 114);
          margin-bottom: 2rem;
          font-weight: 400;
        }
        
        .blog-content blockquote {
          border-left: 4px solid rgb(37 182 164);
          background: linear-gradient(135deg, rgb(37 182 164 / 0.05) 0%, rgb(37 182 164 / 0.1) 100%);
          padding: 1.5rem;
          margin: 2rem 0;
          border-radius: 0.5rem;
          font-style: italic;
          font-size: 1.1rem;
        }
        
        .blog-content .practice-tip {
          background: linear-gradient(135deg, rgb(254 240 138 / 0.3) 0%, rgb(251 191 36 / 0.1) 100%);
          border: 1px solid rgb(251 191 36 / 0.2);
          border-radius: 1rem;
          padding: 1.5rem;
          margin: 2rem 0;
        }
        
        .blog-content .practice-tip h3 {
          color: rgb(161 98 7);
          margin-top: 0;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }
        
        .blog-content h2 {
          margin-top: 3rem;
          margin-bottom: 1rem;
          font-size: 1.875rem;
          line-height: 1.2;
        }
        
        .blog-content h3 {
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          font-size: 1.5rem;
        }
        
        .blog-content ol, .blog-content ul {
          margin: 1.5rem 0;
        }
        
        .blog-content li {
          margin: 0.5rem 0;
        }
        
        .blog-content p {
          margin: 1.25rem 0;
          line-height: 1.7;
        }
      `}</style>
    </>
  );
};

export default BlogPost;
