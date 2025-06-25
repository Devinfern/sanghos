
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, Users, PlayCircle, Crown } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';
import { useSubscription } from '@/hooks/useSubscription';

type Course = Database['public']['Tables']['wellness_courses']['Row'];

interface CourseCardProps {
  course: Course;
  onEnroll: (courseId: string) => void;
  isEnrolled?: boolean;
}

const CourseCard = ({ course, onEnroll, isEnrolled = false }: CourseCardProps) => {
  const { hasAccess } = useSubscription();
  const canAccess = !course.is_premium || hasAccess('basic');

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-gradient-to-br from-brand-light to-brand-sand relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircle className="w-16 h-16 text-white/80" />
        </div>
        {course.is_premium && (
          <Badge className="absolute top-3 right-3 bg-amber-500 text-white">
            <Crown className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge className={getDifficultyColor(course.difficulty_level || 'beginner')}>
            {course.difficulty_level}
          </Badge>
          {course.duration_hours && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {course.duration_hours}h
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-semibold text-brand-dark mb-2 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current text-yellow-500" />
              4.8
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              1.2k students
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-brand-dark">
              {course.price && course.price > 0 ? `$${course.price}` : 'Free'}
            </div>
          </div>
        </div>
        
        <Button 
          onClick={() => onEnroll(course.id)} 
          disabled={!canAccess || isEnrolled}
          className="w-full"
          variant={isEnrolled ? "outline" : "default"}
        >
          {!canAccess ? 'Premium Required' : 
           isEnrolled ? 'Continue Learning' : 
           course.price && course.price > 0 ? 'Enroll Now' : 'Start Free Course'}
        </Button>
      </div>
    </Card>
  );
};

export default CourseCard;
