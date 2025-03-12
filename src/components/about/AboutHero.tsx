
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import OptimizedImage from "@/components/OptimizedImage";

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
      image: "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?ixlib=rb-4.0.3",
      className: "md:col-span-2 row-span-2"
    },
    {
      title: "Community First",
      description: "Join our growing wellness community",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3",
      isSolid: true,
      className: "bg-sage-100"
    },
    {
      title: "Expert Guidance",
      description: "Learn from experienced practitioners",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3",
      className: ""
    }
  ];

  return (
    <section className="py-12 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Sanghos</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            We're on a mission to make mindfulness and wellness retreats accessible to everyone, 
            creating spaces for transformation and community.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12"
        >
          {cards.map((card, index) => (
            <Card 
              key={index}
              className={cn(
                "group relative overflow-hidden transition-all duration-300 hover:shadow-lg",
                card.isSolid ? "h-[200px] md:h-[250px]" : "h-[300px] md:h-[400px]",
                card.className
              )}
            >
              {!card.isSolid ? (
                <>
                  <div className="absolute inset-0">
                    <OptimizedImage 
                      src={card.image} 
                      alt={card.title}
                      className="w-full h-full"
                      objectFit="cover"
                      aspectRatio="custom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{card.title}</h3>
                    <p className="text-white/80">{card.description}</p>
                  </div>
                </>
              ) : (
                <div className="p-6 h-full flex flex-col justify-between">
                  <h3 className="text-2xl md:text-3xl font-bold text-sage-900">{card.title}</h3>
                  <p className="text-sage-700">{card.description}</p>
                </div>
              )}
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
