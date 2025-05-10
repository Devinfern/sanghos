
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Heart, 
  Compass, 
  Target, 
  Globe, 
  Leaf, 
  Users,
  MessageSquare,
  Smile
} from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import { Card } from "@/components/ui/card";

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
  
  // Core values data
  const coreValues = [
    {
      icon: <Heart className="h-8 w-8 text-brand-rose" />,
      title: "Compassion",
      color: "rose",
      description: "We approach our work with empathy, kindness, and genuine care for everyone's wellbeing."
    },
    {
      icon: <Compass className="h-8 w-8 text-brand-primary" />,
      title: "Authenticity", 
      color: "primary",
      description: "We create spaces where people can show up as their true selves and experience genuine connection."
    },
    {
      icon: <Leaf className="h-8 w-8 text-brand-sand" />,
      title: "Sustainability",
      color: "sand",
      description: "Our practices honor both personal wellbeing and environmental responsibility."
    },
    {
      icon: <Globe className="h-8 w-8 text-sage-600" />,
      title: "Community",
      color: "sage",
      description: "We cultivate relationships that foster belonging, support, and growth for all members."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-brand-sky" />,
      title: "Communication",
      color: "sky",
      description: "Open and honest dialogue forms the foundation of our relationships and collaborations."
    },
    {
      icon: <Smile className="h-8 w-8 text-amber-500" />,
      title: "Joy",
      color: "amber",
      description: "We believe in cultivating happiness and celebrating life's simple pleasures together."
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
        {/* Hero Section - Modern, clean design with gradient overlay */}
        <section className="relative pt-28 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-brand-dark/90 z-0"></div>
          <div className="absolute inset-0 bg-[url('/lovable-uploads/6d18343c-7100-4964-a39e-2a3215536423.png')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          
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
                <p className="text-xl opacity-90 mb-8">
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
                    <div className="rounded-2xl overflow-hidden h-64 border-4 border-white/20 shadow-lg">
                      <img 
                        src="/lovable-uploads/9ef0b49f-48ef-413f-8c34-873181f2f094.png" 
                        alt="Community gathering" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden h-32 border-4 border-white/20 shadow-lg">
                      <img 
                        src="/lovable-uploads/e36dbc23-7334-48c8-afe8-4027497207fe.png" 
                        alt="Team collaboration" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden h-32 border-4 border-white/20 shadow-lg">
                      <img 
                        src="/lovable-uploads/e38deb47-fbee-4a9f-9466-0ad53f2d7a19.png" 
                        alt="Meditation session" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden h-64 border-4 border-white/20 shadow-lg">
                      <img 
                        src="/lovable-uploads/91da0c1f-b9f1-4310-aea3-1afbfe1358f7.png" 
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

        {/* Mission Section - Clean, with improved contrast and visual hierarchy */}
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
                <div className="relative overflow-hidden rounded-2xl border border-brand-subtle/30 shadow-lg">
                  <img 
                    src="/lovable-uploads/ec781cb4-24a1-464c-b587-a8d64d925b1f.png" 
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

        {/* Values Section - Modern card grid with subtle hover effects */}
        <section className="py-24 bg-gradient-to-b from-brand-subtle/10 to-white">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.7, delay: 0.1 * index }}
                >
                  <Card className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    <div className={`mb-6 inline-flex p-3 bg-${value.color === 'sage' ? 'sage-600' : value.color === 'sky' ? 'brand-sky' : value.color === 'amber' ? 'amber-500' : `brand-${value.color}`}/10 rounded-xl`}>
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-brand-dark">{value.title}</h3>
                    <p className="text-brand-slate">{value.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section - Modern card with improved visual hierarchy */}
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
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="h-full relative">
                    <img 
                      src="/lovable-uploads/f1e50ebf-84dd-47ec-9f51-e4ef3f49b992.png" 
                      alt="Devin Fernandez" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent md:hidden"></div>
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center relative">
                    <div className="absolute top-0 right-0 h-20 w-20 bg-brand-primary/10 rounded-bl-3xl -z-10"></div>
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

        {/* Timeline Section - Modern visual timeline */}
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
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-primary/30 via-brand-primary/50 to-brand-primary/30"></div>
              
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
                      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative">
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

        {/* Join CTA Section - Modern gradient with improved layout */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-dark"></div>
          <div className="absolute inset-0 bg-[url('/lovable-uploads/a4221dcd-00b3-46f3-abc5-1020058579a4.png')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          
          <div className="container relative z-10 mx-auto max-w-5xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="text-center text-white"
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
