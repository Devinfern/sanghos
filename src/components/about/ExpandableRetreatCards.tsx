
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OptimizedImage from "@/components/OptimizedImage";
import { Clock, Users, Star, Heart, ArrowRight, X } from "lucide-react";

interface ExpandableRetreatCardsProps {
  isLoaded: boolean;
}

const ExpandableRetreatCards = ({ isLoaded }: ExpandableRetreatCardsProps) => {
  const [selectedRetreat, setSelectedRetreat] = useState(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Enhanced retreat types with detailed content
  const retreatTypes = [{
    id: 1,
    title: "Breathwork",
    description: "Experience transformative breathing techniques to release tension, boost energy, and find inner calm.",
    image: "/lovable-uploads/d3e397b5-0ff3-412e-b6ce-537617953355.png",
    detailedContent: {
      overview: "Breathwork is a powerful practice that uses conscious breathing techniques to promote physical, mental, and emotional healing. Our breathwork retreats combine ancient wisdom with modern understanding to create transformative experiences.",
      benefits: [
        "Reduces stress and anxiety naturally",
        "Increases energy and mental clarity",
        "Releases emotional blockages and trauma",
        "Enhances immune system function",
        "Improves sleep quality and relaxation",
        "Develops greater self-awareness"
      ],
      whatToExpect: [
        "Guided breathing sessions with expert facilitators",
        "Integration circles for sharing and reflection",
        "Movement and somatic practices",
        "Meditation and mindfulness exercises",
        "Nutritious meals and herbal teas",
        "Take-home practices for daily life"
      ],
      duration: "6-8 hours",
      groupSize: "8-12 participants",
      difficulty: "All levels welcome"
    }
  }, {
    id: 2,
    title: "Silent Meditation",
    description: "Discover the power of silence in a supportive environment to deepen mindfulness and self-awareness.",
    image: "/lovable-uploads/dc289f39-f518-4603-88f5-b92a074c6949.png",
    detailedContent: {
      overview: "Silent meditation retreats offer a profound opportunity to step away from the noise of daily life and connect with your inner wisdom. Through guided silence, participants experience deep states of peace and clarity.",
      benefits: [
        "Develops sustained attention and focus",
        "Cultivates inner peace and equanimity",
        "Reduces mental chatter and overthinking",
        "Enhances emotional regulation",
        "Deepens spiritual connection",
        "Improves overall well-being"
      ],
      whatToExpect: [
        "Periods of silent sitting meditation",
        "Walking meditation in nature",
        "Gentle yoga and stretching",
        "Dharma talks and teachings",
        "One-on-one guidance sessions",
        "Mindful meals in silence"
      ],
      duration: "8-10 hours",
      groupSize: "6-10 participants",
      difficulty: "Beginner to advanced"
    }
  }, {
    id: 3,
    title: "Somatic Healing",
    description: "Integrate body-based healing approaches with therapeutic practices for holistic emotional wellbeing.",
    image: "/lovable-uploads/c664e811-a15f-43cf-b260-d4f59fdb6e80.png",
    detailedContent: {
      overview: "Somatic healing recognizes that trauma and stress are stored in the body. Our retreats use gentle, body-based approaches to help participants release tension, heal old wounds, and restore natural vitality.",
      benefits: [
        "Releases stored trauma and tension",
        "Improves body awareness and connection",
        "Enhances emotional resilience",
        "Reduces chronic pain and inflammation",
        "Restores nervous system balance",
        "Develops healthy boundaries"
      ],
      whatToExpect: [
        "Somatic experiencing exercises",
        "Trauma-informed movement practices",
        "Breathwork and grounding techniques",
        "Gentle touch and massage therapy",
        "Art and expressive therapies",
        "Integration and self-care planning"
      ],
      duration: "7-9 hours",
      groupSize: "6-8 participants",
      difficulty: "All levels, trauma-sensitive"
    }
  }];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn} className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-brand-primary font-semibold">Explore</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-8 text-brand-dark">
            Retreat Experiences
          </h2>
          <p className="text-xl text-brand-slate max-w-3xl mx-auto">
            Discover transformative experiences tailored to your wellness journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Retreat Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {retreatTypes.map((type, index) => {
                const MotionCard = motion(Card);
                
                return (
                  <MotionCard 
                    key={type.id} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} 
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }} 
                    className="overflow-hidden bg-white border-0 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <OptimizedImage 
                        src={type.image} 
                        alt={type.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-brand-dark">{type.title}</h3>
                      <p className="text-brand-slate text-sm mb-4 line-clamp-3">{type.description}</p>
                      
                      <Button 
                        variant="outline" 
                        className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 font-medium rounded-full w-full"
                        onClick={() => setSelectedRetreat(type)}
                      >
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </MotionCard>
                );
              })}
            </div>
          </div>

          {/* Right Panel - Detail View */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {selectedRetreat ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-3xl shadow-lg border p-6 h-fit"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-brand-dark">{selectedRetreat.title}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedRetreat(null)}
                      className="h-8 w-8 p-0 hover:bg-brand-primary/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{selectedRetreat.detailedContent.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{selectedRetreat.detailedContent.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>{selectedRetreat.detailedContent.difficulty}</span>
                    </div>
                  </div>

                  {/* Tabbed Content */}
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                      <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                      <TabsTrigger value="benefits" className="text-xs">Benefits</TabsTrigger>
                      <TabsTrigger value="expect" className="text-xs">What to Expect</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-900">About This Experience</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {selectedRetreat.detailedContent.overview}
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="benefits" className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 flex items-center gap-2">
                          <Heart className="h-4 w-4 text-brand-primary" />
                          Key Benefits
                        </h4>
                        <ul className="space-y-2">
                          {selectedRetreat.detailedContent.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0"></div>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="expect" className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900 flex items-center gap-2">
                          <Star className="h-4 w-4 text-brand-peach" />
                          What to Expect
                        </h4>
                        <ul className="space-y-2">
                          {selectedRetreat.detailedContent.whatToExpect.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-brand-peach mt-1.5 flex-shrink-0"></div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-gray-100">
                    <Button 
                      size="sm" 
                      className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-2 rounded-full font-medium"
                    >
                      Book Your Retreat
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/5 px-6 py-2 rounded-full font-medium"
                    >
                      View Schedule
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-50 rounded-3xl p-8 text-center h-96 flex items-center justify-center"
                >
                  <div>
                    <Heart className="h-12 w-12 text-brand-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-brand-dark mb-2">Select a Retreat</h3>
                    <p className="text-brand-slate">Click "Learn More" on any retreat card to view detailed information here.</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpandableRetreatCards;
