
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
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

      <div className="bg-background min-h-screen">
        <Hero />

        {/* Browse by Practice Type */}
        <section className="py-24 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Find Your Practice</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover retreats across different modalities, each offering a unique path to wellness and self-discovery
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { name: "Yoga", image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2940&auto=format&fit=crop", description: "Connect with your body through movement and breath" },
                { name: "Meditation", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2622&auto=format&fit=crop", description: "Cultivate clarity and inner peace through stillness" },
                { name: "Breathwork", image: "https://images.unsplash.com/photo-1474418397713-2f64bd8b9b70?q=80&w=2853&auto=format&fit=crop", description: "Harness the power of conscious breathing techniques" },
                { name: "Sound Healing", image: "https://images.unsplash.com/photo-1519315968106-b4a805232ab8?q=80&w=2787&auto=format&fit=crop", description: "Experience deep relaxation through vibrational therapy" },
                { name: "Forest Therapy", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2870&auto=format&fit=crop", description: "Reconnect with nature for physical and mental healing" },
                { name: "Mindfulness", image: "https://images.unsplash.com/photo-1528319725582-ddc096101511?q=80&w=2835&auto=format&fit=crop", description: "Cultivate present-moment awareness in daily life" }
              ].map((practice) => (
                <div 
                  key={practice.name} 
                  className="group relative overflow-hidden rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-500"
                  onClick={() => navigate(`/retreats?category=${practice.name}`)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10"></div>
                  <OptimizedImage 
                    src={practice.image} 
                    alt={practice.name} 
                    className="w-full aspect-[4/5] group-hover:scale-110 transition-transform duration-700" 
                    objectFit="cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                    <h3 className="text-white font-bold text-2xl mb-2">{practice.name}</h3>
                    <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">{practice.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-sage-50/40">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Guest Experiences</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stories from those who have experienced the transformative power of our retreats
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up opacity-0" 
                  style={{ animationDelay: `${100 + index * 100}ms` }}
                >
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-sage-600 text-sage-600" />
                    ))}
                  </div>
                  <p className="text-lg mb-8 font-medium italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full overflow-hidden">
                      <OptimizedImage 
                        src={testimonial.image} 
                        alt={testimonial.author} 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <span className="font-bold text-lg">{testimonial.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                How Sanghos Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Three simple steps to your wellness journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center space-y-4 animate-fade-up opacity-0" style={{ animationDelay: "100ms" }}>
                <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mb-4 shadow-md">
                  <Calendar className="h-10 w-10 text-sage-600" />
                </div>
                <h3 className="text-2xl font-bold mb-1">Browse & Choose</h3>
                <p className="text-muted-foreground text-lg">
                  Explore our curated selection of unique retreats filtered by date, practice, or instructor.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4 animate-fade-up opacity-0" style={{ animationDelay: "200ms" }}>
                <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mb-4 shadow-md">
                  <MapPin className="h-10 w-10 text-sage-600" />
                </div>
                <h3 className="text-2xl font-bold mb-1">Book Your Spot</h3>
                <p className="text-muted-foreground text-lg">
                  Reserve your place in a small, intimate group with a simple booking process.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4 animate-fade-up opacity-0" style={{ animationDelay: "300ms" }}>
                <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mb-4 shadow-md">
                  <Users className="h-10 w-10 text-sage-600" />
                </div>
                <h3 className="text-2xl font-bold mb-1">Experience & Connect</h3>
                <p className="text-muted-foreground text-lg">
                  Join a transformative retreat in a beautiful private space guided by expert instructors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Instructors */}
        <section className="py-24 md:py-32 bg-sand-50/50">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Meet Our Instructors
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn from passionate professionals who bring authentic practice and experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {instructors.slice(0, 3).map((instructor, index) => (
                <div 
                  key={instructor.id} 
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 animate-fade-up opacity-0" 
                  style={{ animationDelay: `${100 + index * 100}ms` }}
                >
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <OptimizedImage
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      aspectRatio="portrait"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{instructor.name}</h3>
                    <p className="text-sage-600 text-lg mb-4">{instructor.title}</p>
                    <p className="text-muted-foreground mb-6 line-clamp-3">{instructor.bio}</p>
                    <Button asChild variant="outline" className="w-full group border-sage-200 hover:bg-sage-50 hover:text-sage-700">
                      <Link to={`/instructor/${instructor.id}`} className="font-medium">
                        View Profile
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg font-bold shadow-md hover:shadow-lg bg-sage-600 hover:bg-sage-700">
                <Link to="/instructors" className="group">
                  View All Instructors
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-32 md:py-40 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10"></div>
            <OptimizedImage
              src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
              alt="Peaceful retreat setting"
              className="w-full h-full object-cover"
              objectFit="cover"
            />
          </div>

          <div className="container relative z-20 px-4 md:px-6">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
                Begin Your Wellness Journey
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                Join our community to discover transformative retreat experiences in unique private settings guided by expert practitioners.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 hover:text-primary rounded-full px-8 py-7 text-lg font-bold shadow-md hover:shadow-lg"
                  onClick={() => navigate('/join')}
                >
                  Create Account
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-white hover:bg-white/10 rounded-full px-8 py-7 text-lg font-bold"
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
