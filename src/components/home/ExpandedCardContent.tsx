import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target, Lightbulb, Heart, CheckCircle } from "lucide-react";

interface ContentSection {
  summary: string;
  howItWorks: string;
  impact: string;
  examples: string;
}

interface ExpandedCardContentProps {
  title: string;
  content: ContentSection;
}

const ExpandedCardContent: React.FC<ExpandedCardContentProps> = ({ title, content }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + (index * 0.1),
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="space-y-6 mt-8">
      {/* Summary Card */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Our Approach</h4>
                <p className="text-white/90 leading-relaxed">{content.summary}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Details Cards Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* How It Works Card */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h5 className="text-sm font-medium text-white mb-2">How It Works</h5>
                  <p className="text-white/80 text-sm leading-relaxed">{content.howItWorks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Impact Card */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h5 className="text-sm font-medium text-white mb-2">The Impact</h5>
                  <p className="text-white/80 text-sm leading-relaxed">{content.impact}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Examples Card */}
      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Real Examples</h5>
                <p className="text-white/80 text-sm leading-relaxed">{content.examples}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

    </div>
  );
};

export default ExpandedCardContent;