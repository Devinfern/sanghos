
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface JoinCTAProps {
  isLoaded: boolean;
}

const JoinCTA = ({ isLoaded }: JoinCTAProps) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-dark z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute w-full h-full overflow-hidden z-0">
        <div className="absolute -right-20 top-20 w-72 h-72 bg-brand-primary/30 rounded-full blur-xl"></div>
        <div className="absolute -left-20 bottom-20 w-80 h-80 bg-brand-peach/20 rounded-full blur-xl"></div>
      </div>
      
      <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Join Our Community</h2>
          <p className="text-xl mb-10 text-white/80">
            Whether you're seeking mindful experiences, looking to share your expertise as an instructor, or have a unique space to host retreats, we'd love to welcome you to the Sanghos community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-brand-dark hover:bg-white/90 group"
              asChild
            >
              <a href="/signup">
                Join as a Member
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white hover:bg-white/10 text-white group"
              asChild
            >
              <a href="/host/register">
                Become a Host
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinCTA;
