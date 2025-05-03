
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RetreatHeaderProps {
  retreat: {
    id?: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    image: string;
  };
}

const RetreatHeader = ({ retreat }: RetreatHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="link" className="p-0" asChild>
          <Link to="/community">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Community
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="rounded-lg overflow-hidden w-full md:w-48 h-32 md:h-auto">
          <img 
            src={retreat.image || "/placeholder.svg"} 
            alt={retreat.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{retreat.title} Community</h1>
          <p className="text-muted-foreground mb-4">
            {retreat.description || "No description available"}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>
              {retreat.startDate && retreat.endDate ? (
                <>
                  {new Date(retreat.startDate).toLocaleDateString()} - {new Date(retreat.endDate).toLocaleDateString()}
                </>
              ) : (
                "Dates TBA"
              )}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span>
            <span>{retreat.location || "Location TBA"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetreatHeader;
