import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedRetreats from "@/components/FeaturedRetreats";
import Footer from "@/components/Footer";
import { instructors } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SanghosStory from "@/components/SanghosStory";
import HowItWorks from "@/components/HowItWorks";
import JoinCommunity from "@/components/JoinCommunity";
import AIWellnessSection from "@/components/AIWellnessSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Sanghos | Wellness Retreats in Private Homes</title>
        <meta
          name="description"
          content="Discover transformative daylong wellness retreats hosted by expert instructors in unique private spaces."
        />
      </Helmet>

      <Header />
      <Hero />
      <SanghosStory />
      <FeaturedRetreats />
      <AIWellnessSection />
      <HowItWorks />

      {/* Commented out Featured Instructors section */}
      {/* <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-playfair font-light mb-6 text-brand-dark">
              Meet Our Expert Instructors
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Learn from passionate professionals who bring years of experience and authentic practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.slice(0, 3).map((instructor, index) => (
              <div 
                key={instructor.id} 
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-up opacity-0 border border-brand-subtle/30" 
                style={{ animationDelay: `${100 + index * 100}ms` }}
              >
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1 text-brand-dark">{instructor.name}</h3>
                  <p className="text-brand-slate text-sm mb-4">{instructor.title}</p>
                  <p className="text-muted-foreground line-clamp-3 mb-4">{instructor.bio}</p>
                  <Button asChild variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary/10">
                    <Link to={`/instructor/${instructor.id}`}>View Profile</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-brand-primary hover:bg-brand-primary/90">
              <Link to="/instructors" className="group">
                View All Instructors
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section> */}

      <JoinCommunity />
      <Footer />
    </>
  );
};

export default Index;
