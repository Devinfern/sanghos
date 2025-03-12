import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, MessageCircle, Calendar, Check, Heart, Star } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import { Card, CardContent } from "@/components/ui/card";

const CommunityTeaser = () => {
  const navigate = useNavigate();
  return <>
      <Helmet>
        <title>Join Our Community | Sanghos</title>
        <meta name="description" content="Join the Sanghos community to connect with like-minded individuals, share experiences, and deepen your wellness journey." />
      </Helmet>

      <Header />

      <main className="pt-16 pb-16">
        {/* Hero Section with improved spacing and reduced congestion */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden mb-16">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/10 z-10"></div>
            <OptimizedImage src="/lovable-uploads/d119458d-9251-4956-9c76-ec663432c449.png" alt="Modern retreat space with pool" className="w-full h-full" aspectRatio="custom" objectFit="cover" priority={true} />
          </div>

          <div className="container relative z-20 px-4 md:px-6 py-16 sm:py-24 max-w-5xl">
            <div className="mx-auto text-center">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium mb-6 animate-fade-in" style={{
              animationDelay: "300ms"
            }}>Join 200+ Sanghos members</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight animate-fade-in" style={{
              animationDelay: "400ms"
            }}>
                Find Your Community on Sanghos
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto animate-fade-in" style={{
              animationDelay: "500ms"
            }}>
                Connect with like-minded individuals and access exclusive content
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in" style={{
              animationDelay: "600ms"
            }}>
                <Button size="lg" onClick={() => navigate("/join")} className="bg-primary hover:bg-primary/90 group shadow-lg hover:shadow-xl transition-all text-lg py-6">
                  Join Sanghos
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/login")} className="bg-white/10 text-white hover:bg-white/20 border-white/30 backdrop-blur-sm text-lg py-6">
                  Sign In
                </Button>
              </div>
            </div>
          </div>

          {/* Decorative element moved to bottom */}
          <div className="absolute bottom-12 left-0 right-0 flex justify-center animate-bounce">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <ArrowRight className="h-5 w-5 text-white rotate-90" />
            </div>
          </div>
        </section>

        {/* Benefits Section with enhanced cards */}
        <section className="py-16 container px-4 md:px-6 overflow-hidden">
          <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-up">
            <h2 className="text-3xl font-bold mb-4">Why Join Our Community?</h2>
            <p className="text-lg text-muted-foreground">
              Becoming a member opens doors to exclusive resources and connections with fellow wellness enthusiasts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-muted/30 hover:shadow-xl transition-all hover:-translate-y-1 duration-300 overflow-hidden rounded-xl animate-fade-up" style={{
            animationDelay: "100ms"
          }}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Connect</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Find like-minded practitioners</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Build meaningful relationships</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Grow together on your journey</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-muted/30 hover:shadow-xl transition-all hover:-translate-y-1 duration-300 overflow-hidden rounded-xl animate-fade-up" style={{
            animationDelay: "200ms"
          }}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-400"></div>
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Share</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Exchange practices and tips</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Discuss wellness philosophies</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Get answers to your questions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-muted/30 hover:shadow-xl transition-all hover:-translate-y-1 duration-300 overflow-hidden rounded-xl animate-fade-up" style={{
            animationDelay: "300ms"
          }}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-pink-400"></div>
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Events</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Join exclusive virtual gatherings</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Participate in member challenges</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Meet instructors in Q&A sessions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Community Stats Section - New */}
        <section className="py-12 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 animate-fade-up" style={{
              animationDelay: "100ms"
            }}>
                <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </div>
              <div className="p-4 animate-fade-up" style={{
              animationDelay: "200ms"
            }}>
                <div className="text-4xl font-bold text-primary mb-2">120+</div>
                <div className="text-sm text-muted-foreground">Monthly Events</div>
              </div>
              <div className="p-4 animate-fade-up" style={{
              animationDelay: "300ms"
            }}>
                <div className="text-4xl font-bold text-primary mb-2">4.9</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rating</div>
              </div>
              <div className="p-4 animate-fade-up" style={{
              animationDelay: "400ms"
            }}>
                <div className="text-4xl font-bold text-primary mb-2">25K+</div>
                <div className="text-sm text-muted-foreground">Discussion Posts</div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Gallery with enhanced styling */}
        

        {/* Testimonials with enhanced cards */}
        <section className="py-16 container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">What Our Community Members Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-white to-primary/5 border-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-up" style={{
              animationDelay: "100ms"
            }}>
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 text-primary flex">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-primary text-primary" />)}
                    </div>
                    <p className="italic mb-6 flex-grow">
                      "Joining the Sanghos community has been transformative for my wellness journey. I've found so many like-minded individuals who support and inspire me."
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full mr-3 overflow-hidden border-2 border-white shadow-md">
                        <OptimizedImage src="https://i.pravatar.cc/100?u=sarah" alt="Sarah J." className="w-full h-full object-cover" aspectRatio="square" />
                      </div>
                      <div>
                        <p className="font-medium">Sarah J.</p>
                        <p className="text-sm text-muted-foreground">Member since 2023</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-white to-primary/5 border-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-up" style={{
              animationDelay: "200ms"
            }}>
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 text-primary flex">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-primary text-primary" />)}
                    </div>
                    <p className="italic mb-6 flex-grow">
                      "The community forums have been an incredible resource. I've learned so much from other members and found practices that work for me."
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full mr-3 overflow-hidden border-2 border-white shadow-md">
                        <OptimizedImage src="https://i.pravatar.cc/100?u=michael" alt="Michael T." className="w-full h-full object-cover" aspectRatio="square" />
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

        {/* CTA Section with enhanced styling */}
        <section className="py-16 bg-gradient-to-tr from-primary/10 to-muted/20 border-t border-b border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07')] opacity-5 bg-cover bg-center"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center p-1 mb-8 rounded-full bg-white/80 backdrop-blur-sm shadow-md animate-fade-up">
                <Heart className="h-5 w-5 text-pink-500 mr-2" />
                <span className="text-sm font-medium pr-2">Join our growing community today</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 animate-fade-up" style={{
              animationDelay: "100ms"
            }}>Ready to Begin Your Journey?</h2>
              <p className="text-lg text-muted-foreground mb-8 animate-fade-up" style={{
              animationDelay: "200ms"
            }}>
                Take the first step toward a more connected wellness journey. Join Sanghos today and become part of our growing community.
              </p>
              <Button size="lg" onClick={() => navigate("/join")} className="group bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all animate-fade-up" style={{
              animationDelay: "300ms"
            }}>
                Join Sanghos Now
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <div className="mt-8 pt-8 border-t border-primary/10 text-sm text-muted-foreground animate-fade-up" style={{
              animationDelay: "400ms"
            }}>
                <p>Already a member? <Link to="/login" className="text-primary hover:underline">Sign in here</Link></p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>;
};
export default CommunityTeaser;
