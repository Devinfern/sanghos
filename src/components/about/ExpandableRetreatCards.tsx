
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import OptimizedImage from "@/components/OptimizedImage";
import { Clock, Users, Star, Heart, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

interface ExpandableRetreatCardsProps {
  isLoaded: boolean;
}

const ExpandableRetreatCards = ({ isLoaded }: ExpandableRetreatCardsProps) => {
  const [expandedRetreat, setExpandedRetreat] = useState(null);
  const cardRefs = useRef({});

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
      whatToExpected: [
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
      whatToExpected: [
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

  const toggleExpanded = (retreatId) => {
    // Store current card position before toggling
    const currentCard = cardRefs.current[retreatId];
    const wasExpanded = expandedRetreat === retreatId;
    
    if (currentCard && !wasExpanded) {
      // Store the card's current position
      const cardRect = currentCard.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const cardTopPosition = cardRect.top + scrollTop;
      
      // Toggle the expansion
      setExpandedRetreat(expandedRetreat === retreatId ? null : retreatId);
      
      // After expansion animation, scroll to maintain position
      setTimeout(() => {
        const offsetFromTop = 100; // Add some padding from top
        window.scrollTo({
          top: cardTopPosition - offsetFromTop,
          behavior: 'smooth'
        });
      }, 300); // Match the animation duration
    } else {
      // Just toggle if collapsing
      setExpandedRetreat(expandedRetreat === retreatId ? null : retreatId);
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn} className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-brand-primary font-semibold">Explore</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-8 text-brand-dark">
            Retreat Experiences
          </h2>
          <p className="text-xl text-brand-slate max-w-3xl mx-auto">
            Discover transformative experiences tailored to your wellness journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {retreatTypes.map((type, index) => {
            const MotionCard = motion(Card);
            const isExpanded = expandedRetreat === type.id;
            
            return (
              <MotionCard 
                key={type.id} 
                ref={(el) => cardRefs.current[type.id] = el}
                initial={{ opacity: 0, y: 20 }} 
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} 
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }} 
                className={`overflow-hidden bg-white border-0 rounded-3xl shadow-md hover:shadow-lg transition-all duration-500 ${
                  isExpanded ? 'md:col-span-3' : ''
                }`}
              >
                <motion.div
                  layout
                  className={`${isExpanded ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : ''}`}
                >
                  <div className={`${isExpanded ? '' : 'flex flex-col'}`}>
                    <div className="relative h-64 overflow-hidden">
                      <OptimizedImage 
                        src={type.image} 
                        alt={type.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                    </div>
                    
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-2 text-brand-dark">{type.title}</h3>
                      <p className="text-brand-slate text-lg mb-6">{type.description}</p>
                      
                      <Button 
                        variant="outline" 
                        className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 font-medium rounded-full w-full"
                        onClick={() => toggleExpanded(type.id)}
                      >
                        {isExpanded ? (
                          <>
                            Show Less
                            <ChevronUp className="h-4 w-4 ml-2" />
                          </>
                        ) : (
                          <>
                            Learn More
                            <ChevronDown className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.5 }}
                      className="p-8 bg-brand-subtle/5"
                    >
                      {/* Header with stats */}
                      <div className="mb-6">
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{type.detailedContent.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{type.detailedContent.groupSize}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            <span>{type.detailedContent.difficulty}</span>
                          </div>
                        </div>
                      </div>

                      {/* Overview */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-3 text-gray-900">About This Experience</h4>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {type.detailedContent.overview}
                        </p>
                      </div>

                      {/* Benefits and What to Expect */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Benefits */}
                        <div className="bg-brand-primary/5 rounded-xl p-4 border border-brand-primary/10">
                          <h4 className="text-md font-semibold mb-3 text-gray-900 flex items-center gap-2">
                            <Heart className="h-4 w-4 text-brand-primary" />
                            Key Benefits
                          </h4>
                          <ul className="space-y-2">
                            {type.detailedContent.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0"></div>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* What to Expect */}
                        <div className="bg-brand-peach/5 rounded-xl p-4 border border-brand-peach/10">
                          <h4 className="text-md font-semibold mb-3 text-gray-900 flex items-center gap-2">
                            <Star className="h-4 w-4 text-brand-peach" />
                            What to Expect
                          </h4>
                          <ul className="space-y-2">
                            {type.detailedContent.whatToExpect?.map((item, index) => (
                              <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-peach mt-1.5 flex-shrink-0"></div>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
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
                  )}
                </motion.div>
              </MotionCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExpandableRetreatCards;
