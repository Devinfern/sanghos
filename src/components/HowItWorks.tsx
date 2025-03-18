
import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";
import OptimizedImage from "./OptimizedImage";

const HowItWorks = () => {
  const steps = [{
    title: "Find your perfect retreat.",
    icon: <Calendar className="h-10 w-10 text-sage-600" />,
    description: "Browse our curated selection of wellness retreats by date, practice type, or instructor. Each retreat is thoughtfully designed to provide an immersive experience in a unique private space.",
    image: "/lovable-uploads/ed75a7a7-188f-4332-a284-ae244d5ea459.png"
  }, {
    title: "Experience a transformative day.",
    icon: <MapPin className="h-10 w-10 text-sage-600" />,
    description: "Step into a beautiful private home transformed into your sanctuary for the day. Our expert instructors guide you through practices designed to nourish your mind and body in an intimate setting with a small group of like-minded individuals.",
    image: "/lovable-uploads/bd896dc7-9768-4dac-b8e9-425c9558c653.png"
  }, {
    title: "Connect with community.",
    icon: <Users className="h-10 w-10 text-sage-600" />,
    description: "Share experiences with others on a similar journey. Our retreats foster connection through shared practice, communal meals, and meaningful conversation. Many participants form lasting friendships that extend beyond the retreat day.",
    image: "/lovable-uploads/80481871-1be9-4470-b1e2-4a2f47bdad30.png"
  }];
  
  return <section className="py-24 md:py-32 bg-sand-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-light leading-tight mb-8 text-center">
            How Sanghos Works
          </h2>
          
          <div className="space-y-24 mt-16">
            {steps.map((step, index) => <div key={index} className="flex flex-col lg:flex-row gap-12 items-center">
                {index % 2 === 0 ? <>
                    <div className="lg:w-1/2">
                      <OptimizedImage 
                        src={step.image} 
                        alt={step.title} 
                        className="rounded-xl shadow-lg w-full max-h-[600px]" 
                        objectFit="contain" 
                        aspectRatio="custom"
                      />
                    </div>
                    <div className="lg:w-1/2 space-y-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-sage-100 p-3 rounded-full">{step.icon}</div>
                        <h3 className="text-2xl md:text-3xl font-playfair font-medium">{step.title}</h3>
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </> : <>
                    <div className="lg:w-1/2 space-y-6 order-2 lg:order-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-sage-100 p-3 rounded-full">{step.icon}</div>
                        <h3 className="text-2xl md:text-3xl font-playfair font-medium">{step.title}</h3>
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                    <div className="lg:w-1/2 order-1 lg:order-2">
                      <OptimizedImage 
                        src={step.image} 
                        alt={step.title} 
                        className="rounded-xl shadow-lg w-full max-h-[600px]" 
                        objectFit="contain" 
                        aspectRatio="custom"
                      />
                    </div>
                  </>}
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};

export default HowItWorks;
