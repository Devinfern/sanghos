
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WellnessCommunityTeaser = () => {
  return (
    <section className="py-24 md:py-32 bg-sage-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            className="space-y-8 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-brand-primary">We Are Sanghos</h3>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-light leading-tight tracking-tight text-sage-900">
                WE BELIEVE WELLNESS CAN INSPIRE TRANSFORMATION, ANYTIME, ANYWHERE.
              </h2>
            </div>
            
            <p className="text-lg text-sage-700 leading-relaxed mx-auto">
              At Sanghos, we are committed to bringing balance and joy to your life. 
              We offer a broad range of retreats and a supportive community for every level. 
              It's time to invite more meaning and calm to your daily routine.
            </p>
            
            <Button 
              asChild 
              variant="ghost" 
              size="lg" 
              className="group text-brand-primary hover:text-brand-primary/90 hover:bg-transparent p-0 mx-auto"
            >
              <Link to="/community" className="flex items-center space-x-2">
                <span className="text-lg">Join Our Community</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WellnessCommunityTeaser;
