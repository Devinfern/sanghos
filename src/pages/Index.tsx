
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedRetreats from "@/components/FeaturedRetreats";
import Footer from "@/components/Footer";
import { instructors } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar, Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("sanghos_user") !== null;

  const handleCommunityClick = () => {
    if (isLoggedIn) {
      navigate('/community');
    } else {
      navigate('/join');
    }
  };

  const categories = [
    { 
      name: "Yoga",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
    },
    { 
      name: "Meditation",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80" 
    },
    { 
      name: "Sound Healing",
      image: "https://images.unsplash.com/photo-1599689868238-39486c538807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
    },
    { 
      name: "Breathwork",
      image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
    }
  ];

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

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
              Find a retreat by practice
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore our diverse offerings from yoga and meditation to sound healing and breathwork
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={`/retreats?category=${encodeURIComponent(category.name)}`}
                className="group animate-fade-up opacity-0"
                style={{ animationDelay: `${100 + index * 100}ms` }}
              >
                <div className="relative rounded-xl overflow-hidden aspect-square shadow-md transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10"></div>
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white z-20">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FeaturedRetreats />

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-sand-50">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
              What our community is saying
            </h2>
            <p className="text-muted-foreground text-lg">
              Authentic experiences from retreat participants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((testimonial, index) => (
              <Card 
                key={index} 
                className="bg-white shadow-md hover:shadow-lg transition-all duration-300 animate-fade-up opacity-0"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "The retreat was transformative. The space was beautiful, the instructor was knowledgeable and supportive, and the small group setting made it feel intimate and personal."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-sage-700 font-medium">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Guest {index + 1}</p>
                      <p className="text-sm text-muted-foreground">Yoga Retreat</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
              How Sanghos Works
            </h2>
            <p className="text-muted-foreground text-lg">
              Discover, book, and experience transformative wellness retreats in just a few steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center animate-fade-up opacity-0" style={{ animationDelay: "100ms" }}>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage-100 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-sage-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse & Choose</h3>
              <p className="text-muted-foreground">
                Explore our curated selection of wellness retreats by date, practice type, or instructor
              </p>
            </div>

            <div className="text-center animate-fade-up opacity-0" style={{ animationDelay: "200ms" }}>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage-100 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-sage-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Book Your Spot</h3>
              <p className="text-muted-foreground">
                Secure your place with simple booking and receive details about your upcoming retreat
              </p>
            </div>

            <div className="text-center animate-fade-up opacity-0" style={{ animationDelay: "300ms" }}>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage-100 flex items-center justify-center">
                <Users className="h-8 w-8 text-sage-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Experience & Connect</h3>
              <p className="text-muted-foreground">
                Join a small group in a beautiful private space and immerse yourself in the practice
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Instructors */}
      <section className="py-16 md:py-24 bg-sand-50">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
              Meet Our Expert Instructors
            </h2>
            <p className="text-muted-foreground text-lg">
              Learn from passionate professionals who bring years of experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {instructors.slice(0, 3).map((instructor, index) => (
              <div 
                key={instructor.id} 
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 animate-fade-up opacity-0" 
                style={{ animationDelay: `${100 + index * 100}ms` }}
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{instructor.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{instructor.title}</p>
                  <p className="text-muted-foreground line-clamp-3 mb-4">{instructor.bio}</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/instructor/${instructor.id}`}>View Profile</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/instructors" className="group">
                View All Instructors
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Join Us CTA - Enhanced */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/50 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
            alt="Peaceful retreat setting"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container relative z-20 px-4 md:px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-playfair">
              Join Our Community of Wellness Seekers
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Sign up for Sanghos to be the first to know about new retreats, receive exclusive offers, and connect with like-minded individuals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 hover:text-primary rounded-full px-8 py-6 text-base font-medium"
                onClick={() => navigate('/join')}
              >
                Create Account
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-medium"
                onClick={handleCommunityClick}
              >
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
