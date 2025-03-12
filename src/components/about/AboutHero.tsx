
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AboutHeroProps {
  isLoaded: boolean;
}

const AboutHero = ({ isLoaded }: AboutHeroProps) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const cards = [
    {
      title: "Our Mission",
      description: "Making mindfulness accessible to everyone",
      image: "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      className: "md:col-span-2 md:row-span-2"
    },
    {
      title: "Community First",
      description: "Join our growing wellness community",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3264&q=80",
      className: "md:col-span-1"
    },
    {
      title: "Expert Guidance",
      description: "Learn from experienced practitioners",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4608&q=80",
      className: "md:col-span-1"
    }
  ];

  return (
    <section className="py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {cards.map((card, index) => (
            <Card 
              key={index}
              className={cn(
                "group relative overflow-hidden h-[300px] md:h-[400px] transition-all duration-300 hover:shadow-lg",
                card.className
              )}
            >
              <div className="absolute inset-0">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{card.title}</h3>
                <p className="text-white/80">{card.description}</p>
              </div>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
