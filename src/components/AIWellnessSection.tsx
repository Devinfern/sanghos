
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PenLine, ArrowRight, Sparkles, BookOpen, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function AIWellnessSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-50 via-sage-100/50 to-sage-50"></div>
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-sage-200/20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-sage-200/30 translate-x-1/4 translate-y-1/4"></div>
      
      <div className="container relative px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center p-1.5 px-3 rounded-full bg-sage-100 text-sage-800 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Wellness Recommendations
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sage-900 leading-tight">
            Journal Your Way to Wellness
          </h2>
          
          <p className="text-lg md:text-xl text-sage-700 max-w-2xl mx-auto">
            Express yourself through journaling and let our AI recommend personalized retreat experiences and local wellness events that match your needs
          </p>
          
          <Button 
            asChild
            size="lg" 
            className="bg-sage-700 hover:bg-sage-800 text-white group shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link to="/wellness-journal">
              Start Your Wellness Journal
              <PenLine className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16">
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-sage-50/50 to-sage-100/50 rounded-2xl transform transition-transform group-hover:-translate-y-1"></div>
            <div className="relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-sage-200/50 shadow-sm hover:shadow-md transition-all">
              <div className="bg-sage-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="text-sage-700 h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-sage-900">Journal</h3>
              <p className="text-sage-700">Express your thoughts, feelings, and wellness goals in our interactive journal</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-sage-50/50 to-sage-100/50 rounded-2xl transform transition-transform group-hover:-translate-y-1"></div>
            <div className="relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-sage-200/50 shadow-sm hover:shadow-md transition-all">
              <div className="bg-sage-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="text-sage-700 h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-sage-900">AI Analysis</h3>
              <p className="text-sage-700">Our AI understands your needs from your journal entries to create personalized recommendations</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-sage-50/50 to-sage-100/50 rounded-2xl transform transition-transform group-hover:-translate-y-1"></div>
            <div className="relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-sage-200/50 shadow-sm hover:shadow-md transition-all">
              <div className="bg-sage-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MapPin className="text-sage-700 h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-sage-900">Find Events</h3>
              <p className="text-sage-700">Discover retreats and local wellness events perfectly matched to your wellness journey</p>
            </div>
          </motion.div>
        </div>
        
        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            className="border-sage-300 text-sage-700 hover:bg-sage-50 hover:text-sage-800 group"
          >
            <Link to="/wellness-journal">
              Begin Your Wellness Journey
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
