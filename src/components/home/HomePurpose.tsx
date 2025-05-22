
import { motion } from "framer-motion";

const HomePurpose = () => {
  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="text-sm font-medium text-brand-primary uppercase tracking-wider mb-3 block">
            Our Purpose
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-12 leading-tight">
            We're tackling one of the defining issues of our time: the growing wellness gap
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            <div className="flex flex-col items-center">
              <div className="bg-sage-100/50 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🧠</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Building Community</h3>
              <p className="text-brand-slate text-lg">
                We're tackling isolation through community-building experiences where we partner with diverse practitioners to shift perspectives about wellness.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-brand-peach/20 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🌿</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Expanding Access</h3>
              <p className="text-brand-slate text-lg">
                We've built a seamless platform for accessing transformative retreat experiences. Because finding wellness should be as easy as booking a flight.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-brand-sky/20 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🔄</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Transforming Lives</h3>
              <p className="text-brand-slate text-lg">
                We're creating opportunities for profound personal growth through curated experiences that nurture both individual wellbeing and community connection.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePurpose;
