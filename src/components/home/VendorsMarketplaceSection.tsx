import { motion } from "framer-motion";
import { ArrowRight, Home, ChefHat, Car, Camera, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const VendorsMarketplaceSection = () => {
  const quickCategories = [
    { icon: Home, title: "Properties", count: "200+" },
    { icon: ChefHat, title: "Chefs", count: "50+" },
    { icon: Car, title: "Transport", count: "75+" },
    { icon: Camera, title: "Content", count: "30+" },
    { icon: Users, title: "Practitioners", count: "150+" },
    { icon: Target, title: "Experiences", count: "100+" },
  ];

  return (
    <section className="py-section bg-gradient-to-br from-brand-subtle/30 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-radial from-brand-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-radial from-brand-rose/10 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center space-x-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>Coming Soon</span>
              <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-brand-dark">Vetted Vendors</span>
              <br />
              <span className="text-brand-primary">Marketplace</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Skip the endless research. Find trusted retreat vendors handpicked by our community of wellness professionals - from properties to chefs, transport to content creators.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-brand-primary rounded-full" />
                <span className="text-muted-foreground">Save 20+ hours per retreat planning</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-brand-primary rounded-full" />
                <span className="text-muted-foreground">Community-vetted quality assurance</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-brand-primary rounded-full" />
                <span className="text-muted-foreground">Transparent pricing and availability</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-brand-primary hover:bg-brand-primary/90 text-white">
                <Link to="/vendors-marketplace-teaser">
                  Join Waitlist
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-brand-primary/20 text-brand-primary hover:bg-brand-primary/5" asChild>
                <Link to="/vendors-marketplace-teaser">Learn More</Link>
              </Button>
            </div>
          </motion.div>
          
          {/* Right Column - Enhanced Vendor Showcase Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {quickCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="group relative overflow-hidden backdrop-blur-sm bg-white/70 border-brand-primary/20 hover:border-brand-primary/40 shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer h-full">
                    {/* Gradient Background Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-sand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <CardContent className="relative p-8 text-center flex flex-col justify-between h-full">
                      {/* Icon Container */}
                      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                        <category.icon className="h-8 w-8 text-brand-primary group-hover:text-brand-primary transition-colors duration-300" />
                      </div>
                      
                      {/* Content */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-primary transition-colors duration-300">
                          {category.title}
                        </h3>
                        
                        {/* Large Count Display */}
                        <div className="space-y-1">
                          <p className="text-3xl font-bold text-brand-primary group-hover:scale-105 transition-transform duration-300">
                            {category.count}
                          </p>
                          <div className="inline-flex items-center space-x-2 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-sm font-medium">
                            <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
                            <span>Coming Soon</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-primary/10 via-transparent to-brand-sand/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="absolute -top-4 -right-4 bg-brand-rose text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
            >
              Q2 2025 Launch
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VendorsMarketplaceSection;