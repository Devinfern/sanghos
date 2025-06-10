
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const WellnessCommunityTeaser = () => {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Enhanced background with gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark/95 to-slate-900"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-brand-primary/30 blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-brand-peach/40 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-brand-sky/20 blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>
      
      <div className="container px-6 md:px-8 mx-auto relative z-10">
        {/* Enhanced header section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto mb-20"
        >
          {/* Decorative element */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Sparkles className="h-4 w-4 text-brand-peach" />
              <span className="text-sm font-medium text-white/90 tracking-wide">Discover Your Sanctuary</span>
              <Heart className="h-4 w-4 text-brand-primary" />
            </div>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-light leading-[0.9] text-center">
            <span className="block mb-4">Finding <span className="text-brand-peach italic">sanctuary</span></span>
            <span className="block mb-4">in the present moment.</span>
            <span className="block mb-4">Creating <span className="text-brand-peach italic">space</span></span>
            <span className="block mb-4">for mindfulness.</span>
            <span className="block mb-4">Connecting with</span>
            <span className="block mb-4"><span className="text-brand-peach italic">yourself</span> and others.</span>
            <span className="block text-brand-primary font-medium">This is <em>Sanghos</em>.</span>
          </h2>
        </motion.div>

        {/* Enhanced content grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left column - Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Enhanced text blocks */}
              <div className="space-y-6 text-lg md:text-xl font-light leading-relaxed">
                <p className="text-white/90 backdrop-blur-sm">
                  Sanghos creates transformative daylong wellness retreats in unique, private spaces. 
                  We believe that wellness shouldn't require weeks away or expensive travel—it can be 
                  found right in your community, led by expert instructors who bring authentic practice 
                  and deep knowledge.
                </p>
                <p className="text-white/80">
                  Each Sanghos retreat offers an opportunity to step away from daily routines, connect 
                  with like-minded individuals, and immerse yourself in practices that nourish both 
                  body and mind—all in beautiful, intimate settings that feel worlds away from ordinary life.
                </p>
              </div>

              {/* Decorative divider */}
              <div className="flex items-center space-x-4 my-8">
                <div className="h-px bg-gradient-to-r from-transparent via-brand-peach/50 to-transparent flex-1"></div>
                <div className="w-2 h-2 rounded-full bg-brand-peach/60"></div>
                <div className="h-px bg-gradient-to-r from-transparent via-brand-peach/50 to-transparent flex-1"></div>
              </div>
            </motion.div>

            {/* Right column - CTA section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              {/* Enhanced card design */}
              <div className="relative">
                {/* Glass morphism background */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl"></div>
                
                <div className="relative p-8 md:p-10 space-y-8">
                  {/* Header with enhanced styling */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-px bg-brand-primary"></div>
                      <span className="text-sm font-semibold text-brand-primary uppercase tracking-widest">We Are Sanghos</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-playfair font-light leading-tight text-white">
                      WE BELIEVE WELLNESS CAN INSPIRE 
                      <span className="block text-brand-peach italic">TRANSFORMATION</span>
                      <span className="block">ANYTIME, ANYWHERE.</span>
                    </h3>
                  </div>
                  
                  <p className="text-lg text-white/80 leading-relaxed">
                    At Sanghos, we are committed to bringing balance and joy to your life. 
                    We offer a broad range of retreats and a supportive community for every level. 
                    It's time to invite more meaning and calm to your daily routine.
                  </p>
                  
                  {/* Enhanced button */}
                  <div className="pt-4">
                    <Button 
                      asChild 
                      size="lg" 
                      className="group relative bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-brand-primary/50 hover:border-brand-primary"
                    >
                      <Link to="/community" className="flex items-center space-x-3">
                        <span>Join Our Community</span>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Subtle glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary/20 via-brand-peach/20 to-brand-primary/20 rounded-3xl blur opacity-50"></div>
              </div>

              {/* Additional decorative elements */}
              <div className="flex justify-center">
                <div className="flex space-x-3">
                  <div className="w-2 h-2 rounded-full bg-brand-primary/60 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-brand-peach/60 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-brand-sky/60 animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
    </section>
  );
};

export default WellnessCommunityTeaser;
