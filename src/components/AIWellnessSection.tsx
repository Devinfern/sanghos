
import { useState } from "react";
import WellnessJournal from "./WellnessJournal";
import { Button } from "@/components/ui/button";
import { PenLine, ArrowRight } from "lucide-react";

export default function AIWellnessSection() {
  const [isJournalOpen, setIsJournalOpen] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-brand-subtle/10">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark">
            Find Your Perfect Retreat
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Our AI-powered wellness journal analyzes your current state and recommends the perfect retreat for your journey
          </p>
          
          {!isJournalOpen ? (
            <Button 
              onClick={() => setIsJournalOpen(true)}
              size="lg" 
              className="bg-brand-primary hover:bg-brand-primary/90 group"
            >
              Start Your Journal Entry
              <PenLine className="ml-2 h-4 w-4" />
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
        
        {isJournalOpen && (
          <div className="max-w-3xl mx-auto">
            <WellnessJournal />
          </div>
        )}
        
        {!isJournalOpen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-brand-subtle/30">
              <div className="bg-brand-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-primary font-semibold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Write</h3>
              <p className="text-muted-foreground">Express your feelings and wellness goals in your private journal entry</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-brand-subtle/30">
              <div className="bg-brand-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-primary font-semibold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Analyze</h3>
              <p className="text-muted-foreground">Our AI analyzes your needs and matches them with the perfect retreat experience</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-brand-subtle/30">
              <div className="bg-brand-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-primary font-semibold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover</h3>
              <p className="text-muted-foreground">Find the ideal retreat that aligns with your current wellness journey</p>
            </div>
          </div>
        )}
        
        {!isJournalOpen && (
          <div className="text-center mt-10">
            <Button
              onClick={() => setIsJournalOpen(true)}
              variant="outline"
              className="border-brand-primary text-brand-primary hover:bg-brand-primary/5"
            >
              Start Your Wellness Analysis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
