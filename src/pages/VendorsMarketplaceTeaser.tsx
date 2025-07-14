import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Home, 
  ChefHat, 
  Video, 
  Car, 
  UserCheck2, 
  Target,
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Sparkles,
  Mail,
  Star,
  Calendar,
  Heart,
  HelpCircle,
  AlertCircle,
  Info,
  Calendar as CalendarIcon,
  Rocket,
  Trophy,
  Award,
  MessageSquare,
  TrendingUp,
  Users
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
      color: "from-brand-primary/20 to-brand-primary/40",
      count: "250+"
    },
    {
      icon: ChefHat,
      title: "Private Chefs & Catering",
      description: "Plant-based specialists, dietary experts, and culinary artists who understand wellness cuisine",
      highlight: "Wellness-focused menus",
      color: "from-brand-sand/20 to-brand-sand/40",
      count: "85+"
    },
    {
      icon: Car,
      title: "Premium Transportation",
      description: "Group shuttles, luxury transfers, and eco-friendly transport solutions for seamless logistics",
      highlight: "Group-ready vehicles",
      color: "from-brand-rose/20 to-brand-rose/40",
      count: "120+"
    },
    {
      icon: Video,
      title: "Content & Documentation",
      description: "Photographers and videographers specializing in wellness, mindfulness, and retreat storytelling",
      highlight: "Retreat storytellers",
      color: "from-brand-sky/20 to-brand-sky/40",
      count: "45+"
    },
    {
      icon: UserCheck2,
      title: "Additional Practitioners",
      description: "Guest teachers, therapists, and wellness professionals to enhance your retreat offerings",
      highlight: "Certified experts",
      color: "from-brand-slate/20 to-brand-slate/40",
      count: "190+"
    },
    {
      icon: Target,
      title: "Experience Enhancers",
      description: "Sound healers, adventure guides, and specialized facilitators for unique retreat moments",
      highlight: "Transformative add-ons",
      color: "from-brand-subtle/20 to-brand-subtle/40",
      count: "75+"
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
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="inline-flex items-center space-x-3 bg-brand-primary/20 text-white border border-brand-primary/40 px-6 py-3 rounded-full text-lg font-semibold mb-8 backdrop-blur-md shadow-lg"
              >
                <Sparkles className="w-5 h-5" />
                <span>Coming Soon</span>
                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
              </motion.div>
              
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
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="inline-flex items-center space-x-3 bg-white/10 text-white px-6 py-3 rounded-full text-base font-medium backdrop-blur-md border border-white/20 shadow-lg"
              >
                <Rocket className="w-5 h-5" />
                <span>Phase 1 launching Q2 2025 • Invitation-only beta access</span>
              </motion.div>
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
                <Card className="h-full hover:shadow-xl transition-all duration-500 group cursor-pointer border-brand-primary/10 hover:border-brand-primary/30 hover:-translate-y-1 overflow-hidden relative">
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-sand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                        <category.icon className="h-7 w-7 text-brand-primary" />
                      </div>
                      <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 text-xs font-semibold px-3 py-1">
                        {category.count}
                      </Badge>
                    </div>
                    
                    <Badge variant="secondary" className="mb-3 text-xs font-medium bg-brand-subtle/50 text-brand-dark hover:bg-brand-subtle/70 transition-colors">
                      {category.highlight}
                    </Badge>
                    
                    <h3 className="text-lg font-bold mb-3 text-brand-dark group-hover:text-brand-primary transition-colors duration-300">{category.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                    
                    {/* Hover indicator */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="h-4 w-4 text-brand-primary" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Waitlist Form with FAQ */}
      <section className="py-20 bg-gradient-to-br from-brand-primary/10 to-brand-sky/10 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-10 right-10 w-80 h-80 bg-gradient-radial from-brand-primary/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-radial from-brand-sky/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-2 bg-brand-primary/20 text-brand-primary px-6 py-3 rounded-full text-base font-semibold mb-8 backdrop-blur-md border border-brand-primary/30 shadow-lg">
              <Mail className="w-5 h-5" />
              <span>Early Access</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-dark">
              Join the 
              <br />
              <span className="text-brand-primary">Waitlist</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Be the first to access our vetted vendors marketplace and help shape the future of retreat planning
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Waitlist Form */}
            <div className="lg:col-span-2">
              {!isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-8 md:p-12 bg-white/80 backdrop-blur-md border-brand-primary/30 shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="email" className="block text-base font-semibold text-brand-dark mb-3">
                            Email Address
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            className="h-14 text-lg border-brand-primary/30 focus:border-brand-primary focus:ring-brand-primary/30 rounded-xl shadow-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-base font-semibold text-brand-dark mb-6">
                            I'm interested as a:
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                              { value: "host", label: "Retreat Host", description: "I organize wellness retreats", icon: Users },
                              { value: "vendor", label: "Vendor", description: "I provide retreat services", icon: Target },
                              { value: "both", label: "Both", description: "I'm both host and vendor", icon: Heart }
                            ].map((option) => (
                              <label
                                key={option.value}
                                className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                                  role === option.value
                                    ? "border-brand-primary bg-brand-primary/10 text-brand-primary shadow-lg"
                                    : "border-brand-primary/20 hover:border-brand-primary/40 text-brand-dark hover:bg-brand-primary/5 hover:shadow-md"
                                }`}
                              >
                                <div className="flex items-start space-x-4">
                                  <input
                                    type="radio"
                                    name="role"
                                    value={option.value}
                                    checked={role === option.value}
                                    onChange={(e) => setRole(e.target.value as "host" | "vendor" | "both")}
                                    className="sr-only"
                                  />
                                  <div className={`w-5 h-5 rounded-full border-2 mt-1 ${
                                    role === option.value ? "border-brand-primary bg-brand-primary" : "border-brand-primary/40"
                                  } flex items-center justify-center flex-shrink-0`}>
                                    {role === option.value && (
                                      <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <option.icon className="h-5 w-5" />
                                      <div className="font-bold text-base">{option.label}</div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">{option.description}</div>
                                  </div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-gradient-to-r from-brand-primary via-brand-primary to-brand-primary/90 hover:from-brand-primary/90 hover:via-brand-primary/90 hover:to-brand-primary text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] font-semibold"
                      >
                        <span>Join the Waitlist</span>
                        <ArrowRight className="ml-3 h-5 w-5" />
                      </Button>
                      
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                          By joining, you'll receive early access invitations and exclusive updates.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          No spam, unsubscribe anytime.
                        </p>
                      </div>
                    </form>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <Card className="p-12 bg-white/80 backdrop-blur-md border-brand-primary/30 shadow-2xl">
                    <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
                      <CheckCircle className="h-12 w-12 text-brand-primary" />
                    </div>
                    <h3 className="text-3xl font-bold text-brand-dark mb-6">
                      You're on the list! 🎉
                    </h3>
                    <p className="text-lg text-muted-foreground mb-8">
                      Thank you for joining our waitlist. We'll notify you as soon as Phase 1 launches.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      <div className="flex items-center space-x-3 p-4 bg-brand-primary/5 rounded-lg">
                        <Calendar className="h-5 w-5 text-brand-primary" />
                        <span className="text-brand-dark font-medium">Expected launch: Q2 2025</span>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-brand-primary/5 rounded-lg">
                        <Users className="h-5 w-5 text-brand-primary" />
                        <span className="text-brand-dark font-medium">Priority access guaranteed</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* FAQ Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-brand-dark mb-2">Quick FAQ</h3>
                <p className="text-muted-foreground">Common questions about the marketplace</p>
              </div>

              {[
                {
                  icon: HelpCircle,
                  question: "When will it launch?",
                  answer: "Phase 1 beta launches Q2 2025 with invitation-only access for waitlist members."
                },
                {
                  icon: Shield,
                  question: "How are vendors vetted?",
                  answer: "Through community reviews, verification documents, and our quality standards checklist."
                },
                {
                  icon: Info,
                  question: "Is it free to join?",
                  answer: "Joining the waitlist is free. Marketplace access will have transparent commission-based pricing."
                },
                {
                  icon: Star,
                  question: "What makes it different?",
                  answer: "Community-driven vetting, retreat-specific focus, and integrated booking platform."
                }
              ].map((faq, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-brand-primary/10 hover:border-brand-primary/20">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                      <faq.icon className="h-5 w-5 text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-dark mb-2">{faq.question}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VendorsMarketplaceTeaser;