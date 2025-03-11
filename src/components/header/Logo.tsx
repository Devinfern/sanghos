
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center z-10">
      <img 
        src="/lovable-uploads/e38deb47-fbee-4a9f-9466-0ad53f2d7a19.png" 
        alt="Sanghos Logo" 
        className="h-12 w-auto"
      />
    </Link>
  );
};

export default Logo;
