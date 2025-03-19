
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const JoinCommunity = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("sanghos_user") !== null;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.1
    });
    
    const element = document.getElementById("join-community");
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const handleCommunityClick = () => {
    if (isLoggedIn) {
      navigate('/community');
    } else {
      navigate('/join');
    }
  };

  return (
    <section id="join-community" className="py-24 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-dark/70 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" 
          alt="Peaceful retreat setting" 
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="container relative z-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-light leading-tight text-white mb-12">
            Take a day <span className="text-brand-peach">for yourself</span>. To disconnect. 
            To breathe. <span className="text-brand-peach">To practice</span>. To reconnect.
          </h2>
          
          <div className="text-lg md:text-xl font-light text-white/90 mb-12 leading-relaxed">
            <p>
              Imagine a beautiful private home. Transformed into a sanctuary for wellness. 
              Just for today. Carefully curated to create the perfect atmosphere for your practice. 
              A space that feels both inspiring and welcoming. Away from your daily routines. 
              A place to reset, reflect, and restore.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              size="lg" 
              className="bg-brand-primary hover:bg-brand-primary/90 text-white" 
              onClick={() => navigate('/retreats')}
            >
              Browse Retreats
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleCommunityClick} 
              className="border-white text-white hover:bg-white/10"
            >
              Join Our Community
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;
