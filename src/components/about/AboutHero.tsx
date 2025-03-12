
import { motion } from "framer-motion";

interface AboutHeroProps {
  isLoaded: boolean;
}

const AboutHero = ({ isLoaded }: AboutHeroProps) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-sand-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">We're making mindfulness experiences more accessible</h1>
            <p className="text-xl text-muted-foreground">
              Sanghos connects mindful seekers with transformative retreat experiences in unique spaces near you.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-sage-100 rounded-full z-0"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-sand-100 rounded-full z-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="People at a mindfulness retreat" 
              className="rounded-2xl w-full h-auto relative z-10 shadow-lg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
