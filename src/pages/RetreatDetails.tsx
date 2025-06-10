
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, Calendar, MapPin, Users, Clock, Tag, Loader2, ExternalLink } from "lucide-react";
import { retreats, formatDate, formatCurrency, getRemainingText } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { fetchInsightLAEvents } from "@/lib/insightEvents";
import { motion } from "framer-motion";
import OptimizedImage from "@/components/OptimizedImage";

const RetreatDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [retreat, setRetreat] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRetreatDetails = async () => {
      try {
        // Load retreats from Sanghos
        const sanghosRetreats = await retreats;
        
        // Load InsightLA events
        const insightLARetreats = await fetchInsightLAEvents().catch(err => {
          console.error("Failed to load InsightLA retreats:", err);
          return [];
        });
        
        // Combine all retreats
        const allRetreats = [...sanghosRetreats, ...insightLARetreats];
        
        // Find retreat with matching id
        const foundRetreat = allRetreats.find(r => r.id === id);
        
        if (foundRetreat) {
          setRetreat(foundRetreat);
          // Trigger animation after retreat is loaded
          setTimeout(() => {
            setIsVisible(true);
          }, 100);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching retreat details:", error);
        setIsLoading(false);
      }
    };
    
    fetchRetreatDetails();
  }, [id]);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-sage-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Loading Retreat Details</h2>
            <p className="text-muted-foreground">Please wait while we fetch the retreat information...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!retreat) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Retreat Not Found</h2>
            <Button asChild>
              <Link to="/retreats">View All Retreats</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{retreat.title} | Sanghos</title>
        <meta name="description" content={retreat.description} />
      </Helmet>

      <Header />

      <main className="pt-24 min-h-screen bg-white">
        {/* Back Button */}
        <div className="absolute top-28 left-6 z-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button asChild variant="ghost" size="sm" className="group bg-white/90 backdrop-blur-sm hover:bg-white">
              <Link to="/retreats">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to All Retreats
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left Side - Hero Image with Overlay */}
          <div className="relative h-96 lg:h-screen overflow-hidden">
            <OptimizedImage
              src={retreat.image}
              alt={retreat.title}
              className="w-full h-full object-cover"
              aspectRatio="custom"
              priority={true}
            />
            
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Overlay Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-8 text-white"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {retreat.category.map((cat: string) => (
                  <Badge key={cat} variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    {cat}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">{retreat.title}</h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/90">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span className="font-medium">{formatDate(retreat.date)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>{retreat.time} • {retreat.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>{retreat.location.city}, {retreat.location.state}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>{getRemainingText(retreat.remaining)}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Content Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:h-screen lg:overflow-y-auto"
          >
            <div className="p-8 lg:p-12 space-y-8">
              {/* Price and Booking Section */}
              <div className="lg:sticky lg:top-0 bg-white z-10 pb-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {formatCurrency(retreat.price)}
                    </div>
                    <Badge 
                      variant={retreat.remaining < 5 ? "secondary" : "outline"} 
                      className={retreat.remaining < 5 ? "bg-amber-100 text-amber-700" : ""}
                    >
                      {getRemainingText(retreat.remaining)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <OptimizedImage
                        src={retreat.instructor.image}
                        alt={retreat.instructor.name}
                        className="w-full h-full object-cover"
                        aspectRatio="square"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{retreat.instructor.name}</h3>
                      <p className="text-sm text-gray-500">{retreat.instructor.title}</p>
                    </div>
                  </div>
                </div>

                {/* Booking Buttons */}
                <div className="flex gap-3">
                  {retreat.sourceUrl ? (
                    <Button asChild className="flex-1 h-12 text-base bg-sage-600 hover:bg-sage-700">
                      <a href={retreat.sourceUrl} target="_blank" rel="noopener noreferrer">
                        Book on {retreat.organizer?.name || 'External Site'}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  ) : (
                    <Button disabled={retreat.remaining <= 0} asChild className="flex-1 h-12 text-base">
                      <Link to={`/booking/${retreat.id}`}>
                        {retreat.remaining > 0 ? "Book Now" : "Sold Out"}
                      </Link>
                    </Button>
                  )}
                  
                  <Button variant="outline" asChild className="h-12 px-6">
                    <Link to={`/instructor/${retreat.instructor.id}`}>
                      Instructor
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">About This Retreat</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{retreat.description}</p>
              </div>

              {/* Location Details */}
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Location</h3>
                <div className="bg-sage-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-2">{retreat.location.name}</h4>
                  <p className="text-gray-600 mb-2">{retreat.location.city}, {retreat.location.state}</p>
                  <p className="text-sm text-gray-500 italic">{retreat.location.description}</p>
                </div>
              </div>

              {/* What's Included */}
              {retreat.amenities && retreat.amenities.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">What's Included</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {retreat.amenities.map((amenity: string, i: number) => (
                      <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Tag className="h-4 w-4 text-sage-500 flex-shrink-0" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructor Bio */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Your Instructor</h3>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                      <OptimizedImage
                        src={retreat.instructor.image}
                        alt={retreat.instructor.name}
                        className="w-full h-full object-cover"
                        aspectRatio="square"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-1">{retreat.instructor.name}</h4>
                      <p className="text-sage-600 mb-2">{retreat.instructor.title}</p>
                      <div className="flex flex-wrap gap-1">
                        {retreat.instructor.specialties.map((specialty: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{retreat.instructor.bio}</p>
                </div>
              </div>

              {/* Original Event Link */}
              {retreat.sourceUrl && (
                <div className="border-t border-gray-100 pt-6">
                  <p className="text-sm text-gray-500 mb-3">
                    For more details and the latest information, visit the official event page:
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <a href={retreat.sourceUrl} target="_blank" rel="noopener noreferrer">
                      View on {retreat.organizer?.name || 'Original Website'}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}

              {/* Support Section */}
              <div className="bg-sage-50 rounded-lg p-6 text-center">
                <h3 className="font-semibold mb-2 text-gray-900">Need assistance?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  If you have questions about this retreat or need help with your booking, our team is here to help.
                </p>
                <Button variant="secondary" className="w-full">
                  Contact Support
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RetreatDetails;
