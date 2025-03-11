import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, MessageCircle, Calendar, Check } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import { Card, CardContent } from "@/components/ui/card";

const CommunityTeaser = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Join Our Community | Sanghos</title>
        <meta
          name="description"
          content="Join the Sanghos community to connect with like-minded individuals, share experiences, and deepen your wellness journey."
        />
      </Helmet>

      <Header />

      <main className="pt-16 pb-16">
        {/* Hero Section with background image */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden mb-16">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent z-10"></div>
            <OptimizedImage
              src="/lovable-uploads/d119458d-9251-4956-9c76-ec663432c449.png"
              alt="Modern retreat space with pool"
              className="w-full h-full"
              aspectRatio="custom"
              objectFit="cover"
              priority={true}
            />
          </div>

          <div className="container relative z-20 px-4 md:px-6 py-16 sm:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
                Join Our Vibrant Community
              </h1>
              <p className="text-xl text-white/90 mb-8 animate-fade-in">
                Connect with like-minded individuals, share your wellness journey, and access exclusive content and events.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in">
                <Button size="lg" onClick={() => navigate("/join")} className="bg-primary/90 hover:bg-primary flex items-center">
                  Join Sanghos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/login")} className="bg-white/10 text-white hover:bg-white/20 border-white/30">
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Join Our Community?</h2>
            <p className="text-lg text-muted-foreground">
              Becoming a member opens doors to exclusive resources and connections with fellow wellness enthusiasts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-muted/30 hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Connect</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Find like-minded practitioners</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Build meaningful relationships</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Grow together on your journey</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-muted/30 hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Share</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Exchange practices and tips</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Discuss wellness philosophies</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Get answers to your questions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-muted/30 hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Events</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Join exclusive virtual gatherings</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Participate in member challenges</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Meet instructors in Q&A sessions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Community Gallery */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Community Glimpses</h2>
              <p className="text-lg text-muted-foreground">
                See what happens when our members come together
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden group">
                <OptimizedImage 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
                  alt="Community retreat" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  aspectRatio="custom"
                />
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden group">
                <OptimizedImage 
                  src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" 
                  alt="Group meditation" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  aspectRatio="custom"
                />
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden group">
                <OptimizedImage 
                  src="https://images.unsplash.com/photo-1518495973542-4542c06a5843" 
                  alt="Wellness workshop" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  aspectRatio="custom"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Community Members Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white/50 backdrop-blur-sm border border-white/20 shadow-md rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 text-primary">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-primary text-lg">★</span>
                      ))}
                    </div>
                    <p className="italic mb-6 flex-grow">
                      "Joining the Sanghos community has been transformative for my wellness journey. I've found so many like-minded individuals who support and inspire me."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/20 rounded-full mr-3 overflow-hidden">
                        <OptimizedImage
                          src="https://i.pravatar.cc/100?u=sarah"
                          alt="Sarah J."
                          className="w-full h-full object-cover"
                          aspectRatio="square"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Sarah J.</p>
                        <p className="text-sm text-muted-foreground">Member since 2023</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/50 backdrop-blur-sm border border-white/20 shadow-md rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 text-primary">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-primary text-lg">★</span>
                      ))}
                    </div>
                    <p className="italic mb-6 flex-grow">
                      "The community forums have been an incredible resource. I've learned so much from other members and found practices that work for me."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/20 rounded-full mr-3 overflow-hidden">
                        <OptimizedImage
                          src="https://i.pravatar.cc/100?u=michael"
                          alt="Michael T."
                          className="w-full h-full object-cover"
                          aspectRatio="square"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Michael T.</p>
                        <p className="text-sm text-muted-foreground">Member since 2022</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 my-12 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-primary/90 mix-blend-multiply z-10"></div>
            <OptimizedImage
              src="/lovable-uploads/d119458d-9251-4956-9c76-ec663432c449.png"
              alt="Modern retreat space"
              className="w-full h-full"
              aspectRatio="custom"
              objectFit="cover"
            />
          </div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-white">Ready to Join Our Community?</h2>
              <p className="text-xl mb-8 text-white/90">
                Create your Sanghos account today and start connecting with our community of wellness enthusiasts.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" onClick={() => navigate("/join")} className="bg-white text-primary hover:bg-white/90 flex items-center mx-auto">
                  Join Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/login")} className="border-white text-white hover:bg-white/10">
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CommunityTeaser;

