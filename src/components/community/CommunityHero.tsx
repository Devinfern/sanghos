import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const CommunityHero = () => {
  const navigate = useNavigate();
  return <div className="relative bg-gradient-to-b from-brand-subtle/20 to-white">
      <div className="container px-4 md:py-24 py-[130px]">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark">
            Join Our Mindful Community
          </h1>
          <p className="text-lg md:text-xl text-brand-slate leading-relaxed">
            Connect with like-minded individuals, share your wellness journey, and grow together in our supportive community dedicated to mindfulness and personal growth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => navigate("/join")} size="lg" className="bg-brand-primary hover:bg-brand-primary/90">
              Join Sanghos
            </Button>
            <Button onClick={() => navigate("/retreats")} variant="outline" size="lg" className="border-brand-primary text-brand-primary hover:bg-brand-primary/5">
              Explore Retreats
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default CommunityHero;