
import { useState } from "react";
import WellnessJournal from "./WellnessJournal";
import { Button } from "@/components/ui/button";
import { PenLine, ArrowRight, Sparkles } from "lucide-react";

export default function AIWellnessSection() {
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  
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
            AI-Powered Retreat Matching
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sage-900 leading-tight">
            Find Your Perfect Retreat Experience
          </h2>
          
          <p className="text-lg md:text-xl text-sage-700 max-w-2xl mx-auto">
            Our AI analyzes your wellness goals and preferences to recommend the ideal retreat experience for your journey
          </p>
          
          {!isJournalOpen ? (
            <Button 
              onClick={() => setIsJournalOpen(true)}
              size="lg" 
              className="bg-sage-700 hover:bg-sage-800 text-white group shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Your Wellness Journey
              <PenLine className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          ) : (
            <Button 
              onClick={() => setIsJournalOpen(false)}
              variant="outline" 
              size="sm"
              className="mb-4"
            >
              Close Journal
            </Button>
          )}
        </div>
        
        {isJournalOpen ? (
          <div className="max-w-3xl mx-auto mt-8">
            <WellnessJournal />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-sage-50/50 to-sage-100/50 rounded-2xl transform transition-transform group-hover:-translate-y-1"></div>
              <div className="relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-sage-200/50 shadow-sm hover:shadow-md transition-all">
                <div className="bg-sage-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-sage-700 font-semibold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-sage-900">Express</h3>
                <p className="text-sage-700">Share your wellness goals and preferences in our private AI journal</p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-sage-50/50 to-sage-100/50 rounded-2xl transform transition-transform group-hover:-translate-y-1"></div>
              <div className="relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-sage-200/50 shadow-sm hover:shadow-md transition-all">
                <div className="bg-sage-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-sage-700 font-semibold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-sage-900">Match</h3>
                <p className="text-sage-700">Our AI analyzes your needs to find your ideal retreat experience</p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-sage-50/50 to-sage-100/50 rounded-2xl transform transition-transform group-hover:-translate-y-1"></div>
              <div className="relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-sage-200/50 shadow-sm hover:shadow-md transition-all">
                <div className="bg-sage-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-sage-700 font-semibold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-sage-900">Transform</h3>
                <p className="text-sage-700">Begin your wellness journey with a perfectly matched retreat</p>
              </div>
            </div>
          </div>
        )}
        
        {!isJournalOpen && (
          <div className="text-center mt-12">
            <Button
              onClick={() => setIsJournalOpen(true)}
              variant="outline"
              className="border-sage-300 text-sage-700 hover:bg-sage-50 hover:text-sage-800 group"
            >
              Begin Your Wellness Analysis
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
