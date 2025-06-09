
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Users, Clock, Tag, Loader2 } from "lucide-react";
import { retreats, formatDate, formatCurrency, getRemainingText } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/seo/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { createEventSchema, createLocalBusinessSchema } from "@/components/seo/StructuredData";
import { cn } from "@/lib/utils";
import { fetchInsightLAEvents } from "@/lib/insightEvents";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import OptimizedImage from "@/components/OptimizedImage";

const RetreatDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [retreat, setRetreat] = useState<any>(null);
  const [activeImage, setActiveImage] = useState("");
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

  // Generate structured data for the retreat
  const eventSchema = createEventSchema({
    name: retreat.title,
    description: retreat.description,
    startDate: retreat.date,
    location: {
      name: retreat.location.name,
      address: `${retreat.location.city}, ${retreat.location.state}`
    },
    organizer: {
      name: "Sanghos",
      url: "https://sanghos.com"
    },
    offers: {
      price: retreat.price,
      currency: "USD",
      availability: retreat.remaining > 0 ? "InStock" : "SoldOut"
    },
    image: retreat.image
  });

  const localBusinessSchema = createLocalBusinessSchema(
    retreat.location.name,
    `${retreat.location.city}, ${retreat.location.state}`
  );

  const combinedSchema = [eventSchema, localBusinessSchema];

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Retreats", path: "/retreats" },
    { name: retreat.title, path: `/retreat/${retreat.id}` }
  ];

  const retreatKeywords = [
    ...retreat.category,
    "wellness retreat",
    "mindfulness",
    retreat.location.city.toLowerCase(),
    retreat.location.state.toLowerCase(),
    retreat.instructor.name.toLowerCase(),
    "private retreat",
    "day retreat"
  ];

  return (
    <>
      <SEOHead
        title={retreat.title}
        description={`${retreat.description} Join this ${retreat.category.join(', ')} retreat with ${retreat.instructor.name} in ${retreat.location.city}, ${retreat.location.state}.`}
        keywords={retreatKeywords}
        canonicalUrl={`https://sanghos.com/retreat/${retreat.id}`}
        ogImage={retreat.image}
        ogType="event"
        structuredData={combinedSchema}
      />

      <Header />

      <main className="pt-24 pb-16 bg-gray-50">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbItems} />
          </div>

          {/* Back Button */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Button asChild variant="ghost" size="sm" className="group">
              <Link to="/retreats">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to All Retreats
              </Link>
            </Button>
          </motion.div>

          <div className={cn(
            "grid grid-cols-1 lg:grid-cols-3 gap-8 transition-opacity duration-500",
            isVisible ? "opacity-100" : "opacity-0"
          )}>
            {/* Left Column - Images */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Image */}
              <Card className="overflow-hidden border-sage-200/30">
                <div className="aspect-video overflow-hidden bg-muted">
                  <OptimizedImage
                    src={activeImage}
                    alt={retreat.title}
                    className="w-full h-full object-cover"
                    aspectRatio="custom"
                    priority={true}
                  />
                </div>

                {/* Image Gallery */}
                <div className="grid grid-cols-4 gap-2 p-3 bg-white">
                  <button
                    onClick={() => setActiveImage(retreat.image)}
                    className={cn(
                      "aspect-square rounded-md overflow-hidden transition-all",
                      activeImage === retreat.image ? "ring-2 ring-sage-500 scale-[0.95] opacity-100" : "opacity-70 hover:opacity-100"
                    )}
                  >
                    <OptimizedImage
                      src={retreat.image}
                      alt={`${retreat.title} preview`}
                      className="w-full h-full object-cover"
                      aspectRatio="square"
                    />
                  </button>
                  {retreat.additionalImages.map((img: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={cn(
                        "aspect-square rounded-md overflow-hidden transition-all",
                        activeImage === img ? "ring-2 ring-sage-500 scale-[0.95] opacity-100" : "opacity-70 hover:opacity-100"
                      )}
                    >
                      <OptimizedImage
                        src={img}
                        alt={`${retreat.title} additional view ${i + 1}`}
                        className="w-full h-full object-cover"
                        aspectRatio="square"
                      />
                    </button>
                  ))}
                </div>
              </Card>

              {/* Retreat Details */}
              <Card className="border-sage-200/30">
                <CardContent className="p-6">
                  <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{retreat.title}</h1>
                  
                  <div className="flex flex-wrap gap-2 mb-5">
                    {retreat.category.map((cat: string) => (
                      <Badge key={cat} variant="secondary" className="bg-sage-100 text-sage-700 hover:bg-sage-200">
                        {cat}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-gray-600 mb-8 leading-relaxed">{retreat.description}</p>

                  {/* REDESIGNED SECTION - START */}
                  <div className="space-y-6 bg-white rounded-xl border border-gray-100">
                    {/* Date & Time Details */}
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-center space-x-3 mb-2">
                        <Calendar className="h-5 w-5 text-sage-600" />
                        <h3 className="font-medium text-gray-900">{formatDate(retreat.date)}</h3>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-sage-600" />
                        <p className="text-gray-600">{retreat.time} · {retreat.duration}</p>
                      </div>
                    </div>

                    {/* Location Details */}
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-center space-x-3 mb-2">
                        <MapPin className="h-5 w-5 text-sage-600" />
                        <h3 className="font-medium text-gray-900">{retreat.location.name}</h3>
                      </div>
                      <p className="text-gray-600 ml-8">
                        {retreat.location.city}, {retreat.location.state}
                      </p>
                      <p className="text-sm text-gray-500 italic mt-2 ml-8">{retreat.location.description}</p>
                    </div>

                    {/* Group Size */}
                    <div className="p-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <Users className="h-5 w-5 text-sage-600" />
                        <h3 className="font-medium text-gray-900">Group Size</h3>
                      </div>
                      <p className="text-gray-600 ml-8">
                        {getRemainingText(retreat.remaining)} of {retreat.capacity} total spots
                      </p>
                    </div>
                  </div>
                  {/* REDESIGNED SECTION - END */}

                </CardContent>
              </Card>

              {/* Amenities */}
              {retreat.amenities && retreat.amenities.length > 0 && (
                <Card className="border-sage-200/30">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">What's Included</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {retreat.amenities.map((amenity: string, i: number) => (
                        <li key={i} className="flex items-center space-x-2 text-gray-700">
                          <Tag className="h-4 w-4 text-sage-500" />
                          <span>{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              
              {/* Source Link */}
              {retreat.sourceUrl && (
                <Card className="border-sage-200/30">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Original Event Information</h2>
                    <p className="mb-4 text-gray-600">For more details and the latest information, visit the official event page:</p>
                    <Button asChild variant="outline" className="w-full">
                      <a href={retreat.sourceUrl} target="_blank" rel="noopener noreferrer">
                        View on InsightLA Website
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Booking Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Price Card */}
              <Card className="border-sage-200/30 overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-sage-50 px-6 py-4 border-b border-sage-100">
                    <h2 className="text-xl font-semibold text-gray-800">Booking Information</h2>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gray-800">{formatCurrency(retreat.price)}</h2>
                      <Badge variant={retreat.remaining < 5 ? "secondary" : "outline"} 
                        className={retreat.remaining < 5 ? "bg-amber-100 text-amber-700" : ""}>
                        {getRemainingText(retreat.remaining)}
                      </Badge>
                    </div>

                    {/* Instructor Info */}
                    <div className="flex items-center space-x-4 py-4 border-t border-b border-sage-100">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <OptimizedImage
                          src={retreat.instructor.image}
                          alt={retreat.instructor.name}
                          className="w-full h-full object-cover"
                          aspectRatio="square"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{retreat.instructor.name}</h3>
                        <p className="text-sm text-gray-500">{retreat.instructor.title}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      {retreat.sourceUrl ? (
                        <Button asChild className="w-full">
                          <a href={retreat.sourceUrl} target="_blank" rel="noopener noreferrer">
                            Book on InsightLA
                          </a>
                        </Button>
                      ) : (
                        <Button disabled={retreat.remaining <= 0} asChild className="w-full">
                          <Link to={`/booking/${retreat.id}`}>
                            {retreat.remaining > 0 ? "Book Now" : "Sold Out"}
                          </Link>
                        </Button>
                      )}
                      
                      <Button variant="outline" asChild className="w-full">
                        <Link to={`/instructor/${retreat.instructor.id}`}>
                          View Instructor Profile
                        </Link>
                      </Button>
                    </div>

                    <p className="mt-4 text-sm text-gray-500 text-center">
                      Secure your spot now. Limited spaces available.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Additional information card */}
              <Card className="border-sage-200/30">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-gray-800">Need assistance?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    If you have questions about this retreat or need help with your booking, our team is here to help.
                  </p>
                  <Button variant="secondary" className="w-full">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RetreatDetails;
