
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
import OptimizedImage from "@/components/OptimizedImage";

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

  const testimonials = [
    {
      text: "The yoga retreat was truly transformative. The private space created the perfect atmosphere for deep practice.",
      author: "Amelia R.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"
    },
    {
      text: "I've never experienced such a profound meditation session. The intimate setting made all the difference.",
      author: "Michael T.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop"
    },
    {
      text: "The breathwork retreat opened my eyes to a new level of self-awareness. Highly recommend!",
      author: "Sophia L.",
      rating: 5, 
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop"
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

      <div className="bg-background">
        <Hero />

        {/* Browse by Practice Type */}
        <section className="py-20 bg-sand-50">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Practice</h2>
              <p className="text-muted-foreground">
                Discover retreats that match your wellness journey
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { name: "Yoga", image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2940&auto=format&fit=crop" },
                { name: "Meditation", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2622&auto=format&fit=crop" },
                { name: "Breathwork", image: "https://images.unsplash.com/photo-1474418397713-2f64bd8b9b70?q=80&w=2853&auto=format&fit=crop" },
                { name: "Sound Healing", image: "https://images.unsplash.com/photo-1519315968106-b4a805232ab8?q=80&w=2787&auto=format&fit=crop" },
                { name: "Forest Therapy", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2870&auto=format&fit=crop" },
                { name: "Mindfulness", image: "https://images.unsplash.com/photo-1528319725582-ddc096101511?q=80&w=2835&auto=format&fit=crop" }
              ].map((practice) => (
                <div 
                  key={practice.name} 
                  className="group relative overflow-hidden rounded-xl cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => navigate(`/retreats?category=${practice.name}`)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10"></div>
                  <OptimizedImage 
                    src={practice.image} 
                    alt={practice.name} 
                    className="w-full aspect-square group-hover:scale-105 transition-transform duration-500" 
                    objectFit="cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-white font-medium text-lg">{practice.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FeaturedRetreats />

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Community Says</h2>
              <p className="text-muted-foreground">
                Hear from those who have experienced our retreats
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-sand-50 p-8 rounded-xl relative animate-fade-up opacity-0" 
                  style={{ animationDelay: `${100 + index * 100}ms` }}
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-sage-600 text-sage-600" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <OptimizedImage 
                        src={testimonial.image} 
                        alt={testimonial.author} 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <span className="font-medium">{testimonial.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 md:py-24 bg-sage-50">
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
              <div className="bg-white p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up opacity-0" style={{ animationDelay: "100ms" }}>
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-8 w-8 text-sage-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Browse & Choose</h3>
                <p className="text-muted-foreground">
                  Explore our curated selection of wellness retreats by date, practice type, or instructor.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up opacity-0" style={{ animationDelay: "200ms" }}>
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-sage-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Book Your Spot</h3>
                <p className="text-muted-foreground">
                  Secure your place with simple booking and receive details about your upcoming retreat.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up opacity-0" style={{ animationDelay: "300ms" }}>
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
        <section className="py-20 md:py-24 bg-white">
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
              {instructors.slice(0, 3).map((instructor, index) => (
                <div 
                  key={instructor.id} 
                  className="group bg-sand-50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-up opacity-0" 
                  style={{ animationDelay: `${100 + index * 100}ms` }}
                >
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <OptimizedImage
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      aspectRatio="portrait"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{instructor.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{instructor.title}</p>
                    <p className="text-muted-foreground line-clamp-3 mb-4">{instructor.bio}</p>
                    <Button asChild variant="outline" className="w-full group">
                      <Link to={`/instructor/${instructor.id}`}>
                        View Profile
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
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
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10"></div>
            <OptimizedImage
              src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
              alt="Peaceful retreat setting"
              className="w-full h-full object-cover"
              objectFit="cover"
            />
          </div>

          <div className="container relative z-20 px-4 md:px-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                Join Our Wellness Journey
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Sign up for Sanghos to be the first to know about new retreats, receive exclusive offers, and connect with like-minded individuals.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 hover:text-primary"
                  onClick={() => navigate('/join')}
                >
                  Create Account
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-white hover:bg-white/10"
                  onClick={handleCommunityClick}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Index;
