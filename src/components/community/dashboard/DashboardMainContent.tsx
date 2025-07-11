
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Clock, Users, ArrowRight, Heart, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardMainContentProps {
  onSectionChange: (section: string) => void;
}

const DashboardMainContent = ({ onSectionChange }: DashboardMainContentProps) => {
  const courses = [
    {
      id: 1,
      title: "Mindfulness Fundamentals",
      description: "Learn the basics of meditation and awareness",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
      progress: 65,
      duration: "45 min",
      participants: 234,
      category: "Meditation"
    },
    {
      id: 2,
      title: "Yoga for Beginners",
      description: "Gentle introduction to yoga practice",
      image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=200&fit=crop",
      progress: 32,
      duration: "30 min",
      participants: 189,
      category: "Yoga"
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
                  Welcome back to your wellness journey
                </h2>
                <p className="text-white/90 text-lg mb-6">
                  Continue where you left off and discover new paths to mindfulness
                </p>
                <Button 
                  size="lg"
                  className="bg-white text-brand-primary hover:bg-white/90 font-semibold px-8"
                  onClick={() => onSectionChange("resources")}
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Continue Learning Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Continue Learning</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onSectionChange("resources")}
                className="text-brand-primary hover:text-brand-primary/80"
              >
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="border border-gray-100 hover:border-brand-primary/30 hover:shadow-md transition-all duration-300 bg-white group">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Course Image */}
                        <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                        </div>

                        {/* Course Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                                {course.title}
                              </h4>
                              <p className="text-xs text-gray-600 mb-2">
                                {course.description}
                              </p>
                            </div>
                            <span className="text-xs bg-brand-subtle/50 text-brand-primary px-2 py-1 rounded-full font-medium">
                              {course.category}
                            </span>
                          </div>

                          {/* Progress */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-600">Progress</span>
                              <span className="text-xs font-medium text-gray-900">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>

                          {/* Meta Info & Button */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{course.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{course.participants}</span>
                              </div>
                            </div>
                            
                            <Button 
                              size="sm" 
                              className="h-7 px-3 bg-brand-primary hover:bg-brand-primary/90 text-white text-xs"
                              onClick={() => onSectionChange("resources")}
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

      {/* Daily Wellness Intention */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-0 shadow-sm bg-gradient-to-r from-brand-sand/10 to-brand-subtle/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-brand-sand/20 flex items-center justify-center mr-3">
                <Heart className="h-5 w-5 text-brand-sand" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Daily Wellness Intention</h3>
                <p className="text-sm text-gray-600">Set your focus for today</p>
              </div>
            </div>
            <div className="bg-white/60 rounded-lg p-4 border border-brand-subtle/30">
              <div className="flex items-center text-gray-600">
                <Lightbulb className="h-4 w-4 mr-2 text-brand-sand" />
                <span className="text-sm italic">
                  "Today I choose to be present and mindful in every moment."
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
