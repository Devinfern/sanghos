
// I need to ensure the Header component has a prominent link to the Join page
// Since the Header component is read-only, I'll need to create a different solution
// Let's create a JoinButton component that can be used on multiple pages

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const JoinButton = () => {
  return (
    <Button asChild size="lg" className="bg-brand-primary hover:bg-brand-primary/90 text-white">
      <Link to="/join">Join Sanghos</Link>
    </Button>
  );
};

export default JoinButton;
