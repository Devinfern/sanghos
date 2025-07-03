
import { motion } from "framer-motion";
import OptimizedImage from "@/components/OptimizedImage";

interface AboutMissionProps {
  isLoaded: boolean;
}

const AboutMission = ({ isLoaded }: AboutMissionProps) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn} className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-brand-primary font-semibold">Our Purpose</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-12 text-brand-dark max-w-5xl mx-auto leading-tight">We're Bridging The Gap Between Wellness Retreat Access</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-center">
            <div className="mx-auto mb-6 bg-brand-subtle/30 w-40 h-40 rounded-full flex items-center justify-center overflow-hidden">
              <OptimizedImage 
                src="/lovable-uploads/67eb6b8e-8f83-4d05-abf8-7fbf6f04927e.png" 
                alt="Building Community" 
                className="w-32 h-32 object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-brand-dark">Building Community</h3>
            <p className="text-lg text-brand-slate">
              We're tackling isolation through community-building experiences where we partner with diverse practitioners to shift perspectives about wellness.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-center">
            <div className="mx-auto mb-6 bg-brand-peach/20 w-40 h-40 rounded-full flex items-center justify-center overflow-hidden">
              <OptimizedImage 
                src="/lovable-uploads/bd3043ff-55d5-4b55-9bf2-b01ad0b3a0a1.png" 
                alt="Expanding Access" 
                className="w-32 h-32 object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-brand-dark">Expanding Access</h3>
            <p className="text-lg text-brand-slate">
              We've built a seamless platform for accessing transformative retreat experiences. Because finding wellness should be as easy as booking a flight.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: 0.4, duration: 0.6 }} className="text-center">
            <div className="mx-auto mb-6 bg-brand-sky/20 w-40 h-40 rounded-full flex items-center justify-center overflow-hidden">
              <OptimizedImage 
                src="/lovable-uploads/90bff10d-eebc-4fb3-9757-78e7db110623.png" 
                alt="Transforming Lives" 
                className="w-32 h-32 object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-brand-dark">Transforming Lives</h3>
            <p className="text-lg text-brand-slate">
              We're creating opportunities for profound personal growth through curated experiences that nurture both individual wellbeing and community connection.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
