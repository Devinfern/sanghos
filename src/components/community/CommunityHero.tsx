
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CommunityHero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-gradient-to-b from-brand-subtle/5 to-transparent">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container px-4 py-12"
      >
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-dark">
            Sanghos Community
          </h1>
          <p className="text-md md:text-lg text-brand-slate/80 leading-relaxed max-w-xl mx-auto">
            Connect, share insights, and grow together in our mindful community
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {!localStorage.getItem("sanghos_user") && (
              <Button 
                onClick={() => navigate("/join")} 
                className="bg-brand-primary hover:bg-brand-primary/90 rounded-full"
              >
                Join Community
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            )}
            <Button 
              variant="outline"
              onClick={() => navigate("/retreats")}
              className="border-brand-primary/50 text-brand-primary hover:bg-brand-primary/5 rounded-full"
            >
              Explore Retreats
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CommunityHero;
