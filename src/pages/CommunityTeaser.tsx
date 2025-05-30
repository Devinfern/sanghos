import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users, MessageCircle, Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WellnessCommunityTeaser from '@/components/WellnessCommunityTeaser';
import OptimizedImage from '@/components/OptimizedImage';

const CommunityTeaser = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const fadeIn = {
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

  const benefits = [
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: "Connect",
      description: "Access to exclusive community discussions and connect with retreat participants before and after events",
      bgColor: "bg-gradient-to-br from-emerald-500 to-teal-600",
      textColor: "text-white",
      expandedContent: {
        features: [
          "Private discussion forums for retreat participants",
          "Direct messaging with fellow community members",
          "Virtual meetups and online wellness sessions",
          "Mentorship opportunities with experienced practitioners"
        ],
        details: "Our connection platform helps you build lasting relationships with people who share your wellness journey. Whether you're preparing for a retreat or reflecting on your experience, you'll find a supportive community ready to listen and share."
      }
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-white" />,
      title: "Share",
      description: "Share your wellness journey with supportive members and learn from others' experiences",
      bgColor: "bg-gradient-to-br from-blue-500 to-indigo-600", 
      textColor: "text-white",
      expandedContent: {
        features: [
          "Personal journey documentation and reflection tools",
          "Photo and video sharing from your wellness experiences",
          "Expert-moderated discussion topics and Q&As",
          "Resource library with member-contributed content"
        ],
        details: "Sharing your wellness journey amplifies its impact. Our platform provides safe spaces to document your growth, celebrate milestones, and learn from the diverse experiences of our global community."
      }
    },
    {
      icon: <Calendar className="h-8 w-8 text-white" />,
      title: "Access",
      description: "Early access to new retreats and special discounts on upcoming wellness events",
      bgColor: "bg-gradient-to-br from-orange-400 to-red-500",
      textColor: "text-white",
      expandedContent: {
        features: [
          "48-hour early booking window for new retreats",
          "Exclusive member-only discounts up to 20%",
          "Priority waitlist placement for popular events",
          "Complimentary access to monthly virtual workshops"
        ],
        details: "As a community member, you'll enjoy exclusive perks that make wellness more accessible. From early access to limited spots to special pricing, we ensure our most dedicated members get the best opportunities."
      }
    }
  ];

  const testimonials = [
    {
      quote: "Joining the Sanghos community changed my wellness journey. I've connected with amazing people who share my passion for mindfulness.",
      name: "Sarah K.",
      role: "Yoga Enthusiast"
    },
    {
      quote: "The discussions and support in this community have been invaluable. I've discovered retreats I never would have found otherwise.",
      name: "Michael T.",
      role: "Meditation Practitioner" 
    }
  ];

  const handleCardExpand = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Join Our Community | Sanghos</title>
        <meta name="description" content="Connect with like-minded individuals on their wellness journey, share experiences, and learn from our community of practitioners." />
      </Helmet>

      <Header />

      <main className="bg-white overflow-x-hidden">
        {/* Hero Section */}
        <section className="py-24 md:py-32 bg-brand-subtle/10 relative">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={fadeIn}
                className="max-w-3xl"
              >
                <h1 className="text-6xl md:text-7xl font-bold mb-8 text-brand-dark leading-tight">Join Our Wellness Community</h1>
                
                <p className="text-xl mb-8 text-brand-slate">
                  Connect with like-minded individuals on their wellness journey, share experiences,
                  and learn from our community of practitioners and retreat participants.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full group"
                    asChild
                  >
                    <Link to="/login">
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-brand-primary/50 text-brand-primary hover:bg-brand-primary/5 rounded-full"
                    asChild
                  >
                    <Link to="/signup">Join Sanghos</Link>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div 
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={fadeIn}
                className="relative rounded-3xl overflow-hidden"
              >
                <OptimizedImage 
                  src="/lovable-uploads/1bb523ae-38ed-4377-8a20-53ad930f2cba.png"
                  alt="Community yoga session in nature"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section - Fixed Animation */}
        <section className="py-24 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <span className="text-sm uppercase tracking-wider text-brand-primary font-semibold">Community Benefits</span>
              <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-8 text-brand-dark">
                Why Join Our Community?
              </h2>
              <p className="text-xl text-brand-slate max-w-3xl mx-auto">
                Experience the power of connection and growth in our supportive wellness space
              </p>
            </motion.div>

            <div 
              className={`grid gap-8 transition-all duration-700 ease-in-out ${
                expandedCard !== null 
                  ? 'grid-cols-1' 
                  : 'grid-cols-1 lg:grid-cols-3'
              }`}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  className={`${benefit.bgColor} ${benefit.textColor} rounded-3xl relative overflow-hidden group transition-all duration-700 ease-in-out ${
                    expandedCard === index ? 'order-first' : ''
                  } ${
                    expandedCard !== null && expandedCard !== index ? 'hidden lg:hidden' : ''
                  }`}
                  style={{
                    minHeight: expandedCard === index ? '600px' : '400px'
                  }}
                >
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 p-8 h-full">
                    <AnimatePresence mode="wait">
                      {expandedCard !== index ? (
                        <motion.div
                          key="collapsed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="h-full flex flex-col"
                        >
                          <div className="mb-6">
                            {benefit.icon}
                          </div>
                          <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                          <p className="text-lg opacity-90 leading-relaxed mb-6 flex-1">{benefit.description}</p>
                          
                          <button 
                            onClick={() => handleCardExpand(index)}
                            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 group/btn w-fit"
                          >
                            Learn More
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="expanded"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="h-full"
                        >
                          <div className="flex justify-between items-start mb-8">
                            <div className="flex items-center gap-4">
                              {benefit.icon}
                              <h3 className="text-3xl font-bold">{benefit.title}</h3>
                            </div>
                            <button 
                              onClick={() => setExpandedCard(null)}
                              className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all duration-200"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                              <h4 className="text-xl font-semibold mb-4">What You Get:</h4>
                              <ul className="space-y-3 mb-6">
                                {benefit.expandedContent.features.map((feature, featureIndex) => (
                                  <li key={featureIndex} className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-white/80 mt-2 flex-shrink-0"></div>
                                    <span className="text-lg opacity-90">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="text-xl font-semibold mb-4">Why It Matters:</h4>
                              <p className="text-lg opacity-90 leading-relaxed mb-6">
                                {benefit.expandedContent.details}
                              </p>
                              
                              <div className="flex gap-4 mt-8">
                                <Button 
                                  size="lg" 
                                  className="bg-white text-gray-900 hover:bg-white/90 rounded-full group"
                                  asChild
                                >
                                  <Link to="/signup">
                                    Join Now
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                  </Link>
                                </Button>
                                <Button 
                                  size="lg" 
                                  variant="outline" 
                                  className="border-white/50 text-white hover:bg-white/10 rounded-full"
                                  asChild
                                >
                                  <Link to="/login">Sign In</Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-brand-subtle/10">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <span className="text-sm uppercase tracking-wider text-brand-primary font-semibold">Testimonials</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-8 text-brand-dark">
                What Our Community Members Say
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  className="bg-white p-8 rounded-3xl shadow-sm"
                >
                  <div className="mb-6">
                    <svg width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-primary/20">
                      <path d="M13.44 36C9.6 36 6.4 34.56 3.84 31.68C1.28 28.8 0 25.2 0 20.88C0 15.68 1.76 11.04 5.28 6.96C8.8 2.88 13.28 0.24 18.72 0L20.16 4.8C16.8 5.44 13.92 7.12 11.52 9.84C9.12 12.56 8 15.52 8.16 18.72C9.12 17.6 10.56 17.04 12.48 17.04C14.56 17.04 16.4 17.84 18 19.44C19.6 21.04 20.4 23.04 20.4 25.44C20.4 28 19.52 30.16 17.76 31.92C16 33.68 13.92 36 13.44 36ZM37.44 36C33.6 36 30.4 34.56 27.84 31.68C25.28 28.8 24 25.2 24 20.88C24 15.68 25.76 11.04 29.28 6.96C32.8 2.88 37.28 0.24 42.72 0L44.16 4.8C40.8 5.44 37.92 7.12 35.52 9.84C33.12 12.56 32 15.52 32.16 18.72C33.12 17.6 34.56 17.04 36.48 17.04C38.56 17.04 40.4 17.84 42 19.44C43.6 21.04 44.4 23.04 44.4 25.44C44.4 28 43.52 30.16 41.76 31.92C40 33.68 37.92 36 37.44 36Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <p className="text-xl italic mb-6 text-brand-slate">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <div className="ml-4">
                      <h4 className="font-bold text-brand-dark">{testimonial.name}</h4>
                      <p className="text-brand-slate">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Include the existing WellnessCommunityTeaser component */}
        <WellnessCommunityTeaser />
        
        {/* Join CTA Section */}
        <section className="py-24 bg-brand-subtle/20 relative overflow-hidden">
          <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6">
            <motion.div 
              initial="hidden" 
              animate={isLoaded ? "visible" : "hidden"} 
              variants={fadeIn} 
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-dark">Ready to Join Us?</h2>
              <p className="text-xl mb-10 text-brand-slate">
                Become part of our growing wellness community and transform your journey with like-minded individuals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-brand-primary hover:bg-brand-primary/90 rounded-full group"
                  asChild
                >
                  <Link to="/signup">
                    Join Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-brand-primary/50 text-brand-primary hover:bg-brand-primary/5 rounded-full"
                  asChild
                >
                  <Link to="/login">
                    Already a member? Sign in
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

export default CommunityTeaser;
