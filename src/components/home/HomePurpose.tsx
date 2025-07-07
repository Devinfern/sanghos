
import { motion } from "framer-motion";
import PurposeCarousel from "./PurposeCarousel";

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
      detailedContent: `Our mission is to partner with diverse practitioners and redefine wellness through shared, transformative journeys. We believe that true wellness happens in connection with others.

Through carefully curated group experiences, we foster meaningful relationships that extend far beyond a single retreat day. Each gathering becomes a foundation for lasting friendships and ongoing support in your wellness journey.

We've seen participants form book clubs, hiking groups, and even business partnerships after connecting at our retreats. This is the power of authentic community - it ripples out into every aspect of life.`,
      backgroundImage: "/lovable-uploads/e6b80ef4-9068-44e2-bfa5-40be26ac5a2a.png",
      emoji: "🧠"
    },
    {
      id: "access",
      title: "Expanding Access",
      description: "We've built a seamless platform for accessing transformative retreat experiences. Because finding wellness should be as easy as booking a flight.",
      detailedContent: `Our platform removes the traditional barriers to wellness experiences. No need to travel far from home, take extended time off work, or navigate complex booking processes.

We've partnered with unique venues and expert practitioners in your local area, making premium wellness experiences accessible right in your community. Our streamlined booking system handles all the details, from instructor coordination to space preparation.

Whether you're a busy parent, working professional, or anyone seeking wellness without the hassle, we've designed every aspect of our platform to make your journey as smooth as possible.`,
      backgroundImage: "/lovable-uploads/7c1bcd1c-2858-4e48-94a1-8100af35555c.png",
      emoji: "🌿"
    },
    {
      id: "transformation",
      title: "Transforming Lives",
      description: "We're creating opportunities for profound personal growth through curated experiences that nurture both individual wellbeing and community connection.",
      detailedContent: `Every retreat is designed as a catalyst for positive change. We don't just offer activities - we create transformative experiences that participants carry forward into their daily lives.

Our expert instructors are carefully selected not just for their skills, but for their ability to guide meaningful personal insights. Combined with the power of group energy and beautiful spaces, each retreat becomes a turning point.

Participants regularly tell us about breakthroughs they've experienced - from overcoming anxiety to discovering new passions, building confidence, or simply finding the peace they'd been searching for. These aren't just temporary escapes; they're foundations for lasting transformation.`,
      backgroundImage: "/lovable-uploads/d0153ee6-35ad-4cef-b315-db54a7be4644.png",
      emoji: "🔄"
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
          <PurposeCarousel items={purposeItems} />
        </motion.div>
      </div>
    </section>
  );
};

export default HomePurpose;
