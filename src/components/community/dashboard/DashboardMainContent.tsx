
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Clock, Users, ArrowRight, Heart, Lightbulb, BookOpen, Share2, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardMainContentProps {
  onSectionChange: (section: string) => void;
}

const DashboardMainContent = ({ onSectionChange }: DashboardMainContentProps) => {
  const retreatContent = [
    {
      id: 1,
      title: "Pre-Retreat Preparation",
      description: "Essential practices to prepare for your upcoming retreat",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
      progress: 45,
      duration: "30 min",
      participants: 156,
      category: "Preparation",
      type: "pre-retreat"
    },
    {
      id: 2,
      title: "Post-Retreat Integration",
      description: "Maintaining your transformation after the retreat",
      image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=200&fit=crop",
      progress: 78,
      duration: "45 min",
      participants: 203,
      category: "Integration",
      type: "post-retreat"
    }
  ];

  const communityFeatures = [
    {
      icon: BookOpen,
      title: "Integration Support",
      description: "Get ongoing guidance to integrate your retreat experience",
      color: "text-brand-primary",
      bgColor: "bg-brand-primary/10",
      action: () => onSectionChange("integration")
    },
    {
      icon: Share2,
      title: "Share Your Journey",
      description: "Connect with others by sharing your retreat experiences",
      color: "text-brand-rose",
      bgColor: "bg-brand-rose/10",
      action: () => onSectionChange("share")
    },
    {
      icon: UserPlus,
      title: "Alumni Network",
      description: "Connect with fellow retreat alumni for ongoing support",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      action: () => onSectionChange("alumni")
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="border-0 shadow-lg bg-gradient-to-br from-brand-primary via-brand-primary/90 to-brand-dark overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <CardContent className="p-8 relative z-10">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-white mb-2">
                  Welcome to your retreat community
                </h2>
                <p className="text-white/90 text-lg mb-6">
                  Connect with fellow seekers, prepare for transformation, and integrate your experiences
                </p>
                <Button 
                  size="lg"
                  className="bg-white text-brand-primary hover:bg-white/90 font-semibold px-8"
                  onClick={() => onSectionChange("connections")}
                >
                  Connect with Others
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Retreat Journey Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Your Retreat Journey</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onSectionChange("retreats")}
                className="text-brand-primary hover:text-brand-primary/80"
              >
                View Timeline
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {retreatContent.map((content, index) => (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="border border-gray-100 hover:border-brand-primary/30 hover:shadow-md transition-all duration-300 bg-white group">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Content Image */}
                        <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={content.image} 
                            alt={content.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                        </div>

                        {/* Content Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                                {content.title}
                              </h4>
                              <p className="text-xs text-gray-600 mb-2">
                                {content.description}
                              </p>
                            </div>
                            <span className="text-xs bg-brand-subtle/50 text-brand-primary px-2 py-1 rounded-full font-medium">
                              {content.category}
                            </span>
                          </div>

                          {/* Progress */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-600">Progress</span>
                              <span className="text-xs font-medium text-gray-900">{content.progress}%</span>
                            </div>
                            <Progress value={content.progress} className="h-2" />
                          </div>

                          {/* Meta Info & Button */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{content.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{content.participants}</span>
                              </div>
                            </div>
                            
                            <Button 
                              size="sm" 
                              className="h-7 px-3 bg-brand-primary hover:bg-brand-primary/90 text-white text-xs"
                              onClick={() => onSectionChange("preparation")}
                            >
                              Continue
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Community Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {communityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="border border-gray-100 hover:border-brand-primary/30 hover:shadow-md transition-all duration-300 cursor-pointer group"
                          onClick={feature.action}>
                      <CardContent className="p-4 text-center">
                        <div className={`h-12 w-12 rounded-full ${feature.bgColor} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                          <Icon className={`h-6 w-6 ${feature.color}`} />
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Daily Intention */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="border-0 shadow-sm bg-gradient-to-r from-brand-sand/10 to-brand-subtle/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-brand-sand/20 flex items-center justify-center mr-3">
                <Heart className="h-5 w-5 text-brand-sand" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Daily Retreat Intention</h3>
                <p className="text-sm text-gray-600">Connect with your inner wisdom today</p>
              </div>
            </div>
            <div className="bg-white/60 rounded-lg p-4 border border-brand-subtle/30">
              <div className="flex items-center text-gray-600">
                <Lightbulb className="h-4 w-4 mr-2 text-brand-sand" />
                <span className="text-sm italic">
                  "Today I open my heart to connect with fellow seekers on this journey of transformation."
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardMainContent;
