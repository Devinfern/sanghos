
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InstructorCard from "@/components/InstructorCard";
import { instructors } from "@/lib/data";
import { cn } from "@/lib/utils";

const Instructors = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Instructors | Sanghos</title>
        <meta 
          name="description" 
          content="Meet our experienced instructors who guide our mindfulness and wellness retreats."
        />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Instructors</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet our experienced instructors who bring expertise, passion and dedication 
              to guiding you through transformative wellness experiences.
            </p>
          </div>

          <div 
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-700",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
          >
            {instructors.map((instructor, index) => (
              <InstructorCard 
                key={instructor.id} 
                instructor={instructor} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Instructors;
