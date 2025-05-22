
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  active?: boolean;
}

export const NavLink = ({ 
  to, 
  children, 
  className, 
  onClick,
  active
}: NavLinkProps) => {
  return (
    <Link 
      to={to}
      className={className}
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
    >
      {children}
    </Link>
  );
};

export const DesktopNavLink = ({ 
  to, 
  children, 
  active, 
  onClick 
}: Omit<NavLinkProps, "className"> & { active: boolean }) => {
  return (
    <NavLink 
      to={to}
      className={cn(
        "group inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors",
        active 
          ? "text-primary" 
          : "text-slate-700 hover:text-primary"
      )}
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
};

export const MobileNavLink = ({ 
  to, 
  children, 
  active, 
  onClick 
}: Omit<NavLinkProps, "className"> & { active: boolean }) => {
  return (
    <NavLink
      to={to}
      className={cn(
        "text-lg font-medium py-2 border-b border-slate-100",
        active ? "text-primary" : "text-slate-800"
      )}
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
};
