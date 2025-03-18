
import { motion } from "framer-motion";
import { Heart, Compass, Target, Globe, Leaf } from "lucide-react";

interface CompanyValuesProps {
  isLoaded: boolean;
}

const CompanyValues = ({ isLoaded }: CompanyValuesProps) => {
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

  const values = [
    {
      icon: <Heart className="h-10 w-10 text-brand-rose" />,
      title: "Compassion",
      description: "We approach our work with empathy, kindness, and genuine care for the wellbeing of our community."
    },
    {
      icon: <Compass className="h-10 w-10 text-brand-primary" />,
      title: "Authenticity",
      description: "We believe in creating spaces where people can show up as their true selves and experience genuine connection."
    },
    {
      icon: <Target className="h-10 w-10 text-brand-peach" />,
      title: "Intentionality",
      description: "Every retreat, space, and interaction is crafted with purpose and mindfulness to create meaningful experiences."
    },
    {
      icon: <Globe className="h-10 w-10 text-brand-sky" />,
      title: "Community",
      description: "We cultivate relationships that foster belonging, support, and growth for all members of our ecosystem."
    },
    {
      icon: <Leaf className="h-10 w-10 text-brand-primary" />,
      title: "Sustainability",
      description: "We make choices that honor and protect the natural environment and promote long-term wellbeing."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Values</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            These core principles guide everything we do at Sanghos
          </p>
        </motion.div>

        <motion.div 
          variants={staggerChildren}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-white p-6 rounded-xl shadow-sm border border-brand-subtle/30 hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground text-sm">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyValues;
