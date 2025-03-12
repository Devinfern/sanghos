
import { motion } from "framer-motion";
import { Leaf, Flower, Cloud, Droplets, Plus } from "lucide-react";

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
      icon: <Leaf className="h-6 w-6 text-white" />,
      title: "Yoga Retreats",
      description: "Find your center with immersive yoga experiences led by skilled practitioners.",
      image: "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      icon: <Flower className="h-6 w-6 text-white" />,
      title: "Psychedelic Retreats",
      description: "Explore consciousness and healing through guided psychedelic experiences.",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3264&q=80"
    },
    {
      id: 3,
      icon: <Cloud className="h-6 w-6 text-white" />,
      title: "Meditation Retreats",
      description: "Cultivate mindfulness and inner peace through guided meditation practices.",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4608&q=80"
    },
    {
      id: 4,
      icon: <Droplets className="h-6 w-6 text-white" />,
      title: "Ayahuasca Retreats",
      description: "Experience traditional plant medicine ceremonies in supportive settings.",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=5472&q=80"
    },
    {
      id: 5,
      icon: <Plus className="h-6 w-6 text-white" />,
      title: "Health & Wellness",
      description: "Revitalize your body and mind with holistic health and wellness programs.",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=5909&q=80"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-sand-50">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Explore by Retreat Type</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover transformative experiences tailored to your wellness journey
          </p>
        </motion.div>

        <motion.div 
          variants={staggerChildren}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {retreatTypes.map((type) => (
            <motion.div
              key={type.id}
              variants={fadeIn}
              className="rounded-xl overflow-hidden shadow-md relative group h-[320px] md:h-[400px]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70 z-10"></div>
              <img 
                src={type.image} 
                alt={type.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <div className="flex items-center gap-2 bg-black/70 text-white px-4 py-3 rounded-lg">
                  <span>{type.icon}</span>
                  <h3 className="text-lg font-medium">{type.title}</h3>
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
