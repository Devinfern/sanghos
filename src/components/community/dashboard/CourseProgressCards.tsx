
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Clock, Users, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface CourseProgressCardsProps {
  onSectionChange: (section: string) => void;
}

const CourseProgressCards = ({ onSectionChange }: CourseProgressCardsProps) => {
  const courses = [
    {
      id: 1,
      title: "Mindfulness Fundamentals",
      description: "Learn the basics of meditation and awareness",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
      progress: 65,
      duration: "45 min",
      participants: 234,
      nextLesson: "Breathing Techniques",
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
      nextLesson: "Sun Salutations",
      category: "Yoga"
    },
    {
      id: 3,
      title: "Wellness Nutrition",
      description: "Nourish your body with mindful eating",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=200&fit=crop",
      progress: 78,
      duration: "25 min",
      participants: 156,
      nextLesson: "Meal Planning",
      category: "Nutrition"
    }
  ];

  return (
    <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900">
            Continue Learning
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onSectionChange("resources")}
            className="text-brand-primary hover:text-brand-primary/80"
          >
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Card className="border border-gray-100 hover:border-brand-primary/20 hover:shadow-md transition-all duration-300 bg-white">
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
                        <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                          {course.title}
                        </h3>
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

                    {/* Meta Info */}
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
                        className="h-8 px-3 bg-brand-primary hover:bg-brand-primary/90 text-white text-xs"
                        onClick={() => onSectionChange("resources")}
                      >
                        Continue
                      </Button>
                    </div>

                    {/* Next Lesson */}
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-600">
                        Next: <span className="font-medium text-gray-900">{course.nextLesson}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CourseProgressCards;
