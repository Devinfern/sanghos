
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Compass, Target, Globe, Leaf, Users } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";

const AboutDesignTwo = () => {
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

  // Timeline data
  const timeline = [
    {
      year: "2019",
      title: "The Beginning",
      description: "Sanghos started as a small community of mindfulness practitioners in San Francisco."
    },
    {
      year: "2020",
      title: "Digital Pivot",
      description: "During the pandemic, we created virtual retreat experiences, connecting people across distances."
    },
    {
      year: "2021",
      title: "Official Launch",
      description: "Sanghos platform launched, connecting retreat hosts with spaces and participants."
    },
    {
      year: "2022",
      title: "Expansion",
      description: "Expanded to 5 major cities with over 100 hosts and 50 instructors joining our community."
    },
    {
      year: "2023",
      title: "Community Growth",
      description: "Reached 10,000 retreat participants and launched our host certification program."
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
        <section className="relative pt-28 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-brand-dark z-0"></div>
          
          <div className="container relative z-10 mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-16 gap-y-12 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-2 text-white"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Creating spaces for mindful connection
                </h1>
                <p className="text-xl opacity-80 mb-8">
                  Sanghos was born from a simple belief: that mindfulness and community should be accessible to everyone.
                </p>
                <Button 
                  size="lg" 
                  className="bg-brand-primary hover:bg-brand-primary/90 text-white group"
                  asChild
                >
                  <a href="#our-mission">
                    Learn Our Story
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:col-span-3 relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden h-64 border-4 border-white/20">
                      <OptimizedImage 
                        src="https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?ixlib=rb-4.0.3" 
                        alt="Community gathering" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden h-32 border-4 border-white/20">
                      <OptimizedImage 
                        src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3" 
                        alt="Team collaboration" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden h-32 border-4 border-white/20">
                      <OptimizedImage 
                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3" 
                        alt="Meditation session" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden h-64 border-4 border-white/20">
                      <OptimizedImage 
                        src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3" 
                        alt="Friends in nature" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="our-mission" className="py-24 bg-white">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-brand-primary/10 rounded-3xl transform rotate-3"></div>
                <div className="relative overflow-hidden rounded-2xl border border-brand-subtle/30">
                  <OptimizedImage 
                    src="https://images.unsplash.com/photo-1571399249736-ab2347dd9b7e?ixlib=rb-4.0.3" 
                    alt="Team at work" 
                    className="w-full aspect-video object-cover"
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h2 className="text-4xl font-bold mb-6 text-brand-dark">Our Mission</h2>
                <div className="border-l-4 border-brand-primary pl-6 mb-8">
                  <p className="text-2xl text-brand-slate italic">
                    "To make mindfulness and wellness retreats accessible to all by connecting people with spaces that foster genuine community."
                  </p>
                </div>
                <p className="text-lg text-brand-slate mb-8">
                  We're building an ecosystem where hosts, instructors, and participants can come together to create transformative experiences. By focusing on day-long retreats in private spaces, we're making mindfulness practice more attainable for everyone.
                </p>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">1,000+</p>
                      <p className="text-sm text-brand-slate">Community Members</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mr-3">
                      <Globe className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">20+</p>
                      <p className="text-sm text-brand-slate">Locations</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mr-3">
                      <Heart className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">50+</p>
                      <p className="text-sm text-brand-slate">Retreat Experiences</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-brand-subtle/10">
          <div className="container mx-auto max-w-6xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-brand-dark">Our Core Values</h2>
              <p className="text-xl text-brand-slate max-w-3xl mx-auto">
                These principles guide everything we do
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-6 inline-flex p-3 bg-brand-rose/10 rounded-xl">
                  <Heart className="h-8 w-8 text-brand-rose" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-brand-dark">Compassion</h3>
                <p className="text-brand-slate">We approach our work with empathy, kindness, and genuine care for everyone's wellbeing.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-6 inline-flex p-3 bg-brand-primary/10 rounded-xl">
                  <Compass className="h-8 w-8 text-brand-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-brand-dark">Authenticity</h3>
                <p className="text-brand-slate">We create spaces where people can show up as their true selves and experience genuine connection.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-6 inline-flex p-3 bg-brand-sand/10 rounded-xl">
                  <Globe className="h-8 w-8 text-brand-sand" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-brand-dark">Community</h3>
                <p className="text-brand-slate">We cultivate relationships that foster belonging, support, and growth for all members.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto max-w-6xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-brand-dark">Our Founder</h2>
              <p className="text-xl text-brand-slate max-w-3xl mx-auto">
                Meet the visionary behind Sanghos
              </p>
            </motion.div>
            
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="h-full">
                    <img 
                      src="/lovable-uploads/f1e50ebf-84dd-47ec-9f51-e4ef3f49b992.png" 
                      alt="Devin Fernandez" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold mb-2 text-brand-dark">Devin Fernandez</h3>
                    <p className="text-brand-primary font-medium mb-6">Founder & CEO</p>
                    <p className="text-brand-slate mb-8">
                      "After 10+ years of meditation practice, I saw a clear need for more accessible, community-oriented retreat experiences. Sanghos bridges that gap, making transformative experiences available to everyone."
                    </p>
                    <div className="flex gap-4">
                      <Button 
                        variant="outline"
                        size="sm" 
                        className="border-brand-primary text-brand-primary hover:bg-brand-primary/5"
                        asChild
                      >
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                          LinkedIn
                        </a>
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm" 
                        className="border-brand-primary text-brand-primary hover:bg-brand-primary/5"
                        asChild
                      >
                        <a href="mailto:contact@sanghos.com">
                          Contact
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 bg-brand-subtle/10">
          <div className="container mx-auto max-w-6xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-brand-dark">Our Journey</h2>
              <p className="text-xl text-brand-slate max-w-3xl mx-auto">
                From a small community gathering to a thriving platform
              </p>
            </motion.div>
            
            <div className="relative">
              {/* Timeline central line */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-brand-primary/30"></div>
              
              <div className="space-y-16">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.7, delay: 0.1 * index }}
                    className={`flex flex-col md:flex-row items-start relative ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="md:w-1/2 md:px-8">
                      <div className="bg-white p-6 rounded-xl shadow-sm relative">
                        {/* Arrow pointer */}
                        <div className={`hidden md:block absolute top-6 ${
                          index % 2 === 0 ? "left-0 transform -translate-x-full" : "right-0 transform translate-x-full rotate-180"
                        } w-0 h-0 border-t-8 border-b-8 border-l-[16px] border-l-white border-t-transparent border-b-transparent`}></div>
                        
                        <h3 className="text-xl font-bold mb-2 text-brand-dark">{item.title}</h3>
                        <p className="text-brand-slate">{item.description}</p>
                      </div>
                    </div>
                    
                    {/* Center year marker */}
                    <div className="absolute top-6 left-4 md:left-1/2 transform md:-translate-x-1/2 flex flex-col items-center z-10">
                      <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-lg">
                        <span className="text-xs font-bold">{item.year}</span>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Join CTA Section */}
        <section className="py-24 bg-gradient-to-br from-brand-primary to-brand-dark text-white">
          <div className="container mx-auto max-w-5xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Community</h2>
              <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto">
                Whether you're seeking mindful experiences, looking to share your expertise, or have a unique space to host retreats, we'd love to welcome you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-brand-primary hover:bg-white/90"
                  asChild
                >
                  <a href="/join">
                    Join as a Member
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  asChild
                >
                  <a href="/host/signup">
                    Become a Host
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

export default AboutDesignTwo;
