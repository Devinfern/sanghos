
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { MapPin, Calendar, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { retreats, formatCurrency, formatDate, getRemainingText } from "@/lib/data";

const RetreatDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const retreat = retreats.find((r) => r.id === id);

  useEffect(() => {
    if (!retreat) {
      navigate("/retreats");
      return;
    }

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [retreat, navigate]);

  if (!retreat) return null;

  const allImages = [retreat.image, ...retreat.additionalImages];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <>
      <Helmet>
        <title>{retreat.title} | Sanghos</title>
        <meta name="description" content={retreat.description} />
      </Helmet>

      <Header />

      <main className="pt-20 pb-16">
        {/* Image Gallery */}
        <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
          <div className="absolute inset-0 bg-gray-900/20 z-10"></div>
          {allImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${retreat.title} - image ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          
          {allImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-primary rounded-full"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-primary rounded-full"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === currentImageIndex
                        ? "bg-white"
                        : "bg-white/40 hover:bg-white/70"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="container px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div 
              className={`lg:col-span-2 transition-opacity duration-700 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {retreat.category.map((cat) => (
                  <Badge key={cat} variant="outline">
                    {cat}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{retreat.title}</h1>

              <div className="flex items-center mb-6">
                <MapPin className="h-5 w-5 text-sage-600 mr-1" />
                <span className="text-muted-foreground">
                  {retreat.location.city}, {retreat.location.state}
                </span>
              </div>

              <div className="prose max-w-none mb-8">
                <p className="text-lg text-foreground">{retreat.description}</p>
              </div>

              <Separator className="my-8" />

              {/* Location Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Location</h2>
                <h3 className="text-xl mb-2">{retreat.location.name}</h3>
                <p className="text-muted-foreground mb-4">{retreat.location.description}</p>
                <p className="text-muted-foreground">
                  {retreat.location.address}, {retreat.location.city}, {retreat.location.state}
                </p>
              </div>

              <Separator className="my-8" />

              {/* Instructor Section */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Your Instructor</h2>
                <div className="flex items-start space-x-4">
                  <img
                    src={retreat.instructor.image}
                    alt={retreat.instructor.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-medium">{retreat.instructor.name}</h3>
                    <p className="text-muted-foreground mb-2">{retreat.instructor.title}</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {retreat.instructor.yearsExperience} years of experience
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/instructor/${retreat.instructor.id}`}>
                        View Profile
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              {/* Amenities Section */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">What's Included</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {retreat.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-sage-500 rounded-full mr-2"></div>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div 
                className={`sticky top-24 bg-white rounded-xl shadow-sm border border-sand-100 p-6 transition-all duration-500 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">{formatCurrency(retreat.price)}</h3>
                  <span className="text-sm text-muted-foreground">per person</span>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-sage-600 mr-3" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-muted-foreground">{formatDate(retreat.date)}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-sage-600 mr-3" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-muted-foreground">{retreat.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-sage-600 mr-3" />
                    <div>
                      <p className="font-medium">Availability</p>
                      <p className={`${
                        retreat.remaining <= 3 ? "text-orange-600 font-medium" : "text-muted-foreground"
                      }`}>
                        {getRemainingText(retreat.remaining)}
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="w-full mb-4" size="lg" asChild>
                  <Link to={`/booking/${id}`}>Book Now</Link>
                </Button>

                <p className="text-sm text-center text-muted-foreground">
                  Secure your spot with just a few clicks
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
