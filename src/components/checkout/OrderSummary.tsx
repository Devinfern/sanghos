
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/data";
import { AddOn } from "@/pages/CheckoutPage";

interface OrderSummaryProps {
  retreat: any; // Use your actual retreat type here
  addOns: AddOn[];
  taxAmount: number;
  total: number;
}

const OrderSummary = ({ retreat, addOns, taxAmount, total }: OrderSummaryProps) => {
  return (
    <div className="sticky top-24">
      <Card className="bg-white">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-4">
            {/* Base Retreat Price */}
            <div className="flex justify-between">
              <span className="font-medium">Retreat Base Price</span>
              <span>{formatCurrency(retreat.price)}</span>
            </div>
            
            {/* Add-ons */}
            {addOns.length > 0 && (
              <div className="border-t pt-3">
                <h3 className="font-medium mb-2">Selected Add-ons</h3>
                <div className="space-y-2">
                  {addOns.map((addon) => (
                    <div key={addon.id} className="flex justify-between text-sm">
                      <span>{addon.name}</span>
                      <span>{formatCurrency(addon.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Taxes */}
            <div className="border-t pt-3 flex justify-between text-sm">
              <span>Taxes & Fees (5%)</span>
              <span>{formatCurrency(taxAmount)}</span>
            </div>
            
            {/* Total */}
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            
            {/* Secure payment notice */}
            <div className="mt-4 text-xs text-center text-muted-foreground">
              <p>Secure payment processing by Stripe</p>
              <p className="mt-1">Your payment details are encrypted and secure</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6 bg-sage-50 p-4 rounded-lg border border-sage-100">
        <h3 className="font-medium text-sage-700 mb-2">Booking Guarantee</h3>
        <p className="text-sm text-sage-600">
          Your spot is only reserved once payment is complete. Retreats often sell out quickly, so we recommend completing your booking as soon as possible.
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
