
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
          {/* Compact card with image on left (1/3 width) and content on right (2/3 width) */}
          <Card className="max-w-md w-full flex overflow-hidden rounded-xl shadow-md">
            {/* Left side - Image */}
            <div className="w-1/3">
              <img 
                src={team[0].image} 
                alt={team[0].name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Right side - Content */}
            <div className="w-2/3 p-6 flex flex-col justify-between">
              <div>
                {/* Small uppercase "Founder" label */}
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  {team[0].role}
                </p>
                
                {/* Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {team[0].name}
                </h3>
                
                {/* Bio text */}
                <p className="text-gray-600 text-sm">
                  {team[0].bio}
                </p>
              </div>
              
              {/* Blue connect button at bottom */}
              <div className="mt-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
                  Connect
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
