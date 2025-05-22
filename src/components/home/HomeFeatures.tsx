
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const HomeFeatures = () => {
  const features = [
    {
      title: "Breathwork",
      description: "Experience transformative breathing techniques to release tension, boost energy, and find inner calm.",
      image: "/lovable-uploads/d3e397b5-0ff3-412e-b6ce-537617953355.png"
    },
    {
      title: "Meditation",
      description: "Discover the power of silence in a supportive environment to deepen mindfulness and self-awareness.",
      image: "/lovable-uploads/dc289f39-f518-4603-88f5-b92a074c6949.png"
    },
    {
      title: "Somatic Healing",
      description: "Integrate body-based healing approaches with therapeutic practices for holistic emotional wellbeing.",
      image: "/lovable-uploads/c664e811-a15f-43cf-b260-d4f59fdb6e80.png"
    }
  ];

  return (
    <section className="py-24 bg-[#F3F1ED]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <span className="text-sm font-medium text-brand-primary uppercase tracking-wider mb-3 block">
            What We Do
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-6 leading-tight">
            Our Focus Areas
          </h2>
          
          <p className="text-xl text-brand-slate max-w-3xl mx-auto">
            We're focused on addressing the primary barriers that prevent too many people 
            from finding and accessing life-changing wellness experiences that they deserve.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    duration: 0.8,
                    ease: "easeOut",
                    delay: i * 0.2
                  }
                }
              }}
              className="h-full"
            >
              <div className="overflow-hidden border border-gray-100 shadow-lg h-full rounded-2xl bg-white">
                <div className="aspect-[16/9]">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-brand-slate">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
