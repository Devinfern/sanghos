
import { motion } from "framer-motion";
import { Home, Users, Sparkles } from "lucide-react";
import HorizontalCarousel from "./HorizontalCarousel";

const HomePurpose = () => {
  // Animation variants
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const purposeItems = [
    {
      id: "community",
      title: "Building Community",
      description: "We tackle isolation head-on by creating engaging community experiences. Our name, Sanghos, draws from Sangha, a Sanskrit word meaning \"community.\"",
      detailedContent: {
        summary: "We partner with diverse practitioners to redefine wellness through shared, transformative journeys. True wellness happens in connection with others.",
        howItWorks: "Through carefully curated group experiences, we foster meaningful relationships that extend far beyond a single retreat day.",
        impact: "Each gathering becomes a foundation for lasting friendships and ongoing support in your wellness journey.",
        examples: "Participants form book clubs, hiking groups, and business partnerships after connecting at our retreats. This is the power of authentic community."
      },
      backgroundImage: "/lovable-uploads/897c2070-49f2-40a6-bcee-4db226e52f04.png",
      icon: <Home className="w-4 h-4" />,
      category: "Building Community"
    },
    {
      id: "access",
      title: "Expanding Access",
      description: "We've built a seamless platform for accessing transformative retreat experiences. Because finding wellness should be as easy as booking a flight.",
      detailedContent: {
        summary: "Our platform removes traditional barriers to wellness experiences. No need to travel far, take extended time off, or navigate complex booking processes.",
        howItWorks: "We've partnered with unique venues and expert practitioners in your local area, making premium wellness experiences accessible in your community.",
        impact: "Our streamlined booking system handles all details, from instructor coordination to space preparation, making your journey smooth.",
        examples: "Perfect for busy parents, working professionals, or anyone seeking wellness without the hassle. Every aspect designed for ease and accessibility."
      },
      backgroundImage: "/lovable-uploads/1c5f4e3a-49c9-466e-9b87-7af196c7c650.png",
      icon: <Users className="w-4 h-4" />,
      category: "Expanding Access"
    },
    {
      id: "transformation",
      title: "Transforming Lives",
      description: "We're creating opportunities for profound personal growth through curated experiences that nurture both individual wellbeing and community connection.",
      detailedContent: {
        summary: "Every retreat is designed as a catalyst for positive change. We create transformative experiences that participants carry forward into their daily lives.",
        howItWorks: "Expert instructors are selected for their skills and ability to guide meaningful personal insights, combined with group energy and beautiful spaces.",
        impact: "Each retreat becomes a turning point, offering breakthroughs in overcoming anxiety, discovering passions, building confidence, and finding peace.",
        examples: "Participants tell us about lasting transformations - these aren't temporary escapes, they're foundations for ongoing personal growth and wellness."
      },
      backgroundImage: "/lovable-uploads/4a90c8f7-cbe4-439b-9759-77b6090dfa9b.png",
      icon: <Sparkles className="w-4 h-4" />,
      category: "Transforming Lives"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="max-w-5xl mx-auto text-center mb-16" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={fadeUp}
        >
          <span className="text-sm font-medium text-brand-primary uppercase tracking-wider mb-3 block">
            Our Purpose
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-12 leading-tight">
            We're working to democratize the growing wellness gap
          </h2>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <HorizontalCarousel items={purposeItems} />
        </motion.div>
      </div>
    </section>
  );
};

export default HomePurpose;
