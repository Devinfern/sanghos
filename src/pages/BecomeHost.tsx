
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Heart, Users, Star, CheckCircle, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import OptimizedImage from "@/components/OptimizedImage";

const BecomeHost = () => {
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

  const benefits = [
    {
      icon: <Heart className="h-6 w-6 text-brand-primary" />,
      title: "Make a Meaningful Impact",
      description: "Help create transformative experiences that nurture wellbeing and build community connections."
    },
    {
      icon: <Users className="h-6 w-6 text-brand-peach" />,
      title: "Connect with Like-minded People",
      description: "Meet wellness practitioners and participants who share your values and passion for mindful living."
    },
    {
      icon: <MapPin className="h-6 w-6 text-brand-sky" />,
      title: "Share Your Beautiful Space",
      description: "Transform your unique venue into a sanctuary for healing, growth, and community gathering."
    },
    {
      icon: <Star className="h-6 w-6 text-brand-primary" />,
      title: "Generate Income",
      description: "Earn revenue by hosting retreats while supporting the wellness community in your area."
    }
  ];

  const requirements = [
    "Peaceful, private space that can accommodate 8-20 people",
    "Indoor and outdoor areas for different activities",
    "Basic amenities (restrooms, kitchen access preferred)",
    "Parking availability for participants",
    "Commitment to creating a welcoming environment"
  ];

  return (
    <>
      <Helmet>
        <title>Become a Host | Sanghos</title>
        <meta name="description" content="Share your beautiful space and become part of the Sanghos wellness community. Host transformative retreat experiences." />
      </Helmet>

      <Header />

      <main className="min-h-screen relative overflow-hidden">
        {/* Background with glass morphism elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-subtle/20 via-white to-brand-peach/10"></div>
        
        {/* Floating glass elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-brand-primary/5 backdrop-blur-3xl border border-brand-primary/10 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-brand-peach/5 backdrop-blur-3xl border border-brand-peach/10 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Hero Section */}
        <section className="relative py-32 md:py-40">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={fadeIn}
                className="relative z-10"
              >
                {/* Glass morphism card */}
                <div className="relative p-8 md:p-12 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-3xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center space-x-2 mb-6">
                      <Home className="h-6 w-6 text-brand-primary" />
                      <span className="text-sm font-semibold text-brand-primary uppercase tracking-widest">Become a Host</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-brand-dark leading-tight">
                      Share Your Space,
                      <span className="block text-brand-primary">Transform Lives</span>
                    </h1>
                    
                    <p className="text-xl text-brand-slate mb-8 leading-relaxed">
                      Open your doors to wellness and become part of a community dedicated to 
                      creating meaningful retreat experiences. Your space could be the sanctuary 
                      someone needs to find their path to healing and growth.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        size="lg" 
                        className="bg-brand-primary hover:bg-brand-primary/90 text-white group rounded-full"
                      >
                        Start Your Application
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-brand-dark hover:bg-white/20 rounded-full"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={fadeIn}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden">
                  <OptimizedImage 
                    src="/lovable-uploads/60c5a966-4e10-4c09-af70-bfafe90c0630.png" 
                    alt="Beautiful retreat space" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="relative py-24">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-dark">
                Why Become a Host?
              </h2>
              <p className="text-xl text-brand-slate max-w-3xl mx-auto">
                Join a community of hosts who are passionate about wellness and making a positive impact
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                >
                  <Card className="p-8 bg-white/30 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl">
                    <CardContent className="p-0">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 rounded-2xl bg-white/40 backdrop-blur-sm">
                          {benefit.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-3 text-brand-dark">{benefit.title}</h3>
                          <p className="text-brand-slate text-lg leading-relaxed">{benefit.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="relative py-24">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-dark">
                What We're Looking For
              </h2>
              <p className="text-xl text-brand-slate">
                We seek hosts who can provide beautiful, peaceful spaces for transformative experiences
              </p>
            </motion.div>

            <div className="relative p-8 md:p-12 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-3xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8 text-brand-dark text-center">Space Requirements</h3>
                <div className="space-y-4">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-brand-primary mt-1 flex-shrink-0" />
                      <span className="text-lg text-brand-slate">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24">
          <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <div className="relative p-12 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-3xl"></div>
                
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-dark">
                    Ready to Get Started?
                  </h2>
                  <p className="text-xl text-brand-slate mb-8 max-w-2xl mx-auto">
                    Join our community of hosts and start creating meaningful wellness experiences in your space.
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-brand-primary hover:bg-brand-primary/90 text-white group text-lg px-8 py-4 rounded-full"
                  >
                    Apply to Become a Host
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default BecomeHost;
