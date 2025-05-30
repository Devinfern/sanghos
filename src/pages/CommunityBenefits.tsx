
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Users, MessageCircle, Calendar, Heart, BookOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OptimizedImage from '@/components/OptimizedImage';

const CommunityBenefits = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const connectFeatures = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Global Community",
      description: "Connect with wellness enthusiasts from around the world who share your passion for mindful living"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Supportive Network",
      description: "Find encouragement and motivation from like-minded individuals on similar wellness journeys"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Meaningful Conversations",
      description: "Engage in deep discussions about wellness practices, challenges, and breakthroughs"
    }
  ];

  const shareFeatures = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Personal Stories",
      description: "Share your wellness journey, insights, and transformative experiences with the community"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Best Practices",
      description: "Exchange tips, techniques, and proven methods that have worked in your wellness practice"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Peer Support",
      description: "Offer and receive guidance during challenging times in your wellness journey"
    }
  ];

  const accessFeatures = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Early Retreat Access",
      description: "Get first access to new retreats and exclusive member-only wellness events"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Premium Content",
      description: "Access exclusive workshops, guided meditations, and wellness resources"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Sessions",
      description: "Join special sessions with renowned wellness instructors and thought leaders"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Community Benefits | Sanghos</title>
        <meta name="description" content="Discover the three pillars of our wellness community: Connect, Share, and Access exclusive content and experiences." />
      </Helmet>

      <Header />

      <main className="bg-white overflow-x-hidden">
        {/* Hero Section */}
        <section className="py-24 md:py-32 bg-gradient-to-br from-brand-subtle/30 to-white relative">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <motion.div 
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="text-sm uppercase tracking-wider text-brand-primary font-semibold">Community Pillars</span>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 text-brand-dark leading-tight">
                The Three Pillars of <span className="text-brand-primary">Wellness</span>
              </h1>
              <p className="text-xl text-brand-slate mb-12 leading-relaxed">
                Our community is built on three foundational pillars that create a transformative 
                wellness experience for every member.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tabbed Content Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <Tabs defaultValue="connect" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-16 bg-brand-subtle/20 p-2 rounded-2xl">
                <TabsTrigger 
                  value="connect" 
                  className="text-lg font-semibold py-4 px-8 rounded-xl data-[state=active]:bg-white data-[state=active]:text-brand-primary data-[state=active]:shadow-sm"
                >
                  Connect
                </TabsTrigger>
                <TabsTrigger 
                  value="share" 
                  className="text-lg font-semibold py-4 px-8 rounded-xl data-[state=active]:bg-white data-[state=active]:text-brand-primary data-[state=active]:shadow-sm"
                >
                  Share
                </TabsTrigger>
                <TabsTrigger 
                  value="access" 
                  className="text-lg font-semibold py-4 px-8 rounded-xl data-[state=active]:bg-white data-[state=active]:text-brand-primary data-[state=active]:shadow-sm"
                >
                  Access
                </TabsTrigger>
              </TabsList>

              <TabsContent value="connect" className="space-y-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="space-y-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-4xl md:text-5xl font-bold text-brand-dark">
                        Connect with Your Tribe
                      </h2>
                      <p className="text-xl text-brand-slate leading-relaxed">
                        Build meaningful relationships with fellow wellness enthusiasts who understand 
                        your journey and share your commitment to mindful living.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="grid grid-cols-2 gap-4 h-96">
                      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-0 rounded-3xl overflow-hidden">
                        <CardContent className="p-0 h-full">
                          <OptimizedImage 
                            src="/lovable-uploads/1bb523ae-38ed-4377-8a20-53ad930f2cba.png"
                            alt="Community connection"
                            className="w-full h-full object-cover"
                          />
                        </CardContent>
                      </Card>
                      <div className="space-y-4">
                        <Card className="bg-gradient-to-br from-emerald-100 to-teal-100 border-0 rounded-2xl p-6 h-32">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                              <Heart className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-brand-dark">1,000+</h4>
                              <p className="text-sm text-brand-slate">Active Members</p>
                            </div>
                          </div>
                        </Card>
                        <Card className="bg-gradient-to-br from-teal-100 to-emerald-100 border-0 rounded-2xl p-6 h-56">
                          <div className="space-y-4">
                            <MessageCircle className="h-8 w-8 text-teal-600" />
                            <div>
                              <h4 className="font-semibold text-brand-dark mb-2">Daily Discussions</h4>
                              <p className="text-sm text-brand-slate leading-relaxed">
                                Join conversations about meditation, mindfulness, and wellness practices.
                              </p>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {connectFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                    >
                      <Card className="p-8 rounded-3xl border-0 bg-gradient-to-br from-white to-emerald-50/30 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-0 space-y-4">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white">
                            {feature.icon}
                          </div>
                          <h3 className="text-xl font-bold text-brand-dark">{feature.title}</h3>
                          <p className="text-brand-slate leading-relaxed">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="share" className="space-y-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="space-y-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
                        <MessageCircle className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-4xl md:text-5xl font-bold text-brand-dark">
                        Share Your Journey
                      </h2>
                      <p className="text-xl text-brand-slate leading-relaxed">
                        Inspire others and learn from shared experiences. Your story could be the 
                        catalyst someone needs for their own transformation.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="grid grid-cols-1 gap-6 h-96">
                      <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 border-0 rounded-3xl p-8 text-white">
                        <CardContent className="p-0 space-y-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                              <BookOpen className="h-6 w-6" />
                            </div>
                            <div>
                              <h4 className="font-bold text-xl">Share Stories</h4>
                              <p className="text-blue-100">Weekly community spotlights</p>
                            </div>
                          </div>
                          <p className="text-blue-100 leading-relaxed">
                            "The community support helped me through my most challenging times. 
                            Sharing my story became part of my healing."
                          </p>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                            <span className="text-sm text-blue-100">Sarah K., Community Member</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {shareFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                    >
                      <Card className="p-8 rounded-3xl border-0 bg-gradient-to-br from-white to-blue-50/30 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-0 space-y-4">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white">
                            {feature.icon}
                          </div>
                          <h3 className="text-xl font-bold text-brand-dark">{feature.title}</h3>
                          <p className="text-brand-slate leading-relaxed">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="access" className="space-y-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="space-y-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl">
                        <Calendar className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-4xl md:text-5xl font-bold text-brand-dark">
                        Exclusive Access
                      </h2>
                      <p className="text-xl text-brand-slate leading-relaxed">
                        Unlock premium content, early retreat bookings, and special member-only 
                        events designed to deepen your wellness practice.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="space-y-4 h-96">
                      <Card className="bg-gradient-to-br from-orange-400 to-red-500 border-0 rounded-3xl p-6 text-white h-32">
                        <CardContent className="p-0 flex items-center justify-between h-full">
                          <div>
                            <h4 className="font-bold text-xl mb-2">Early Access</h4>
                            <p className="text-orange-100">24hrs before public release</p>
                          </div>
                          <Calendar className="h-12 w-12 text-orange-200" />
                        </CardContent>
                      </Card>
                      <div className="grid grid-cols-2 gap-4 h-56">
                        <Card className="bg-gradient-to-br from-red-100 to-orange-100 border-0 rounded-2xl p-6">
                          <CardContent className="p-0 space-y-3">
                            <Star className="h-8 w-8 text-red-500" />
                            <h4 className="font-semibold text-brand-dark">Premium Content</h4>
                            <p className="text-sm text-brand-slate">Exclusive workshops & guides</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-orange-100 to-red-100 border-0 rounded-2xl p-6">
                          <CardContent className="p-0 space-y-3">
                            <Users className="h-8 w-8 text-orange-500" />
                            <h4 className="font-semibold text-brand-dark">Expert Sessions</h4>
                            <p className="text-sm text-brand-slate">Monthly instructor Q&As</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {accessFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                    >
                      <Card className="p-8 rounded-3xl border-0 bg-gradient-to-br from-white to-orange-50/30 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-0 space-y-4">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl text-white">
                            {feature.icon}
                          </div>
                          <h3 className="text-xl font-bold text-brand-dark">{feature.title}</h3>
                          <p className="text-brand-slate leading-relaxed">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-brand-dark to-brand-primary/90 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6">
            <motion.div 
              initial="hidden" 
              animate={isLoaded ? "visible" : "hidden"} 
              variants={fadeIn} 
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Experience All Three Pillars?</h2>
              <p className="text-xl mb-10 text-white/90 leading-relaxed">
                Join our wellness community today and start connecting, sharing, and accessing 
                exclusive content that will transform your journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-brand-dark hover:bg-white/90 rounded-full group"
                  asChild
                >
                  <Link to="/signup">
                    Join the Community
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/50 text-white hover:bg-white/10 rounded-full"
                  asChild
                >
                  <Link to="/community-teaser">
                    Learn More
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CommunityBenefits;
