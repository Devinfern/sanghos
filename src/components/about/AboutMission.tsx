
import { motion } from "framer-motion";
import { Users, Leaf, Globe } from "lucide-react";

interface AboutMissionProps {
  isLoaded: boolean;
}

const AboutMission = ({ isLoaded }: AboutMissionProps) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground">
            At Sanghos, we believe that meaningful connection and personal growth shouldn't require lengthy retreats or distant travel. We're dedicated to making transformative experiences accessible through curated daylong retreats in unique private spaces near you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-sage-50 p-8 rounded-xl"
          >
            <Users className="h-12 w-12 text-sage-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Connect</h3>
            <p className="text-muted-foreground">
              We bring together mindfulness seekers, skilled instructors, and welcoming hosts to create a vibrant community.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-sand-50 p-8 rounded-xl"
          >
            <Leaf className="h-12 w-12 text-sand-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Transform</h3>
            <p className="text-muted-foreground">
              Our experiences help people disconnect from daily stresses and reconnect with themselves and others.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-sage-50 p-8 rounded-xl"
          >
            <Globe className="h-12 w-12 text-sage-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Cultivate</h3>
            <p className="text-muted-foreground">
              We nurture a growing ecosystem of mindfulness that's accessible and welcoming to everyone.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
