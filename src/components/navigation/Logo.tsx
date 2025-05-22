
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    /* 
      IMPORTANT:
      The z-[1002] here is relative to the header's stacking context (z-[2000]).
      Since the Logo is a child of the header, it inherits the header's stacking context.
      This z-index only affects positioning relative to other elements within the header.
    */
    <Link to="/" className="relative z-[1002]">
      <img 
        src="/lovable-uploads/e38deb47-fbee-4a9f-9466-0ad53f2d7a19.png" 
        alt="Sanghos Logo" 
        className="h-10 w-auto"
      />
    </Link>
  );
};
