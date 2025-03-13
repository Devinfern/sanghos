
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface TeamSectionProps {
  isLoaded: boolean;
}

const TeamSection = ({ isLoaded }: TeamSectionProps) => {
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

  const team = [
    {
      name: "Devin Fernandez",
      role: "Founder",
      image: "/lovable-uploads/f1e50ebf-84dd-47ec-9f51-e4ef3f49b992.png",
      bio: "Devin's 10+ years of meditation revealed the need for a more seamless retreat experience. This insight sparked the creation of Sanghos, aimed at making transformative journeys more attainable."
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
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Meet Our Founder</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The visionary behind Sanghos who is dedicated to creating meaningful experiences
          </p>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="flex justify-center"
        >
          {/* Horizontal card with image on left (1/3) and content on right (2/3) */}
          <div className="max-w-3xl w-full bg-[#F7F7F7] rounded-xl overflow-hidden shadow-sm flex">
            {/* Left side - Image (1/3 width) */}
            <div className="w-1/3 overflow-hidden">
              <img 
                src={team[0].image} 
                alt={team[0].name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Right side - Content (2/3 width) */}
            <div className="w-2/3 p-6">
              {/* Small uppercase label */}
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                {team[0].role}
              </p>
              
              {/* Name with vertical blue accent line */}
              <div className="flex items-center mb-5">
                <h3 className="text-xl font-bold text-slate-800">
                  {team[0].name}
                </h3>
                <div className="mx-2 h-6 w-1 bg-blue-600"></div>
                <p className="text-xl font-bold text-slate-800">
                  Sanghos
                </p>
              </div>
              
              {/* Button with border only */}
              <div className="mt-3">
                <button className="border border-slate-700 text-slate-700 px-6 py-2 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors">
                  Connect
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
