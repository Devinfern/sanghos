
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
    <section className="py-24 bg-brand-primary/5">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn} className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-brand-primary font-semibold">Get Involved</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-8 text-brand-dark">Let's Enhance Access To Wellness</h2>
          <p className="text-xl text-brand-slate max-w-3xl mx-auto">
            Join our community and be part of the movement
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: 0.2, duration: 0.6 }} className="bg-brand-subtle/20 rounded-3xl overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-brand-dark">Partnerships</h3>
              <p className="text-brand-slate mb-6">
                Want to help shape the future of wellness? Partner with us to create meaningful experiences.
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-brand-subtle/30 rounded-full">
                <span className="text-sm font-medium text-brand-slate">Coming Soon</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: 0.3, duration: 0.6 }} className="bg-brand-primary/10 rounded-3xl overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-brand-dark">Become a Host</h3>
              <p className="text-brand-slate mb-6">
                Share your space and join our community of hosts offering transformative retreat venues.
              </p>
              <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary/5 font-medium group rounded-full" asChild>
                <Link to="/become-host">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: 0.4, duration: 0.6 }} className="bg-brand-peach/10 rounded-3xl overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-brand-dark">Teach With Us</h3>
              <p className="text-brand-slate mb-6">
                Are you a wellness practitioner? Join our instructor community and share your expertise.
              </p>
              <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary/5 font-medium group rounded-full" asChild>
                <Link to="/teach-with-us">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JoinCTA;
