
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
      <div className="absolute inset-0 bg-gradient-to-r from-sage-100 to-sand-100 z-0"></div>
      <div className="absolute -right-20 top-20 w-72 h-72 bg-sage-200 rounded-full opacity-30 z-0"></div>
      <div className="absolute -left-20 bottom-20 w-80 h-80 bg-sand-200 rounded-full opacity-30 z-0"></div>
      
      <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-muted-foreground mb-10">
            Whether you're seeking mindful experiences, looking to share your expertise as an instructor, or have a unique space to host retreats, we'd love to welcome you to the Sanghos community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/signup">Join as a Member</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/host/register">Become a Host</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinCTA;
