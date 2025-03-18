
import { motion } from "framer-motion";

const SanghosStory = () => {
  return (
    <section className="py-24 md:py-32 bg-sage-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-light leading-tight mb-16">
            Finding <span className="text-sand-200">sanctuary</span> in the present moment. 
            Creating <span className="text-sand-200">space</span> for mindfulness. 
            Connecting with <span className="text-sand-200">yourself</span> and others. 
            This is <span className="text-sand-200">Sanghos</span>.
          </h2>
          
          <div className="text-lg md:text-xl font-light leading-relaxed space-y-6 text-white/90 max-w-4xl">
            <p>
              Sanghos creates transformative daylong wellness retreats in unique, private spaces. 
              We believe that wellness shouldn't require weeks away or expensive travel—it can be 
              found right in your community, led by expert instructors who bring authentic practice 
              and deep knowledge.
            </p>
            <p>
              Each Sanghos retreat offers an opportunity to step away from daily routines, connect 
              with like-minded individuals, and immerse yourself in practices that nourish both 
              body and mind—all in beautiful, intimate settings that feel worlds away from ordinary life.
            </p>
            <p>
              We hope the Sanghos experience brings you peace. Helps you reconnect. Creates meaningful 
              moments and lasting connections that continue to resonate long after the retreat ends.
            </p>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-sage-500 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-sand-300 blur-3xl"></div>
      </div>
    </section>
  );
};

export default SanghosStory;
