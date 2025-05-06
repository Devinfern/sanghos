
// Since Hero is read-only, let's create an enhanced version of it that we can use

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const JoinHeroButton = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
      <Button 
        asChild 
        size="lg" 
        className="bg-brand-primary hover:bg-brand-primary/90 text-white font-bold"
      >
        <Link to="/join">Join Sanghos</Link>
      </Button>
      <Button 
        asChild 
        variant="outline" 
        size="lg" 
        className="border-white/70 text-white hover:bg-white/10"
      >
        <Link to="/retreats">Explore Retreats</Link>
      </Button>
    </div>
  );
};

export default JoinHeroButton;
