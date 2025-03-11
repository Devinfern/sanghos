
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/9ef0b49f-48ef-413f-8c34-873181f2f094.png" 
        alt="Sanghos Logo" 
        className="h-10 w-auto"
      />
    </Link>
  );
};

export default Logo;
