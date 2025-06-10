
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BackButton = () => {
  return (
    <div className="absolute top-28 left-6 z-20">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button asChild variant="ghost" size="sm" className="group bg-white/90 backdrop-blur-sm hover:bg-white">
          <Link to="/retreats">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to All Retreats
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default BackButton;
