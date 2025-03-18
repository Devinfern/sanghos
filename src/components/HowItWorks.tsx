import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";
import OptimizedImage from "./OptimizedImage";

const HowItWorks = () => {
  const steps = [{
    title: "Find your perfect retreat.",
    icon: <Calendar className="h-10 w-10 text-sage-600" />,
    description: "Browse our curated selection of wellness retreats by date, practice type, or instructor. Each retreat is thoughtfully designed to provide an immersive experience in a unique private space.",
    image: "/lovable-uploads/7d087453-b662-43ef-bd58-62953d225341.png"
  }, {
    title: "Experience a transformative day.",
    icon: <MapPin className="h-10 w-10 text-sage-600" />,
    description: "Step into a beautiful private home transformed into your sanctuary for the day. Our expert instructors guide you through practices designed to nourish your mind and body in an intimate setting with a small group of like-minded individuals.",
    image: "/lovable-uploads/6d18343c-7100-4964-a39e-2a3215536423.png"
  }, {
    title: "Connect with community.",
    icon: <Users className="h-10 w-10 text-sage-600" />,
    description: "Share experiences with others on a similar journey. Our retreats foster connection through shared practice, communal meals, and meaningful conversation. Many participants form lasting friendships that extend beyond the retreat day.",
    image: "/lovable-uploads/6bab8880-8765-4e83-9a38-d482633fdc95.png"
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
                      <img src={step.image} alt={step.title} className="rounded-xl shadow-lg w-full h-[500px] object-cover" />
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
                      <img src={step.image} alt={step.title} className="rounded-xl shadow-lg w-full h-[400px] object-cover" />
                    </div>
                  </>}
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};

export default HowItWorks;
