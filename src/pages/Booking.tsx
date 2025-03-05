import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { retreats, formatCurrency, formatDate } from "@/lib/data";
import { toast } from "@/components/ui/use-toast";

const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({ variant: "destructive", title: "Error", description: "Please fill in all required fields" });
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({ variant: "destructive", title: "Error", description: "Please enter a valid email address" });
      return false;
    }
    
    return true;
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/booking-confirmation/${id}`);
      toast({ title: "Success", description: "Your booking has been confirmed!" });
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Book Your Retreat | Sanghos</title>
        <meta name="description" content={`Book your spot for ${retreat.title}`} />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6 max-w-4xl">
          <Link 
            to={`/retreat/${id}`} 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to retreat details
          </Link>
          
          <div 
            className={`transition-opacity duration-700 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="text-3xl font-bold mb-2">Book Your Retreat</h1>
            <p className="text-muted-foreground mb-8">{retreat.title}</p>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-between">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    1
                  </div>
                  <span className="text-sm mt-1">Your Details</span>
                </div>
                <div className="flex-1 flex items-center mx-2">
                  <div className={`h-1 w-full ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    2
                  </div>
                  <span className="text-sm mt-1">Review & Pay</span>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Form Steps */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <div className="animate-fade-in">
                      <h2 className="text-xl font-semibold mb-4">Your Information</h2>
                      <p className="text-muted-foreground mb-6">Please provide your details to book this retreat.</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2 mb-6">
                        <Label htmlFor="specialRequests">Special Requests or Accommodations</Label>
                        <Input
                          id="specialRequests"
                          name="specialRequests"
                          value={formData.specialRequests}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <Button type="button" onClick={nextStep} className="w-full">
                        Continue to Review
                      </Button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="animate-fade-in">
                      <h2 className="text-xl font-semibold mb-4">Review & Confirm</h2>
                      <p className="text-muted-foreground mb-6">Please review your booking details before confirming.</p>
                      
                      <div className="bg-muted/30 p-4 rounded-lg mb-6">
                        <h3 className="font-medium mb-2">Personal Information</h3>
                        <p>
                          <span className="text-muted-foreground">Name:</span> {formData.firstName} {formData.lastName}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Email:</span> {formData.email}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Phone:</span> {formData.phone}
                        </p>
                        {formData.specialRequests && (
                          <p>
                            <span className="text-muted-foreground">Special Requests:</span> {formData.specialRequests}
                          </p>
                        )}
                      </div>
                      
                      <div className="bg-muted/30 p-4 rounded-lg mb-8">
                        <h3 className="font-medium mb-2">Retreat Details</h3>
                        <p>
                          <span className="text-muted-foreground">Retreat:</span> {retreat.title}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Date:</span> {formatDate(retreat.date)}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Time:</span> {retreat.time}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Location:</span> {retreat.location.name}, {retreat.location.city}
                        </p>
                      </div>
                      
                      <div className="flex space-x-4">
                        <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                          Back
                        </Button>
                        <Button type="submit" className="flex-1" disabled={isSubmitting}>
                          {isSubmitting ? "Processing..." : "Confirm Booking"}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-white rounded-xl shadow-sm border border-sand-100 p-6">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  
                  <div className="mb-4">
                    <img
                      src={retreat.image}
                      alt={retreat.title}
                      className="w-full h-36 object-cover rounded-lg mb-4"
                    />
                    <h4 className="font-medium">{retreat.title}</h4>
                    <p className="text-sm text-muted-foreground mb-1">{formatDate(retreat.date)}</p>
                    <p className="text-sm text-muted-foreground">{retreat.time}</p>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Retreat Price</span>
                      <span>{formatCurrency(retreat.price)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Processing Fee</span>
                      <span>{formatCurrency(retreat.price * 0.05)}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-medium text-lg mb-6">
                    <span>Total</span>
                    <span>{formatCurrency(retreat.price * 1.05)}</span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    By proceeding with this booking, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Booking;
