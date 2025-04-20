
import { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, MapPin, UserCheck, Calendar, Sunrise } from "lucide-react";
import { FeatureRetreatFinder } from "./ui/feature-retreat-finder";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const AIWellnessSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-50 to-sage-100 -z-10"></div>
      <div className="absolute inset-0 opacity-5 bg-pattern -z-10"></div>
      
      <div className="container px-4 md:px-6">
        <div className="mb-12 md:mb-16 max-w-3xl mx-auto text-center">
          <Badge 
            variant="outline" 
            className="mb-3 bg-brand-primary/10 text-brand-primary border-brand-primary/20 px-3 py-1"
          >
            AI-Powered Wellness
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-sage-900">
            Find Your Perfect <span className="text-brand-primary">Wellness Experience</span>
          </h2>
          
          <p className="text-muted-foreground text-lg">
            Discover personalized wellness events and retreats tailored to your preferences, 
            location, and schedule using our advanced recommendation system.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-sage-100">
              <h3 className="text-xl font-semibold mb-4">How It Works</h3>
              
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Share Your Location</h4>
                    <p className="text-sm text-muted-foreground">
                      Tell us where you are or where you'd like to find wellness events
                    </p>
                  </div>
                </li>
                
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Set Your Availability</h4>
                    <p className="text-sm text-muted-foreground">
                      Select dates and times that work best with your schedule
                    </p>
                  </div>
                </li>
                
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    <UserCheck className="h-4 w-4 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Choose Your Interests</h4>
                    <p className="text-sm text-muted-foreground">
                      Tell us what kind of wellness experiences you enjoy
                    </p>
                  </div>
                </li>
                
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    <Sunrise className="h-4 w-4 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Get Personalized Recommendations</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive curated recommendations tailored just for you
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-br from-brand-primary to-brand-primary/80 rounded-xl p-6 text-white shadow-md"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Globe className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold">Your Wellness Journey</h3>
              </div>
              
              <p className="mb-4">
                Use our wellness journal to track your progress, set wellness goals, and receive even 
                more personalized event recommendations based on your wellness journey.
              </p>
              
              <Button 
                asChild
                variant="secondary" 
                className="w-full bg-white hover:bg-white/90 text-brand-primary"
              >
                <Link to="/wellness-journal" className="flex items-center justify-center">
                  Open Wellness Journal
                  <motion.div
                    animate={isHovered ? { x: 5 } : { x: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-sage-200/50 p-4 md:p-6 h-full">
              <FeatureRetreatFinder />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIWellnessSection;
