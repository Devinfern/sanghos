
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="relative z-[1002]">
      <img 
        src="/lovable-uploads/e38deb47-fbee-4a9f-9466-0ad53f2d7a19.png" 
        alt="Sanghos Logo" 
        className="h-10 w-auto"
      />
    </Link>
  );
};
