
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ChevronLeft, CreditCard, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { retreats, formatCurrency, formatDate } from "@/lib/data";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import { toast } from "@/components/ui/use-toast";

// Define the add-on types
export type AddOn = {
  id: string;
  name: string;
  description: string;
  price: number;
  selected?: boolean;
  quantity?: number;
};

const CheckoutPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [step, setStep] = useState(1);
  
  // Sample add-ons data
  const [addOns, setAddOns] = useState<AddOn[]>([
    {
      id: "yoga-mat",
      name: "Yoga Mat Rental",
      description: "High-quality yoga mat for your retreat",
      price: 15,
      selected: false
    },
    {
      id: "private-coaching",
      name: "Private Coaching Session",
      description: "One-on-one session with a retreat instructor",
      price: 75,
      selected: false
    },
    {
      id: "meal-plan",
      name: "Upgraded Meal Plan",
      description: "Gourmet plant-based meals for all retreat days",
      price: 45,
      selected: false
    },
    {
      id: "wellness-kit",
      name: "Wellness Kit",
      description: "Essential oils, journal, and meditation supplies",
      price: 35,
      selected: false
    },
    {
      id: "spa-treatment",
      name: "Spa Treatment Add-on",
      description: "60-minute massage or facial treatment",
      price: 85,
      selected: false
    }
  ]);

  const retreat = retreats.find((r) => r.id === id);
  
  // Calculate the total price based on selected add-ons
  const calculateTotal = () => {
    if (!retreat) return 0;
    
    const addOnsTotal = addOns
      .filter(addon => addon.selected)
      .reduce((sum, addon) => sum + addon.price, 0);
    
    return retreat.price + addOnsTotal;
  };

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

  // Handle add-on selection
  const handleAddOnToggle = (addonId: string) => {
    setAddOns(addOns.map(addon => 
      addon.id === addonId 
        ? { ...addon, selected: !addon.selected } 
        : addon
    ));
  };

  // Calculate the tax amount (example: 5% of subtotal)
  const calculateTax = () => {
    return calculateTotal() * 0.05;
  };

  // Calculate the final total with tax
  const calculateFinalTotal = () => {
    return calculateTotal() + calculateTax();
  };

  return (
    <>
      <Helmet>
        <title>Checkout | Sanghos</title>
        <meta name="description" content="Complete your booking" />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16 bg-sand-50">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/booking/${id}`)}
            className="mb-6 text-muted-foreground hover:text-foreground flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to booking
          </Button>
          
          <div 
            className={`transition-opacity duration-700 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
            <p className="text-muted-foreground mb-8">Secure your spot for {retreat.title}</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main checkout form */}
              <div className="lg:col-span-2">
                <CheckoutForm 
                  retreat={retreat}
                  addOns={addOns}
                  onAddOnToggle={handleAddOnToggle}
                />
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <OrderSummary 
                  retreat={retreat}
                  addOns={addOns.filter(addon => addon.selected)}
                  taxAmount={calculateTax()}
                  total={calculateFinalTotal()}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CheckoutPage;
