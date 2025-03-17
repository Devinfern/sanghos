
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";

interface TeamSectionProps {
  isLoaded: boolean;
}

const TeamSection = ({ isLoaded }: TeamSectionProps) => {
  const fadeIn = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const staggerChildren = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const team = [{
    name: "Devin Fernandez",
    role: "Founder",
    image: "/lovable-uploads/f1e50ebf-84dd-47ec-9f51-e4ef3f49b992.png",
    bio: "Devin's 10+ years of meditation revealed the need for a more seamless retreat experience. This insight sparked the creation of Sanghos, aimed at making transformative journeys more attainable."
  }];

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
          <div className="max-w-sm w-full bg-[#F5F5F5] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            {/* Image container taking full width */}
            <div className="w-full overflow-hidden">
              <img 
                src={team[0].image} 
                alt={team[0].name} 
                className="w-full h-80 object-cover transition-transform duration-500 hover:scale-105" 
              />
            </div>
            
            {/* Content section with improved spacing and typography */}
            <div className="p-8">
              {/* Role label */}
              <p className="text-base text-slate-700 mb-2">
                {team[0].role}
              </p>
              
              {/* Name in larger bold text */}
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {team[0].name}
              </h3>
              
              {/* Bio text */}
              <p className="text-slate-700 mb-6">
                {team[0].bio}
              </p>
              
              {/* Social buttons */}
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full border-slate-300 hover:bg-slate-100 hover:border-slate-400"
                >
                  <Linkedin className="h-5 w-5 text-slate-700" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full border-slate-300 hover:bg-slate-100 hover:border-slate-400"
                >
                  <Mail className="h-5 w-5 text-slate-700" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
