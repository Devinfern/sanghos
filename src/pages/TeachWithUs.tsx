
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Heart, Users, Star, CheckCircle, Award, Compass } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import OptimizedImage from "@/components/OptimizedImage";

const TeachWithUs = () => {
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
      icon: <Users className="h-6 w-6 text-brand-primary" />,
      title: "Reach Your Ideal Students",
      description: "Connect with participants who are genuinely seeking transformation and growth in their wellness journey."
    },
    {
      icon: <Heart className="h-6 w-6 text-brand-peach" />,
      title: "Share Your Passion",
      description: "Teach what you love in beautiful, supportive environments that enhance your students' learning experience."
    },
    {
      icon: <Award className="h-6 w-6 text-brand-sky" />,
      title: "Professional Support",
      description: "Focus on teaching while we handle marketing, logistics, and creating the perfect retreat environment."
    },
    {
      icon: <Star className="h-6 w-6 text-brand-primary" />,
      title: "Competitive Compensation",
      description: "Earn fair compensation for your expertise while building a sustainable teaching practice."
    }
  ];

  const specialties = [
    "Meditation & Mindfulness",
    "Yoga & Movement",
    "Breathwork & Pranayama",
    "Sound Healing",
    "Somatic Therapy",
    "Life Coaching",
    "Art & Expressive Therapy",
    "Nature-based Wellness"
  ];

  const qualifications = [
    "Certified in your area of expertise with at least 200+ hours of training",
    "2+ years of teaching experience in wellness/mindfulness practices",
    "Demonstrated ability to create safe, inclusive spaces",
    "Strong communication skills and authentic teaching presence",
    "Commitment to ongoing professional development",
    "Alignment with Sanghos values of compassion and authenticity"
  ];

  return (
    <>
      <Helmet>
        <title>Teach With Us | Sanghos</title>
        <meta name="description" content="Join our community of wellness instructors and share your expertise through transformative retreat experiences." />
      </Helmet>

      <Header />

      <main className="min-h-screen relative overflow-hidden">
        {/* Background with glass morphism elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-sky/10 via-white to-brand-primary/5"></div>
        
        {/* Floating glass elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 right-10 w-96 h-96 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 animate-float"></div>
          <div className="absolute bottom-32 left-20 w-80 h-80 rounded-full bg-brand-sky/5 backdrop-blur-3xl border border-brand-sky/10 animate-float" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-brand-primary/5 backdrop-blur-3xl border border-brand-primary/10 animate-float" style={{ animationDelay: '1.5s' }}></div>
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
                      <GraduationCap className="h-6 w-6 text-brand-primary" />
                      <span className="text-sm font-semibold text-brand-primary uppercase tracking-widest">Teach With Us</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-brand-dark leading-tight">
                      Share Your Wisdom,
                      <span className="block text-brand-primary">Inspire Transformation</span>
                    </h1>
                    
                    <p className="text-xl text-brand-slate mb-8 leading-relaxed">
                      Join our community of passionate wellness instructors and lead transformative 
                      retreat experiences. We provide the platform, support, and beautiful spaces 
                      for you to share your expertise and make a meaningful impact.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        size="lg" 
                        className="bg-brand-primary hover:bg-brand-primary/90 text-white group rounded-full"
                      >
                        Apply to Teach
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-brand-dark hover:bg-white/20 rounded-full"
                      >
                        View Opportunities
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
                    src="/lovable-uploads/dc289f39-f518-4603-88f5-b92a074c6949.png" 
                    alt="Wellness instructor teaching" 
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
                Why Teach With Sanghos?
              </h2>
              <p className="text-xl text-brand-slate max-w-3xl mx-auto">
                Join a supportive community where your expertise is valued and your impact is amplified
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

        {/* Specialties Section */}
        <section className="relative py-24">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-dark">
                We Welcome These Specialties
              </h2>
              <p className="text-xl text-brand-slate">
                Our retreat offerings span a wide range of wellness practices
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {specialties.map((specialty, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                  className="p-6 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 text-center hover:bg-white/30 transition-all duration-300"
                >
                  <Compass className="h-8 w-8 text-brand-primary mx-auto mb-3" />
                  <span className="text-brand-dark font-medium">{specialty}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Qualifications Section */}
        <section className="relative py-24">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-dark">
                Instructor Qualifications
              </h2>
              <p className="text-xl text-brand-slate">
                We seek experienced, passionate instructors who create safe and transformative spaces
              </p>
            </motion.div>

            <div className="relative p-8 md:p-12 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-3xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8 text-brand-dark text-center">What We Look For</h3>
                <div className="space-y-4">
                  {qualifications.map((qualification, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-brand-primary mt-1 flex-shrink-0" />
                      <span className="text-lg text-brand-slate">{qualification}</span>
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
                    Ready to Share Your Gift?
                  </h2>
                  <p className="text-xl text-brand-slate mb-8 max-w-2xl mx-auto">
                    Join our community of wellness instructors and start leading transformative retreat experiences.
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-brand-primary hover:bg-brand-primary/90 text-white group text-lg px-8 py-4 rounded-full"
                  >
                    Apply to Become an Instructor
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

export default TeachWithUs;
