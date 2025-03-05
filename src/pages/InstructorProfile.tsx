
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RetreatCard from "@/components/RetreatCard";
import { instructors, retreats } from "@/lib/data";
import { cn } from "@/lib/utils";

const InstructorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  const instructor = instructors.find((i) => i.id === id);
  const instructorRetreats = retreats.filter((r) => r.instructor.id === id);

  useEffect(() => {
    if (!instructor) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [instructor, navigate]);

  if (!instructor) return null;

  return (
    <>
      <Helmet>
        <title>{instructor.name} | Sanghos</title>
        <meta name="description" content={instructor.bio} />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          {/* Back Button */}
          <div className="mb-6">
            <Button asChild variant="ghost" size="sm" className="group">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div 
            className={cn(
              "grid grid-cols-1 lg:grid-cols-3 gap-12 transition-opacity duration-700",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
          >
            {/* Instructor Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="w-full aspect-square mb-6 rounded-xl overflow-hidden">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h1 className="text-3xl font-bold mb-2">{instructor.name}</h1>
                <p className="text-lg text-muted-foreground mb-6">{instructor.title}</p>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {instructor.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <div className="bg-sage-100 px-3 py-1 rounded text-sage-800">
                    <span className="font-medium">{instructor.yearsExperience}+</span> years experience
                  </div>
                </div>
              </div>
            </div>

            {/* Bio and Retreats */}
            <div className="lg:col-span-2">
              <div>
                <h2 className="text-2xl font-semibold mb-4">About</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {instructor.bio}
                </p>
              </div>

              <Separator className="my-8" />

              <div>
                <h2 className="text-2xl font-semibold mb-6">Upcoming Retreats</h2>
                
                {instructorRetreats.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {instructorRetreats.map((retreat, index) => (
                      <RetreatCard key={retreat.id} retreat={retreat} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-muted/30 rounded-lg">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No upcoming retreats</h3>
                    <p className="text-muted-foreground mb-4">
                      {instructor.name} doesn't have any scheduled retreats at the moment.
                    </p>
                    <Button variant="outline" asChild>
                      <Link to="/">Browse Other Retreats</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default InstructorProfile;
