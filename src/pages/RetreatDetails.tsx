
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, Calendar, MapPin, Users, Clock, Tag, Loader2, ExternalLink, Heart } from "lucide-react";
import { retreats, formatDate, formatCurrency, getRemainingText } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { fetchInsightLAEvents } from "@/lib/insightEvents";
import OptimizedImage from "@/components/OptimizedImage";
import { motion } from "framer-motion";

const RetreatDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [retreat, setRetreat] = useState<any>(null);
  const [activeImage, setActiveImage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

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
          setActiveImage(foundRetreat.image);
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

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

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

      <main className="pt-24 pb-16 bg-sage-50/30">
        <div className="container px-4 md:px-6">
          {/* Back Button */}
          <div className="mb-6">
            <Button asChild variant="ghost" size="sm" className="group">
              <Link to="/retreats" className="flex items-center text-sage-700">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to All Retreats
              </Link>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left Column - Images & Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="overflow-hidden border-none shadow-md">
                {/* Main Image */}
                <div className="relative aspect-video rounded-t-xl overflow-hidden bg-gray-100">
                  <OptimizedImage
                    src={activeImage}
                    alt={retreat.title}
                    aspectRatio="custom"
                    className="w-full h-[400px]"
                    objectFit="cover"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`absolute top-4 right-4 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white ${isFavorite ? 'text-red-500' : 'text-gray-600'}`}
                    onClick={handleToggleFavorite}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                </div>

                {/* Image Gallery */}
                <div className="p-4 bg-white">
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => setActiveImage(retreat.image)}
                      className={cn(
                        "aspect-square rounded-md overflow-hidden transition-all duration-300",
                        activeImage === retreat.image ? "ring-2 ring-sage-500 scale-[0.98]" : "hover:opacity-80"
                      )}
                    >
                      <OptimizedImage
                        src={retreat.image}
                        alt={`${retreat.title} preview`}
                        aspectRatio="square"
                        objectFit="cover"
                      />
                    </button>
                    {retreat.additionalImages && retreat.additionalImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(img)}
                        className={cn(
                          "aspect-square rounded-md overflow-hidden transition-all duration-300",
                          activeImage === img ? "ring-2 ring-sage-500 scale-[0.98]" : "hover:opacity-80"
                        )}
                      >
                        <OptimizedImage
                          src={img}
                          alt={`${retreat.title} additional view ${i + 1}`}
                          aspectRatio="square"
                          objectFit="cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Retreat Details */}
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800">{retreat.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {retreat.category.map((cat) => (
                      <Badge key={cat} variant="secondary" className="bg-sage-100 text-sage-700 hover:bg-sage-200 transition-colors">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">{retreat.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Date & Time Details */}
                    <div className="space-y-5">
                      <div className="flex items-start space-x-4">
                        <div className="h-10 w-10 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                          <Calendar className="h-5 w-5 text-sage-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">Date</h3>
                          <p className="text-gray-700">{formatDate(retreat.date)}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="h-10 w-10 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                          <Clock className="h-5 w-5 text-sage-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">Time & Duration</h3>
                          <p className="text-gray-700">{retreat.time} ({retreat.duration})</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="h-10 w-10 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                          <Users className="h-5 w-5 text-sage-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">Group Size</h3>
                          <p className="text-gray-700">{getRemainingText(retreat.remaining)} of {retreat.capacity} total spots</p>
                        </div>
                      </div>
                    </div>

                    {/* Location Details */}
                    <div className="space-y-5">
                      <div className="flex items-start space-x-4">
                        <div className="h-10 w-10 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-5 w-5 text-sage-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">Location</h3>
                          <p className="text-gray-700 font-medium">{retreat.location.name}</p>
                          <p className="text-gray-600">
                            {retreat.location.city}, {retreat.location.state}
                          </p>
                          {retreat.location.description && (
                            <p className="text-gray-500 mt-2 text-sm">{retreat.location.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Amenities */}
              {retreat.amenities && retreat.amenities.length > 0 && (
                <Card className="border-none shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-semibold text-gray-800">What's Included</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {retreat.amenities.map((amenity, i) => (
                        <li key={i} className="flex items-center space-x-3 bg-white rounded-lg p-3 hover:bg-sage-50 transition-colors">
                          <div className="h-8 w-8 rounded-full bg-sage-100 flex items-center justify-center">
                            <Tag className="h-4 w-4 text-sage-600" />
                          </div>
                          <span className="text-gray-700">{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              
              {/* Source Link */}
              {retreat.sourceUrl && (
                <Card className="border-none shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-semibold text-gray-800">Original Event Information</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="mb-4 text-gray-600">For more details and the latest information, visit the official event page:</p>
                    <Button asChild variant="outline" className="w-full">
                      <a href={retreat.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        View on InsightLA Website
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Booking Info */}
            <div className="space-y-6">
              <Card className="border-none shadow-md sticky top-24">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">{formatCurrency(retreat.price)}</h2>
                    <Badge variant="outline" className={`px-3 py-1.5 text-sm font-medium ${retreat.remaining <= 3 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-sage-50 text-sage-700 border-sage-200'}`}>
                      {getRemainingText(retreat.remaining)}
                    </Badge>
                  </div>

                  {/* Instructor Info */}
                  <div className="flex items-center space-x-4 py-5 border-t border-b border-gray-100 mb-6">
                    <OptimizedImage
                      src={retreat.instructor.image}
                      alt={retreat.instructor.name}
                      className="w-12 h-12 rounded-full"
                      aspectRatio="square"
                      objectFit="cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800">{retreat.instructor.name}</h3>
                      <p className="text-sm text-gray-500">{retreat.instructor.title}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {retreat.sourceUrl ? (
                      <Button asChild className="w-full bg-sage-600 hover:bg-sage-700 text-lg py-6">
                        <a href={retreat.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          Book on InsightLA
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button 
                        disabled={retreat.remaining <= 0} 
                        asChild 
                        className="w-full bg-sage-600 hover:bg-sage-700 text-lg py-6 shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <Link to={`/booking/${retreat.id}`}>
                          {retreat.remaining > 0 ? "Book Now" : "Sold Out"}
                        </Link>
                      </Button>
                    )}
                    
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/instructor/${retreat.instructor.id}`} className="flex items-center justify-center">
                        View Instructor Profile
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-6 p-4 bg-sage-50 rounded-lg">
                    <p className="text-sage-700 text-sm text-center">
                      Secure your spot now. Limited spaces available.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RetreatDetails;
