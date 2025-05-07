
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, CreditCard, Diamond, Users } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      description: "Perfect for wellness beginners",
      price: "$19",
      features: [
        "Access to basic retreats",
        "Community forum access",
        "Wellness journal",
        "Email support"
      ],
      icon: Users,
      popular: false,
      buttonText: "Get Started"
    },
    {
      name: "Premium",
      description: "For dedicated wellness seekers",
      price: "$49",
      features: [
        "All Basic features",
        "Premium retreats access",
        "Personal wellness coach",
        "Priority booking",
        "24/7 support"
      ],
      icon: Diamond,
      popular: true,
      buttonText: "Go Premium"
    },
    {
      name: "Enterprise",
      description: "For wellness organizations",
      price: "Custom",
      features: [
        "All Premium features",
        "Custom retreat creation",
        "Dedicated account manager",
        "API access",
        "Team wellness programs"
      ],
      icon: CreditCard,
      popular: false,
      buttonText: "Contact Us"
    }
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand-dark">Find the Perfect Plan for Your Wellness Journey</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our flexible pricing options designed to support every step of your mindfulness and wellness practice.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-xl overflow-hidden border ${plan.popular ? 'border-brand-primary shadow-lg relative' : 'border-border shadow-sm'}`}>
              {plan.popular && (
                <div className="absolute top-0 w-full text-center py-1 bg-brand-primary text-white text-sm">
                  Most Popular
                </div>
              )}
              <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                <div className={`w-12 h-12 rounded-full ${plan.popular ? 'bg-brand-primary text-white' : 'bg-brand-light text-brand-primary'} flex items-center justify-center mb-6 mx-auto`}>
                  <plan.icon size={24} />
                </div>
                
                <h3 className="text-2xl font-bold text-center text-brand-dark mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-center mb-4">{plan.description}</p>
                
                <div className="text-4xl font-bold text-center text-brand-dark mb-6">
                  {plan.price}
                  {plan.price !== "Custom" && <span className="text-base font-normal text-muted-foreground">/month</span>}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check size={16} className="text-brand-primary mr-2 shrink-0" />
                      <span className="text-brand-dark/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular ? 'bg-brand-primary hover:bg-brand-primary/90' : 'bg-brand-sand hover:bg-brand-sand/90 text-white'}`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Pricing;
