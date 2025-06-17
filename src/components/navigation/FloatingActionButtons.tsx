
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User, LayoutDashboard } from "lucide-react";

interface FloatingActionButtonsProps {
  isLoggedIn: boolean;
  onSignOut: () => void;
}

export const FloatingActionButtons = ({ isLoggedIn, onSignOut }: FloatingActionButtonsProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="hidden lg:flex items-center space-x-3"
    >
      {isLoggedIn ? (
        <>
          <Button 
            variant="outline" 
            size="sm"
            asChild
            className="bg-white/90 backdrop-blur-lg border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-full px-4"
          >
            <Link to="/dashboard" className="flex items-center space-x-2">
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </Button>
          <Button 
            onClick={onSignOut}
            variant="outline"
            size="sm"
            className="bg-white/90 backdrop-blur-lg border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-full px-4"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <>
          <Button 
            variant="outline" 
            size="sm"
            asChild
            className="bg-white/90 backdrop-blur-lg border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-full px-4"
          >
            <Link to="/login" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </Link>
          </Button>
          <Button 
            size="sm"
            asChild
            className="bg-gradient-to-r from-brand-primary to-brand-primary/90 hover:from-brand-primary/90 hover:to-brand-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-full px-6"
          >
            <Link to="/signup">Join Sanghos</Link>
          </Button>
        </>
      )}
    </motion.div>
  );
};
