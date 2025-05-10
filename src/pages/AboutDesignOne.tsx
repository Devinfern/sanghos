
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";

const AboutDesignOne = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const teamMembers = [
    {
      name: "Devin Fernandez",
      role: "Founder & CEO",
      image: "/lovable-uploads/f1e50ebf-84dd-47ec-9f51-e4ef3f49b992.png",
      bio: "Devin's 10-year journey with meditation revealed the need for a more accessible retreat experience, leading to the creation of Sanghos."
    },
    {
      name: "Maria Chen",
      role: "Community Director",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000",
      bio: "With a background in community building, Maria ensures our spaces foster genuine connection and belonging."
    },
    {
      name: "James Watkins",
      role: "Head of Experience",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
      bio: "James brings 15 years of hospitality expertise to craft transformative retreat experiences."
    }
  ];

  const testimonials = [
    {
      name: "Sarah L.",
      role: "Community Member",
      quote: "Sanghos retreats have transformed how I approach mindfulness in my daily life. The community I've found here is incredible.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000"
    },
    {
      name: "Michael T.",
      role: "Retreat Host",
      quote: "Becoming a host with Sanghos has allowed me to share my space with amazing people while creating a sustainable business.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000"
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Sanghos</title>
        <meta 
          name="description" 
          content="Learn about Sanghos - our story, mission, values, and the team behind our mindfulness and wellness retreats." 
        />
      </Helmet>

      <Header />

      <main className="bg-white overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-subtle/30 to-white z-0"></div>
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-brand-subtle/40 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-brand-peach/20 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3 z-0"></div>
          
          <div className="container mx-auto max-w-6xl px-4 md:px-6 relative z-10">
            <motion.div 
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-brand-dark leading-tight">
                Our Community <span className="text-brand-primary">Story</span>
              </h1>
              <p className="text-xl md:text-2xl text-brand-slate mb-10">
                Building spaces for mindfulness, connection, and transformation together
              </p>
              <div className="flex justify-center">
                <div className="relative w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center animate-pulse-glow">
                  <ArrowRight className="h-8 w-8 text-brand-primary animate-bounce" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-dark">Our Mission</h2>
                <p className="text-xl text-brand-slate mb-6">
                  At Sanghos, we believe that meaningful connection and personal growth should be accessible to everyone. We're creating a world where transformative experiences are just around the corner.
                </p>
                <p className="text-lg text-brand-slate mb-8">
                  Our platform connects mindfulness seekers with unique, community-oriented retreat spaces and experienced guides, making wellness experiences more accessible and personal than ever before.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center bg-brand-subtle/30 px-4 py-2 rounded-full">
                    <div className="bg-brand-primary rounded-full p-2 mr-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white" />
                      </svg>
                    </div>
                    <span className="font-medium">50+ Mindfulness Retreats</span>
                  </div>
                  <div className="flex items-center bg-brand-subtle/30 px-4 py-2 rounded-full">
                    <div className="bg-brand-rose rounded-full p-2 mr-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-medium">1000+ Community Members</span>
                  </div>
                  <div className="flex items-center bg-brand-subtle/30 px-4 py-2 rounded-full">
                    <div className="bg-brand-sky rounded-full p-2 mr-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-medium">20+ Locations Nationwide</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-peach/20 rounded-3xl transform rotate-3 z-0"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-lg border border-brand-subtle/20 z-10">
                  <OptimizedImage 
                    src="https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?ixlib=rb-4.0.3" 
                    alt="Community gathering" 
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-white rounded-xl p-4 shadow-md border border-brand-subtle/20 z-20">
                  <p className="text-brand-primary font-bold text-xl">Our Vision</p>
                  <p className="text-brand-slate">A world where mindfulness is woven into daily life</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-brand-subtle/10 rounded-[3rem] mx-4 md:mx-8 my-16">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-dark">Our Values</h2>
              <p className="text-xl text-brand-slate max-w-3xl mx-auto">
                These core principles guide everything we do at Sanghos
              </p>
            </motion.div>

            <motion.div 
              variants={staggerChildren}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: "❤️",
                  title: "Compassion",
                  description: "We approach our work with empathy, kindness, and genuine care for everyone's wellbeing."
                },
                {
                  icon: "🧭",
                  title: "Authenticity",
                  description: "We create spaces where people can show up as their true selves and experience genuine connection."
                },
                {
                  icon: "🎯",
                  title: "Intentionality",
                  description: "Every retreat, space and interaction is crafted with purpose and mindfulness."
                },
                {
                  icon: "🌍",
                  title: "Community",
                  description: "We cultivate relationships that foster belonging, support, and growth for all members."
                },
                {
                  icon: "🌱",
                  title: "Sustainability",
                  description: "We make choices that honor the environment and promote long-term wellbeing."
                },
                {
                  icon: "✨",
                  title: "Transformation",
                  description: "We believe in the power of experiences to create meaningful life changes."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-brand-subtle/30 hover:shadow-md transition-shadow group"
                >
                  <div className="mb-6 text-4xl group-hover:scale-110 transition-transform">{value.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3 text-brand-dark">{value.title}</h3>
                  <p className="text-brand-slate">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-dark">Meet Our Team</h2>
              <p className="text-xl text-brand-slate max-w-3xl mx-auto">
                The passionate people behind Sanghos who are dedicated to creating meaningful experiences
              </p>
            </motion.div>
            
            <motion.div 
              variants={staggerChildren}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-brand-subtle/30 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden h-80">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6">
                        <p className="text-white text-lg">{member.bio}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-brand-dark">{member.name}</h3>
                    <p className="text-brand-primary font-medium">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-brand-primary/5 rounded-[3rem] mx-4 md:mx-8 my-16">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-dark">Community Voices</h2>
              <p className="text-xl text-brand-slate max-w-3xl mx-auto">
                Hear from members of our growing community
              </p>
            </motion.div>
            
            <motion.div 
              variants={staggerChildren}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-brand-subtle/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center mb-6">
                    <div className="mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-16 h-16 rounded-full object-cover border-2 border-brand-primary" 
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-brand-dark">{testimonial.name}</h3>
                      <p className="text-brand-primary">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-lg text-brand-slate italic">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Join CTA Section */}
        <section className="py-24 bg-brand-dark rounded-[3rem] mx-4 md:mx-8 my-16 overflow-hidden relative">
          {/* Decorative elements */}
          <div className="absolute w-full h-full overflow-hidden z-0">
            <div className="absolute -right-20 top-20 w-72 h-72 bg-brand-primary/30 rounded-full blur-xl"></div>
            <div className="absolute -left-20 bottom-20 w-80 h-80 bg-brand-peach/20 rounded-full blur-xl"></div>
          </div>
          
          <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Become Part of Our Story</h2>
              <p className="text-xl mb-10 text-white/80">
                Whether you're seeking mindful experiences, looking to share your expertise, or have a unique space to host retreats, we'd love to welcome you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-brand-dark hover:bg-white/90 group"
                  asChild
                >
                  <a href="/join">
                    Join as a Member
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white hover:bg-white/10 text-white group"
                  asChild
                >
                  <a href="/host/signup">
                    Become a Host
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
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

export default AboutDesignOne;
