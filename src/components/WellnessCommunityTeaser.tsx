
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WellnessCommunityTeaser = () => {
  return (
    <section className="py-24 md:py-32 bg-brand-dark text-white overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-brand-primary blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-brand-peach blur-3xl"></div>
      </div>
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-light leading-tight">
            Finding <span className="text-brand-peach">sanctuary</span> in the present moment. 
            Creating <span className="text-brand-peach">space</span> for mindfulness. 
            Connecting with <span className="text-brand-peach">yourself</span> and others. 
            This is <span className="text-brand-primary">Sanghos</span>.
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-16">
          <div className="flex-1 text-lg md:text-xl font-light leading-relaxed space-y-6 text-white/90">
            <p>
              Sanghos creates transformative daylong wellness retreats in unique, private spaces. 
              We believe that wellness shouldn't require weeks away or expensive travel—it can be 
              found right in your community, led by expert instructors who bring authentic practice 
              and deep knowledge.
            </p>
            <p>
              Each Sanghos retreat offers an opportunity to step away from daily routines, connect 
              with like-minded individuals, and immerse yourself in practices that nourish both 
              body and mind—all in beautiful, intimate settings that feel worlds away from ordinary life.
            </p>
          </div>

          <motion.div
            className="flex-1 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-brand-primary">We Are Sanghos</h3>
              <h2 className="text-3xl md:text-4xl font-playfair font-light leading-tight tracking-tight text-white">
                WE BELIEVE WELLNESS CAN INSPIRE TRANSFORMATION, ANYTIME, ANYWHERE.
              </h2>
            </div>
            
            <p className="text-lg text-white/80 leading-relaxed">
              At Sanghos, we are committed to bringing balance and joy to your life. 
              We offer a broad range of retreats and a supportive community for every level. 
              It's time to invite more meaning and calm to your daily routine.
            </p>
            
            <Button 
              asChild 
              variant="default" 
              size="lg" 
              className="group bg-brand-primary hover:bg-brand-primary/90 text-white"
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
