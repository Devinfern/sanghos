
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomeCommunitySection = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("sanghos_user") !== null;

  const handleCommunityClick = () => {
    if (isLoggedIn) {
      navigate('/community');
    } else {
      navigate('/join');
    }
  };

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Background subtle shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute h-96 w-96 rounded-full bg-brand-primary/20 top-20 right-20 blur-3xl"></div>
        <div className="absolute h-96 w-96 rounded-full bg-brand-peach/20 -bottom-20 -left-20 blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-wider text-[#D2EF9A] font-semibold">
              Get Involved
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mt-4 mb-8 text-white leading-tight">
              Let's Change Wellness, For Good
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-white">Partnerships</h3>
                <p className="text-white/80 mb-6">
                  Want to help shape the future of wellness? Partner with us to create meaningful experiences.
                </p>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 font-medium group"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-[#D2EF9A]/10 backdrop-blur-sm rounded-2xl overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-white">Become a Host</h3>
                <p className="text-white/80 mb-6">
                  Share your space and join our community of hosts offering transformative retreat venues.
                </p>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 font-medium group"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-white">Teach With Us</h3>
                <p className="text-white/80 mb-6">
                  Are you a wellness practitioner? Join our instructor community and share your expertise.
                </p>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 font-medium group"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-16 text-center">
            <Button 
              size="lg" 
              className="bg-[#D2EF9A] text-brand-dark hover:bg-[#C2E280] group rounded-full"
              onClick={handleCommunityClick}
            >
              Join Our Community
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCommunitySection;
