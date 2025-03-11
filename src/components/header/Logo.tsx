
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/e36dbc23-7334-48c8-afe8-4027497207fe.png" 
        alt="Sanghos Logo" 
        className="h-12 w-auto" // Increased from h-10 to h-12
      />
    </Link>
  );
};

export default Logo;
