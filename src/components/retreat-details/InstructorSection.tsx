
import { Badge } from "@/components/ui/badge";
import OptimizedImage from "@/components/OptimizedImage";

interface InstructorSectionProps {
  instructor: any;
}

const InstructorSection = ({ instructor }: InstructorSectionProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-900">Your Instructor</h3>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
            <OptimizedImage
              src={instructor.image}
              alt={instructor.name}
              className="w-full h-full object-cover"
              aspectRatio="square"
            />
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-1">{instructor.name}</h4>
            <p className="text-sage-600 mb-2">{instructor.title}</p>
            <div className="flex flex-wrap gap-1">
              {instructor.specialties.map((specialty: string, i: number) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <p className="text-gray-600 leading-relaxed">{instructor.bio}</p>
      </div>
    </div>
  );
};

export default InstructorSection;
