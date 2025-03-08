
import { useState } from "react";
import { Link } from "react-router-dom";
import { Instructor } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import OptimizedImage from "./OptimizedImage";

interface InstructorCardProps {
  instructor: Instructor;
  index?: number;
}

const InstructorCard = ({ instructor, index = 0 }: InstructorCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Animation delay based on index
  const getAnimationDelay = () => {
    return `${100 + index * 100}ms`;
  };

  return (
    <Link to={`/instructor/${instructor.id}`}>
      <div
        className={cn(
          "retreat-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300",
          "opacity-0 animate-fade-up"
        )}
        style={{ animationDelay: getAnimationDelay() }}
      >
        <OptimizedImage
          src={instructor.image}
          alt={instructor.name}
          aspectRatio="square"
          className="rounded-t-xl"
          onLoad={() => setImageLoaded(true)}
        />

        <div className="p-5">
          <h3 className="text-xl font-semibold mb-1">{instructor.name}</h3>
          <p className="text-muted-foreground text-sm mb-3">
            {instructor.title}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {instructor.specialties.slice(0, 3).map((specialty, i) => (
              <Badge
                key={i}
                variant="outline"
                className="bg-sage-50 text-sage-700 hover:bg-sage-100 border-sage-200"
              >
                {specialty}
              </Badge>
            ))}
          </div>

          <p className="text-muted-foreground text-sm line-clamp-3">
            {instructor.bio}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default InstructorCard;
