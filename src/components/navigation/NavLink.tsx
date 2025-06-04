
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const NavLink = ({ to, children, className, onClick }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to === '/blog' && location.pathname.startsWith('/blog'));

  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "text-foreground hover:text-brand-primary transition-colors duration-200 font-medium relative group",
        isActive && "text-brand-primary",
        className
      )}
    >
      {children}
      <span 
        className={cn(
          "absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full",
          isActive && "w-full"
        )}
      />
    </Link>
  );
};
