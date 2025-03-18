
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/OptimizedImage";

interface RetreatTypesProps {
  isLoaded: boolean;
}

const RetreatTypes = ({ isLoaded }: RetreatTypesProps) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const retreatTypes = [
    {
      id: 1,
      category: "BREATHWORK",
      title: "Transformative Breathing",
      description: "Experience transformative breathing techniques to release tension, boost energy, and find inner calm.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      category: "SILENT",
      title: "Calming Silence",
      description: "Discover the power of silence in a supportive environment to deepen mindfulness and self-awareness.",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=3264&q=80"
    },
    {
      id: 3,
      category: "SOMATIC",
      title: "Body-Centered Healing",
      description: "Integrate body-based healing approaches with therapeutic practices for holistic emotional wellbeing.",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=4608&q=80"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-brand-subtle/10">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-brand-dark">Explore by Retreat Type</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover transformative experiences tailored to your wellness journey
          </p>
        </motion.div>

        <motion.div 
          variants={staggerChildren}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {retreatTypes.map((type) => (
            <motion.div
              key={type.id}
              variants={fadeIn}
              className="rounded-xl overflow-hidden bg-white p-6 hover:shadow-md transition-shadow border border-brand-subtle/20"
            >
              <div className="flex flex-col h-full">
                <p className="text-sm font-medium text-brand-primary mb-2">{type.category}</p>
                <h3 className="text-2xl font-bold text-brand-dark mb-3">{type.title}</h3>
                <p className="text-brand-slate mb-6">{type.description}</p>
                
                <div className="mt-auto mb-4">
                  <Button 
                    variant="outline" 
                    className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/5 font-medium"
                  >
                    Learn More
                  </Button>
                </div>
                
                <div className="h-48 overflow-hidden rounded-md">
                  <OptimizedImage 
                    src={type.image} 
                    alt={type.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RetreatTypes;
