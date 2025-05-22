import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, Calendar, MapPin, Users, Clock, Tag, Loader2 } from "lucide-react";
import { retreats, formatDate, formatCurrency, getRemainingText } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { fetchInsightLAEvents } from "@/lib/insightEvents";

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

  return (
    <>
      <Helmet>
        <title>{retreat.title} | Sanghos</title>
        <meta name="description" content={retreat.description} />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          {/* Back Button */}
          <div className="mb-6">
            <Button asChild variant="ghost" size="sm" className="group">
              <Link to="/retreats">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to All Retreats
              </Link>
            </Button>
          </div>

          <div className={cn(
            "grid grid-cols-1 lg:grid-cols-3 gap-8 transition-opacity duration-500",
            isVisible ? "opacity-100" : "opacity-0"
          )}>
            {/* Left Column - Images */}
            <div className="lg:col-span-2 space-y-4">
              {/* Main Image */}
              <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                <img
                  src={activeImage}
                  alt={retreat.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => setActiveImage(retreat.image)}
                  className={cn(
                    "aspect-square rounded-md overflow-hidden",
                    activeImage === retreat.image ? "ring-2 ring-primary" : ""
                  )}
                >
                  <img
                    src={retreat.image}
                    alt={`${retreat.title} preview`}
                    className="w-full h-full object-cover"
                  />
                </button>
                {retreat.additionalImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={cn(
                      "aspect-square rounded-md overflow-hidden",
                      activeImage === img ? "ring-2 ring-primary" : ""
                    )}
                  >
                    <img
                      src={img}
                      alt={`${retreat.title} additional view ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Retreat Details */}
              <div className="bg-white p-6 rounded-xl shadow-sm mt-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-4">{retreat.title}</h1>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {retreat.category.map((cat) => (
                    <Badge key={cat} variant="secondary">
                      {cat}
                    </Badge>
                  ))}
                </div>

                <p className="text-muted-foreground mb-6">{retreat.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date & Time Details */}
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-sage-500" />
                      <div>
                        <h3 className="font-medium">Date</h3>
                        <p>{formatDate(retreat.date)}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-sage-500" />
                      <div>
                        <h3 className="font-medium">Time & Duration</h3>
                        <p>{retreat.time} ({retreat.duration})</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Users className="h-5 w-5 text-sage-500" />
                      <div>
                        <h3 className="font-medium">Group Size</h3>
                        <p>{getRemainingText(retreat.remaining)} of {retreat.capacity} total spots</p>
                      </div>
                    </div>
                  </div>

                  {/* Location Details */}
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-sage-500" />
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p>{retreat.location.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {retreat.location.city}, {retreat.location.state}
                        </p>
                      </div>
                    </div>

                    <div className="text-sm">
                      <p className="text-muted-foreground">{retreat.location.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              {retreat.amenities && retreat.amenities.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">What's Included</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {retreat.amenities.map((amenity, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <Tag className="h-4 w-4 text-sage-500" />
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Source Link */}
              {retreat.sourceUrl && (
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Original Event Information</h2>
                  <p className="mb-4">For more details and the latest information, visit the official event page:</p>
                  <Button asChild variant="outline" className="w-full">
                    <a href={retreat.sourceUrl} target="_blank" rel="noopener noreferrer">
                      View on InsightLA Website
                    </a>
                  </Button>
                </div>
              )}
            </div>

            {/* Right Column - Booking Info */}
            <div className="space-y-6">
              {/* Price Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">{formatCurrency(retreat.price)}</h2>
                  <Badge variant="outline">{getRemainingText(retreat.remaining)}</Badge>
                </div>

                {/* Instructor Info */}
                <div className="flex items-center space-x-4 py-4 border-t border-b mb-6">
                  <img
                    src={retreat.instructor.image}
                    alt={retreat.instructor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{retreat.instructor.name}</h3>
                    <p className="text-sm text-muted-foreground">{retreat.instructor.title}</p>
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

                <p className="mt-4 text-sm text-muted-foreground text-center">
                  Secure your spot now. Limited spaces available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RetreatDetails;
