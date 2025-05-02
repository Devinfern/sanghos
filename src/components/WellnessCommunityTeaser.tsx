
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WellnessCommunityTeaser = () => {
  return (
    <section className="py-24 md:py-32 bg-sage-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Image grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-5 relative">
            {/* Top left image */}
            <motion.div 
              className="aspect-[4/3] overflow-hidden rounded-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <img 
                src="/lovable-uploads/ec781cb4-24a1-464c-b587-a8d64d925b1f.png" 
                alt="Hands joining in community" 
                className="w-full h-full object-cover" 
              />
            </motion.div>
            
            {/* Top right image */}
            <motion.div 
              className="aspect-[3/4] overflow-hidden rounded-md mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?q=80&w=1470&auto=format&fit=crop" 
                alt="Woman in yoga pose" 
                className="w-full h-full object-cover" 
              />
            </motion.div>
            
            {/* Bottom left image */}
            <motion.div 
              className="aspect-[1/1] overflow-hidden rounded-md relative top-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1535007829477-3f27db7df452?q=80&w=1074&auto=format&fit=crop" 
                alt="Yoga practitioner in side pose" 
                className="w-full h-full object-cover" 
              />
            </motion.div>
            
            {/* Bottom right image */}
            <motion.div 
              className="aspect-[4/3] overflow-hidden rounded-md relative -top-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1520&auto=format&fit=crop" 
                alt="Meditation pose" 
                className="w-full h-full object-cover" 
              />
            </motion.div>
          </div>
          
          {/* Content */}
          <div className="lg:col-span-5">
            <motion.div
              className="space-y-8"
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
              
              <p className="text-lg text-sage-700 leading-relaxed max-w-2xl">
                At Sanghos, we are committed to bringing balance and joy to your life. 
                We offer a broad range of retreats and a supportive community for every level. 
                It's time to invite more meaning and calm to your daily routine.
              </p>
              
              <Button 
                asChild 
                variant="ghost" 
                size="lg" 
                className="group text-brand-primary hover:text-brand-primary/90 hover:bg-transparent p-0"
              >
                <Link to="/community" className="flex items-center space-x-2">
                  <span className="text-lg">Join Our Community</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WellnessCommunityTeaser;
