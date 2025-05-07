
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Compass, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import WellnessJournal from "@/components/WellnessJournal";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface FeatureRetreatFinderProps {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

const FeatureRetreatFinder = ({
  badge = "AI-Powered Matching",
  heading = "Find Your Perfect Wellness Journey",
  description = "Share your thoughts and let our AI guide you to transformative retreat experiences.",
  tabs = [{
    value: "express",
    icon: <Heart className="h-auto w-4 shrink-0" />,
    label: "Express Yourself",
    content: {
      badge: "Wellness Journal",
      title: "Share your wellness aspirations",
      description: "Through our intuitive journaling process, share your thoughts, goals, and desires for your wellness journey. Our AI listens and understands your unique needs.",
      buttonText: "Start Journaling",
      imageSrc: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      imageAlt: "Peaceful nature scene representing wellness journey"
    }
  }, {
    value: "match",
    icon: <Compass className="h-auto w-4 shrink-0" />,
    label: "Find Your Match",
    content: {
      badge: "AI Analysis",
      title: "Discover your ideal retreat",
      description: "Our advanced AI analyzes your journal entry to match you with retreats that align perfectly with your wellness goals and personal preferences.",
      buttonText: "View Matches",
      imageSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      imageAlt: "Serene retreat location"
    }
  }, {
    value: "transform",
    icon: <Sparkles className="h-auto w-4 shrink-0" />,
    label: "Transform",
    content: {
      badge: "Your Journey",
      title: "Begin your transformation",
      description: "Embark on a carefully curated wellness experience that speaks to your soul. Each retreat is handpicked to ensure it meets your unique needs and aspirations.",
      buttonText: "Start Your Journey",
      imageSrc: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      imageAlt: "Transformative retreat experience"
    }
  }]
}: FeatureRetreatFinderProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  
  const handleTabChange = (value: string) => {
    if (value !== activeTab && !isTransitioning) {
      setIsTransitioning(true);
      setActiveTab(value);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }
  };
  
  const handleButtonClick = () => {
    // Navigate to the wellness journal page
    navigate("/wellness-journal");
  };
  
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-sage-50 via-sage-100/50 to-sage-50"></div>
      
      <div className="container mx-auto relative my-[50px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge 
            variant="outline" 
            className="inline-flex items-center justify-center p-1.5 px-3 rounded-full bg-brand-primary/20 text-brand-primary text-sm font-medium mb-4"
          >
            AI-Powered Wellness
          </Badge>
          
          <h2 className="max-w-2xl text-3xl font-semibold md:text-4xl text-sage-900">
            {heading}
          </h2>
          <p className="text-sage-700 max-w-2xl">{description}</p>
        </div>
        
        <Tabs 
          defaultValue={tabs[0].value} 
          value={activeTab}
          onValueChange={handleTabChange}
          className="mt-12"
        >
          <TabsList className="container flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10 bg-transparent">
            {tabs.map(tab => (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value} 
                disabled={isTransitioning}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-sage-600 data-[state=active]:bg-sage-100 data-[state=active]:text-sage-900 transition-all duration-300"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="mx-auto mt-8 max-w-screen-xl rounded-2xl bg-white/80 backdrop-blur-sm p-6 lg:p-16 shadow-lg border border-sage-200/50">
            <AnimatePresence mode="wait">
              {tabs.map(tab => (
                <TabsContent 
                  key={tab.value} 
                  value={tab.value} 
                  className="space-y-12"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10"
                  >
                    <div className="flex flex-col gap-5">
                      <Badge variant="outline" className="w-fit bg-sage-50 text-sage-700 border-sage-200">
                        {tab.content.badge}
                      </Badge>
                      <h3 className="text-3xl font-semibold lg:text-4xl text-sage-900">
                        {tab.content.title}
                      </h3>
                      <p className="text-sage-700 lg:text-lg">
                        {tab.content.description}
                      </p>
                      <Button className="mt-2.5 w-fit gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white" size="lg" onClick={handleButtonClick}>
                        {tab.content.buttonText}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                    <motion.img 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      src={tab.content.imageSrc} 
                      alt={tab.content.imageAlt} 
                      className="rounded-xl shadow-lg w-full h-[400px] object-cover" 
                    />
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { FeatureRetreatFinder };
