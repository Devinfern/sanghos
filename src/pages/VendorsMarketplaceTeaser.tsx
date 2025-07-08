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
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      icon: ChefHat,
      title: "Private Chefs & Catering",
      description: "Plant-based specialists, dietary experts, and culinary artists who understand wellness cuisine",
      highlight: "Wellness-focused menus",
      color: "from-green-500/20 to-green-600/20"
    },
    {
      icon: Car,
      title: "Premium Transportation",
      description: "Group shuttles, luxury transfers, and eco-friendly transport solutions for seamless logistics",
      highlight: "Group-ready vehicles",
      color: "from-purple-500/20 to-purple-600/20"
    },
    {
      icon: Camera,
      title: "Content & Documentation",
      description: "Photographers and videographers specializing in wellness, mindfulness, and retreat storytelling",
      highlight: "Retreat storytellers",
      color: "from-pink-500/20 to-pink-600/20"
    },
    {
      icon: Users,
      title: "Additional Practitioners",
      description: "Guest teachers, therapists, and wellness professionals to enhance your retreat offerings",
      highlight: "Certified experts",
      color: "from-orange-500/20 to-orange-600/20"
    },
    {
      icon: Target,
      title: "Experience Enhancers",
      description: "Sound healers, adventure guides, and specialized facilitators for unique retreat moments",
      highlight: "Transformative add-ons",
      color: "from-teal-500/20 to-teal-600/20"
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
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute inset-0 bg-[url('/lovable-uploads/eb5e3a10-e1d3-49a7-9bd6-f9cfd8a697fc.jpg')] bg-cover bg-center opacity-5" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Coming Soon
            </Badge>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
              Vetted Vendors
              <br />
              <span className="font-light">Marketplace</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Find trusted vendors for your perfect retreat - handpicked by our community of wellness professionals
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="px-8 py-6 text-lg">
                Join the Waitlist
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                Nominate a Vendor
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              🎯 Phase 1 launching Q2 2025 • Invitation-only beta access
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vendor Categories */}
      <section className="py-16 bg-muted/30">
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
                <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    
                    <Badge variant="secondary" className="mb-3 text-xs">
                      {category.highlight}
                    </Badge>
                    
                    <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
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
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{benefit.title}</h3>
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
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">20+</div>
                  <div className="text-lg font-medium mb-4">Hours Saved</div>
                  <div className="text-sm text-muted-foreground">Per retreat planned</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits for Vendors */}
      <section className="py-16 bg-muted/30">
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
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
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
                        phase.status === 'upcoming' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        <span className="text-sm font-semibold">{index + 1}</span>
                      </div>
                    </div>
                    
                    <Card className="flex-1">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center space-x-3 mb-1">
                              <h3 className="text-lg font-semibold">{phase.title}</h3>
                              <Badge variant={phase.status === 'upcoming' ? 'default' : 'secondary'}>
                                {phase.phase}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>
                          </div>
                          <div className="text-sm font-medium text-primary">{phase.date}</div>
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
      <section className="py-16 bg-primary text-primary-foreground">
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
                <p className="text-lg text-primary-foreground/80 mb-8">
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
                      className="flex-1 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60"
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
                        className="text-primary-foreground"
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
                        className="text-primary-foreground"
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
                        className="text-primary-foreground"
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
                <p className="text-primary-foreground/80">
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