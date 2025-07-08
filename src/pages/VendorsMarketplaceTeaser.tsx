import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Home, 
  ChefHat, 
  Camera, 
  Car, 
  Users, 
  Target,
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Sparkles,
  Mail,
  Star,
  Calendar,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const VendorsMarketplaceTeaser = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"host" | "vendor" | "both">("host");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with newsletter signup
    setIsSubmitted(true);
  };

  const vendorCategories = [
    {
      icon: Home,
      title: "Retreat-Ready Properties",
      description: "Handpicked Airbnbs, private estates, and wellness centers designed for transformative experiences",
      highlight: "Vetted for group stays",
      color: "from-brand-primary/20 to-brand-primary/40"
    },
    {
      icon: ChefHat,
      title: "Private Chefs & Catering",
      description: "Plant-based specialists, dietary experts, and culinary artists who understand wellness cuisine",
      highlight: "Wellness-focused menus",
      color: "from-brand-sand/20 to-brand-sand/40"
    },
    {
      icon: Car,
      title: "Premium Transportation",
      description: "Group shuttles, luxury transfers, and eco-friendly transport solutions for seamless logistics",
      highlight: "Group-ready vehicles",
      color: "from-brand-rose/20 to-brand-rose/40"
    },
    {
      icon: Camera,
      title: "Content & Documentation",
      description: "Photographers and videographers specializing in wellness, mindfulness, and retreat storytelling",
      highlight: "Retreat storytellers",
      color: "from-brand-sky/20 to-brand-sky/40"
    },
    {
      icon: Users,
      title: "Additional Practitioners",
      description: "Guest teachers, therapists, and wellness professionals to enhance your retreat offerings",
      highlight: "Certified experts",
      color: "from-brand-slate/20 to-brand-slate/40"
    },
    {
      icon: Target,
      title: "Experience Enhancers",
      description: "Sound healers, adventure guides, and specialized facilitators for unique retreat moments",
      highlight: "Transformative add-ons",
      color: "from-brand-subtle/20 to-brand-subtle/40"
    }
  ];

  const hostBenefits = [
    {
      icon: Clock,
      title: "Save 20+ Hours Per Retreat",
      description: "Skip endless vendor research with our pre-vetted marketplace"
    },
    {
      icon: Shield,
      title: "Community-Vetted Quality",
      description: "Every vendor is reviewed and recommended by fellow retreat hosts"
    },
    {
      icon: Star,
      title: "Transparent Pricing",
      description: "Clear rates, availability, and booking terms upfront"
    },
    {
      icon: Heart,
      title: "Integrated Communication",
      description: "Streamlined messaging and booking through one platform"
    }
  ];

  const vendorBenefits = [
    {
      icon: Users,
      title: "Connect with Serious Organizers",
      description: "Reach retreat hosts actively planning wellness experiences"
    },
    {
      icon: Sparkles,
      title: "Showcase Your Specialization",
      description: "Highlight your wellness industry expertise and unique offerings"
    },
    {
      icon: Calendar,
      title: "Streamlined Booking",
      description: "Simplified inquiry and booking process saves time"
    },
    {
      icon: CheckCircle,
      title: "Build Your Network",
      description: "Join a community of wellness professionals and grow referrals"
    }
  ];

  const timelinePhases = [
    {
      phase: "Phase 1",
      date: "Q2 2025",
      title: "Beta Launch",
      description: "Invitation-only access for select hosts and vendors",
      status: "upcoming"
    },
    {
      phase: "Phase 2", 
      date: "Q3 2025",
      title: "Public Marketplace",
      description: "Full marketplace with reviews, ratings, and booking integration",
      status: "planned"
    },
    {
      phase: "Phase 3",
      date: "Q4 2025", 
      title: "Advanced Features",
      description: "AI matching, group packages, and vendor analytics",
      status: "planned"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Cinematic Background with Overlays */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/60 to-transparent z-10" />
          <motion.div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/lovable-uploads/eb5e3a10-e1d3-49a7-9bd6-f9cfd8a697fc.jpg')"
            }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 20, ease: "easeOut" }}
          />
          
          {/* Ambient Lighting Effects */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-radial from-brand-primary/20 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-32 left-32 w-80 h-80 bg-gradient-radial from-brand-rose/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Main Content */}
        <div className="relative z-20 min-h-screen flex items-center">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="max-w-4xl mx-auto text-center"
            >
              <Badge className="mb-6 bg-brand-primary/10 text-white border-brand-primary/30 backdrop-blur-sm">
                Coming Soon
              </Badge>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] mb-8">
                <span className="font-light">Vetted</span>
                <br />
                <span className="font-serif italic text-brand-rose">Vendors</span>
                <br />
                <span className="font-bold">Marketplace</span>
              </h1>
              
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-3xl mx-auto">
                Find trusted vendors for your perfect retreat - handpicked by our community of wellness professionals
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-brand-primary via-brand-primary to-brand-primary/80 hover:from-brand-primary/90 hover:via-brand-primary/90 hover:to-brand-primary text-white px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <span className="text-lg font-semibold">Join the Waitlist</span>
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="group bg-gradient-to-r from-brand-rose/10 to-brand-rose/20 hover:from-brand-rose/20 hover:to-brand-rose/30 border-2 border-brand-rose/30 hover:border-brand-rose/50 text-white hover:text-white px-8 py-6 rounded-2xl backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <Sparkles className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-lg font-medium">Nominate a Vendor</span>
                </Button>
              </div>
              
              <p className="text-sm text-white/60">
                🎯 Phase 1 launching Q2 2025 • Invitation-only beta access
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vendor Categories */}
      <section className="py-16 bg-brand-subtle/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Six Essential Vendor Categories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create unforgettable wellness experiences, all in one curated marketplace
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendorCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer border-brand-primary/10 hover:border-brand-primary/20">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="h-6 w-6 text-brand-primary" />
                    </div>
                    
                    <Badge variant="secondary" className="mb-3 text-xs">
                      {category.highlight}
                    </Badge>
                    
                    <h3 className="text-lg font-semibold mb-2 text-brand-dark">{category.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits for Hosts */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Built for Retreat Hosts
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Spend less time searching and more time creating transformative experiences
              </p>
              
              <div className="space-y-6">
                {hostBenefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-5 w-5 text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-brand-dark">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-sand/20 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-brand-primary mb-2">20+</div>
                  <div className="text-lg font-medium mb-4 text-brand-dark">Hours Saved</div>
                  <div className="text-sm text-muted-foreground">Per retreat planned</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits for Vendors */}
      <section className="py-16 bg-brand-subtle/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Opportunities for Vendors
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join a curated network of wellness professionals and grow your business
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vendorBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 border-brand-primary/10 hover:border-brand-primary/20">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-6 w-6 text-brand-primary" />
                    </div>
                    <h3 className="font-semibold mb-2 text-brand-dark">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Launch Timeline
            </h2>
            <p className="text-lg text-muted-foreground">
              Our roadmap to creating the ultimate vendors marketplace
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timelinePhases.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        phase.status === 'upcoming' ? 'bg-brand-primary text-white' : 'bg-muted text-muted-foreground'
                      }`}>
                        <span className="text-sm font-semibold">{index + 1}</span>
                      </div>
                    </div>
                    
                    <Card className="flex-1">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center space-x-3 mb-1">
                              <h3 className="text-lg font-semibold text-brand-dark">{phase.title}</h3>
                              <Badge variant={phase.status === 'upcoming' ? 'default' : 'secondary'} className={phase.status === 'upcoming' ? 'bg-brand-primary text-white' : ''}>
                                {phase.phase}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>
                          </div>
                          <div className="text-sm font-medium text-brand-primary">{phase.date}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {index < timelinePhases.length - 1 && (
                    <div className="absolute left-6 top-12 w-px h-8 bg-border" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Signup */}
      <section className="py-16 bg-brand-primary text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            {!isSubmitted ? (
              <>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Join the Waitlist
                </h2>
                <p className="text-lg text-white/80 mb-8">
                  Be the first to access our vetted vendors marketplace and help shape the future of retreat planning
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                    <Button 
                      type="submit"
                      variant="secondary"
                      className="px-8"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Join Waitlist
                    </Button>
                  </div>
                  
                  <div className="flex justify-center space-x-6 text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="host"
                        checked={role === "host"}
                        onChange={(e) => setRole(e.target.value as "host")}
                        className="text-white"
                      />
                      <span>I'm a Retreat Host</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="vendor"
                        checked={role === "vendor"}
                        onChange={(e) => setRole(e.target.value as "vendor")}
                        className="text-white"
                      />
                      <span>I'm a Vendor</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="both"
                        checked={role === "both"}
                        onChange={(e) => setRole(e.target.value as "both")}
                        className="text-white"
                      />
                      <span>Both</span>
                    </label>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center">
                <CheckCircle className="h-16 w-16 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">You're on the list!</h2>
                <p className="text-white/80">
                  We'll notify you as soon as the vendors marketplace launches.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VendorsMarketplaceTeaser;