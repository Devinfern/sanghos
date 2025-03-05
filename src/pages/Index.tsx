
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedRetreats from "@/components/FeaturedRetreats";
import Footer from "@/components/Footer";
import { instructors } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar, Users } from "lucide-react";

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

      <FeaturedRetreats />

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Sanghos Works
            </h2>
            <p className="text-muted-foreground">
              Discover, book, and experience transformative wellness retreats in just a few steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl text-center shadow-sm animate-fade-up opacity-0" style={{ animationDelay: "100ms" }}>
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-sage-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse & Choose</h3>
              <p className="text-muted-foreground">
                Explore our curated selection of wellness retreats by date, practice type, or instructor.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl text-center shadow-sm animate-fade-up opacity-0" style={{ animationDelay: "200ms" }}>
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-sage-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Book Your Spot</h3>
              <p className="text-muted-foreground">
                Secure your place with simple booking and receive details about your upcoming retreat.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl text-center shadow-sm animate-fade-up opacity-0" style={{ animationDelay: "300ms" }}>
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-sage-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Experience & Connect</h3>
              <p className="text-muted-foreground">
                Join a small group in a beautiful private space and immerse yourself in the practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Instructors */}
      <section className="py-16 md:py-24 bg-sand-50">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Expert Instructors
            </h2>
            <p className="text-muted-foreground">
              Learn from passionate professionals who bring years of experience and authentic practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {instructors.map((instructor, index) => (
              <div 
                key={instructor.id} 
                className="bg-white rounded-xl overflow-hidden shadow-sm animate-fade-up opacity-0" 
                style={{ animationDelay: `${100 + index * 100}ms` }}
              >
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{instructor.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{instructor.title}</p>
                  <p className="text-muted-foreground line-clamp-3 mb-4">{instructor.bio}</p>
                  <Button asChild variant="outline">
                    <Link to={`/instructor/${instructor.id}`}>View Profile</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link to="/instructors" className="group">
                View All Instructors
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/40 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
            alt="Peaceful retreat setting"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container relative z-20 px-4 md:px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Join Our Community of Wellness Seekers
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Sign up for Sanghos to be the first to know about new retreats, receive exclusive offers, and connect with like-minded individuals.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 hover:text-primary">
                Create Account
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Index;
