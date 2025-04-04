import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, MessageCircle, Calendar, Check, Heart, Star, Sparkles, Share2, HandHeart, BookOpen } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
const CommunityTeaser = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // In a real implementation, this would send the email to a backend service
      alert(`Thank you for subscribing with ${email}! We'll keep you updated on our community.`);
      setEmail("");
    }
  };
  return <>
      <Helmet>
        <title>Join Our Community | Sanghos</title>
        <meta name="description" content="Join the Sanghos community to connect with like-minded individuals, share experiences, and deepen your wellness journey together." />
      </Helmet>

      <Header />

      <main className="pt-16 pb-16">
        {/* Hero Section with improved spacing and animations */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden mb-16">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 to-brand-dark/40 z-10"></div>
            <OptimizedImage src="/lovable-uploads/d119458d-9251-4956-9c76-ec663432c449.png" alt="Community gathering in a peaceful setting" className={`w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} aspectRatio="custom" objectFit="cover" priority={true} onLoad={() => setIsLoaded(true)} />
          </div>

          <div className="container relative z-20 px-4 md:px-6 py-16 sm:py-24 max-w-5xl">
            <div className="mx-auto text-center">
              <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
              transitionDelay: "300ms"
            }}>
                <span className="inline-block bg-brand-primary/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
                  A community of over 200+ wellness seekers
                </span>
              </div>
              
              <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
              transitionDelay: "400ms"
            }}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                  Find Your Tribe. <span className="text-brand-peach">Flourish Together.</span>
                </h1>
              </div>
              
              <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
              transitionDelay: "500ms"
            }}>
                <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
                  Join a sanctuary where minds meet, hearts connect, and wellness journeys intertwine. More than retreats—it's belonging, growth, and support that lasts well beyond a single day.
                </p>
              </div>
              
              <div className={`flex flex-col sm:flex-row justify-center gap-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
              transitionDelay: "600ms"
            }}>
                <Button size="lg" onClick={() => navigate("/join")} className="bg-brand-primary hover:bg-brand-primary/90 group text-white">
                  Begin Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/login")} className="border-white bg-[#000a0e]/0 text-slate-950">
                  Already a Member? Sign In
                </Button>
              </div>
            </div>
          </div>

          {/* Decorative element moved to bottom with animation */}
          <div className={`absolute bottom-12 left-0 right-0 flex justify-center transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{
          transitionDelay: "800ms"
        }}>
            <div className="w-10 h-10 rounded-full bg-brand-primary/20 backdrop-blur-sm flex items-center justify-center animate-bounce">
              <ArrowRight className="h-5 w-5 text-white rotate-90" />
            </div>
          </div>
        </section>

        {/* Why Join Our Community - Enhanced Section */}
        <section className="py-16 container px-4 md:px-6 overflow-hidden">
          <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-up">
            <span className="inline-block bg-brand-subtle/50 text-brand-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
              The Sanghos Difference
            </span>
            <h2 className="text-3xl font-bold mb-4 text-brand-dark">Why Join Our Community?</h2>
            <p className="text-lg text-muted-foreground">
              The Sanghos community transcends the traditional retreat experience, offering a continuous journey of growth, connection, and well-being that enriches your everyday life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-muted/30 hover:shadow-xl transition-all hover:-translate-y-1 duration-300 overflow-hidden rounded-xl animate-fade-up" style={{
            animationDelay: "100ms"
          }}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-sky"></div>
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-brand-dark">Meaningful Connections</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Find your wellness tribe that truly understands your journey</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Create lasting relationships with like-minded souls</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Share vulnerability and strength in a supportive environment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-muted/30 hover:shadow-xl transition-all hover:-translate-y-1 duration-300 overflow-hidden rounded-xl animate-fade-up" style={{
            animationDelay: "200ms"
          }}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-sky to-brand-peach"></div>
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Share2 className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-brand-dark">Collective Wisdom</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Exchange transformative practices and personal insights</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Learn from diverse perspectives and experiences</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Discover new modalities that resonate with your unique path</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-muted/30 hover:shadow-xl transition-all hover:-translate-y-1 duration-300 overflow-hidden rounded-xl animate-fade-up" style={{
            animationDelay: "300ms"
          }}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-peach to-brand-rose"></div>
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6">
                  <HandHeart className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-brand-dark">Ongoing Support</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Receive encouragement during challenging moments</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Celebrate victories with people who understand their significance</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Maintain momentum in your wellness practice through community</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Community Vision Section - New */}
        <section className="py-16 bg-gradient-to-r from-brand-subtle/30 to-brand-peach/10">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-up">
                <h2 className="text-3xl font-bold mb-6 text-brand-dark">Our Community Vision</h2>
                <p className="text-lg text-brand-slate mb-6">
                  The Sanghos community is more than a network—it's a living ecosystem of growth and connection. Here's how we're creating a space where wellness journeys thrive together:
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-5 w-5 text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-dark mb-2">Thoughtful Discussions</h3>
                      <p className="text-brand-slate">
                        Participate in guided conversations about wellness practices, mindfulness techniques, and holistic living in our online forums.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-dark mb-2">Exclusive Events</h3>
                      <p className="text-brand-slate">
                        Join member-only workshops, virtual gatherings, and special retreat opportunities designed to deepen your practice and connections.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-5 w-5 text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-dark mb-2">Resource Library</h3>
                      <p className="text-brand-slate">
                        Access our growing collection of articles, guided meditations, and practice resources contributed by instructors and community members.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-dark mb-2">Instructor Connections</h3>
                      <p className="text-brand-slate">
                        Build relationships with our expert instructors beyond retreats through Q&A sessions, office hours, and community discussions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative animate-fade-up" style={{
              animationDelay: "200ms"
            }}>
                <div className="absolute -top-4 -bottom-4 -right-4 -left-4 bg-brand-primary/5 rounded-3xl -z-10"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <OptimizedImage src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" alt="Community members in meditation circle" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" aspectRatio="square" />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <OptimizedImage src="https://images.unsplash.com/photo-1501854140801-50d01698950b" alt="Serene mountain view" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" aspectRatio="square" />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <OptimizedImage src="https://images.unsplash.com/photo-1518495973542-4542c06a5843" alt="Sunlight through forest canopy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" aspectRatio="square" />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <OptimizedImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" alt="Group discussion in comfortable setting" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" aspectRatio="square" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Stats Section - Enhanced */}
        <section className="py-12 bg-brand-subtle/20">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-8 animate-fade-up">
              <h2 className="text-2xl font-bold mb-2 text-brand-dark">Our Growing Community</h2>
              <p className="text-brand-slate">Join hundreds of individuals on their journey to wellness and connection</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 animate-fade-up" style={{
              animationDelay: "100ms"
            }}>
                <div className="text-4xl font-bold text-brand-primary mb-2">5,000+</div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </div>
              <div className="p-4 animate-fade-up" style={{
              animationDelay: "200ms"
            }}>
                <div className="text-4xl font-bold text-brand-primary mb-2">120+</div>
                <div className="text-sm text-muted-foreground">Monthly Events</div>
              </div>
              <div className="p-4 animate-fade-up" style={{
              animationDelay: "300ms"
            }}>
                <div className="text-4xl font-bold text-brand-primary mb-2">4.9</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rating</div>
              </div>
              <div className="p-4 animate-fade-up" style={{
              animationDelay: "400ms"
            }}>
                <div className="text-4xl font-bold text-brand-primary mb-2">25K+</div>
                <div className="text-sm text-muted-foreground">Discussion Posts</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials with enhanced cards and more authentic content */}
        <section className="py-16 container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up text-brand-dark">Voices from Our Community</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-white to-brand-subtle/20 border-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-up" style={{
              animationDelay: "100ms"
            }}>
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 text-brand-peach flex">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-brand-peach text-brand-peach" />)}
                    </div>
                    <p className="italic mb-6 flex-grow text-brand-slate">
                      "The Sanghos community has been my anchor during a challenging year. Beyond the amazing retreats, it's the ongoing connections that have made the biggest difference. I've found friends who understand the importance of mindfulness and support each other's growth."
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-brand-primary/10 rounded-full mr-3 overflow-hidden border-2 border-white shadow-md">
                        <OptimizedImage src="https://i.pravatar.cc/100?u=sarah" alt="Sarah J." className="w-full h-full object-cover" aspectRatio="square" />
                      </div>
                      <div>
                        <p className="font-medium text-brand-dark">Sarah J.</p>
                        <p className="text-sm text-muted-foreground">Member since 2023</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-white to-brand-subtle/20 border-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-up" style={{
              animationDelay: "200ms"
            }}>
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 text-brand-peach flex">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-brand-peach text-brand-peach" />)}
                    </div>
                    <p className="italic mb-6 flex-grow text-brand-slate">
                      "I was hesitant to join at first, thinking it might just be another social platform. But Sanghos has created something special—a genuine community where vulnerability is welcomed and growth is celebrated. The discussions and shared practices have deepened my wellness journey in ways I never expected."
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-brand-primary/10 rounded-full mr-3 overflow-hidden border-2 border-white shadow-md">
                        <OptimizedImage src="https://i.pravatar.cc/100?u=michael" alt="Michael T." className="w-full h-full object-cover" aspectRatio="square" />
                      </div>
                      <div>
                        <p className="font-medium text-brand-dark">Michael T.</p>
                        <p className="text-sm text-muted-foreground">Member since 2022</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-white to-brand-subtle/20 border-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-up md:col-span-2" style={{
              animationDelay: "300ms"
            }}>
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 text-brand-peach flex">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-brand-peach text-brand-peach" />)}
                    </div>
                    <p className="italic mb-6 flex-grow text-brand-slate">
                      "Being part of Sanghos has transformed not just how I approach wellness, but how I connect with others. The community has this beautiful balance of spiritual depth and practical support. I've found teachers who inspire me and friends who challenge me to grow. In a world that can feel disconnected, Sanghos has created a true sanctuary of belonging."
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-brand-primary/10 rounded-full mr-3 overflow-hidden border-2 border-white shadow-md">
                        <OptimizedImage src="https://i.pravatar.cc/100?u=elena" alt="Elena K." className="w-full h-full object-cover" aspectRatio="square" />
                      </div>
                      <div>
                        <p className="font-medium text-brand-dark">Elena K.</p>
                        <p className="text-sm text-muted-foreground">Member since 2021</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Newsletter Section - New */}
        <section className="py-16 bg-brand-primary/5 border-y border-brand-primary/10">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center p-2 mb-6 rounded-full bg-white/80 backdrop-blur-sm shadow-md animate-fade-up">
                <Heart className="h-5 w-5 text-brand-rose mr-2" />
                <span className="text-sm font-medium pr-2 text-brand-dark">Stay connected with our community</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 animate-fade-up text-brand-dark" style={{
              animationDelay: "100ms"
            }}>Join Our Newsletter</h2>
              <p className="text-lg text-brand-slate mb-8 animate-fade-up" style={{
              animationDelay: "200ms"
            }}>
                Be the first to know about new community features, upcoming events, and wellness insights from our instructors and members.
              </p>
              
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto animate-fade-up" style={{
              animationDelay: "300ms"
            }}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Textarea placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} className="resize-none h-12 focus-visible:ring-brand-primary" />
                  <Button type="submit" className="bg-brand-primary hover:bg-brand-primary/90 text-white whitespace-nowrap">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center sm:text-left">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* CTA Section with enhanced styling */}
        <section className="py-16 bg-gradient-to-tr from-brand-primary/10 to-brand-subtle/20 border-t border-b border-brand-primary/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07')] opacity-5 bg-cover bg-center"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center p-1 mb-8 rounded-full bg-white/80 backdrop-blur-sm shadow-md animate-fade-up">
                <Heart className="h-5 w-5 text-brand-rose mr-2" />
                <span className="text-sm font-medium pr-2 text-brand-dark">Your journey awaits</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 animate-fade-up text-brand-dark" style={{
              animationDelay: "100ms"
            }}>Ready to Begin Your Journey?</h2>
              <p className="text-lg text-brand-slate mb-8 animate-fade-up" style={{
              animationDelay: "200ms"
            }}>
                Take the first step toward a more connected wellness experience. Join Sanghos today and become part of a community that supports, inspires, and grows together.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up" style={{
              animationDelay: "300ms"
            }}>
                <Button size="lg" onClick={() => navigate("/join")} className="group bg-brand-primary hover:bg-brand-primary/90 text-white">
                  Join Sanghos Now
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/retreats")} className="border-brand-primary text-brand-primary hover:bg-brand-primary/5">
                  Explore Our Retreats
                </Button>
              </div>
              
              <div className="mt-8 pt-8 border-t border-brand-primary/10 text-sm text-muted-foreground animate-fade-up" style={{
              animationDelay: "400ms"
            }}>
                <p>Already a member? <Link to="/login" className="text-brand-primary hover:underline">Sign in here</Link></p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>;
};
export default CommunityTeaser;