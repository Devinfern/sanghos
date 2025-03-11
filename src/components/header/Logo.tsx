
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="bg-white/80 backdrop-blur-sm p-1.5 rounded-md">
        <img 
          src="/lovable-uploads/e36dbc23-7334-48c8-afe8-4027497207fe.png" 
          alt="Sanghos Logo" 
          className="h-10 w-auto"
        />
      </div>
    </Link>
  );
};

export default Logo;
