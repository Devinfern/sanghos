
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Star, Home, Hotel, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const HomeWellnessProperties = () => {
  const properties = [
    {
      id: 1,
      name: "Esalen Institute",
      location: "Big Sur, California",
      type: "Retreat Center",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      features: ["Hot Springs", "Ocean Views", "Workshops"],
      icon: <Home className="h-4 w-4" />,
      website: "https://www.esalen.org"
    },
    {
      id: 2,
      name: "The Ranch Malibu",
      location: "Malibu, California",
      type: "Wellness Resort",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      features: ["Fitness Bootcamp", "Hiking", "Plant-Based Cuisine"],
      icon: <Hotel className="h-4 w-4" />,
      website: "https://www.theranchmalibu.com"
    },
    {
      id: 3,
      name: "Kripalu Center",
      location: "Stockbridge, Massachusetts",
      type: "Yoga Retreat",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      features: ["Yoga Programs", "Meditation", "Wellness Workshops"],
      icon: <Home className="h-4 w-4" />,
      website: "https://kripalu.org"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-sage-50/30 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.span 
            className="text-sm font-medium text-brand-primary uppercase tracking-wider mb-3 block"
            variants={itemVariants}
          >
            Wellness Properties
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-6 leading-tight"
            variants={itemVariants}
          >
            Find Your Perfect
            <span className="block text-brand-primary">Wellness Retreat</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-brand-slate max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Discover vetted wellness properties, from serene retreat centers and mindful Airbnbs 
            to boutique wellness hotels and peaceful cottages designed for transformation.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {properties.map((property, index) => (
            <motion.div key={property.id} variants={itemVariants}>
              <Card className="group overflow-hidden border border-sand-200 hover:border-brand-primary/30 transition-all duration-300 hover:shadow-xl bg-white h-full flex flex-col rounded-xl">
                <div className="relative overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-white/90 text-brand-dark backdrop-blur-sm shadow-md">
                      <span className="flex items-center gap-1">
                        {property.icon}
                        {property.type}
                      </span>
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-brand-dark backdrop-blur-sm shadow-md">
                      <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                      {property.rating}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-5 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">
                      {property.name}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4 mr-2 text-brand-primary/80 flex-shrink-0" />
                      <span>{property.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Button 
                      variant="outline" 
                      className="w-full border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white group"
                      asChild
                    >
                      <a href={property.website} target="_blank" rel="noopener noreferrer">
                        Visit Website
                        <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <Button 
            size="lg" 
            className="bg-brand-primary hover:bg-brand-primary/90 text-white group rounded-full px-8 py-6 text-lg"
            asChild
          >
            <Link to="/wellness-studios">
              Explore All Wellness Properties
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <p className="text-sm text-brand-slate mt-4">
            Over 500+ vetted wellness properties worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeWellnessProperties;
