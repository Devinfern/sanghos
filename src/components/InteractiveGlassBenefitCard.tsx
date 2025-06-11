
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface InteractiveGlassBenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const InteractiveGlassBenefitCard = ({ icon, title, description, index }: InteractiveGlassBenefitCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative"
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateY(${(mousePosition.x - 200) * 0.05}deg) rotateX(${(mousePosition.y - 150) * -0.05}deg) translateZ(20px)`
          : 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)',
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Magnetic glow effect */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(37, 182, 164, 0.15) 0%, transparent 50%)`,
        }}
      />
      
      {/* Main card with enhanced glass morphism */}
      <Card className="relative p-8 bg-white/20 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden group-hover:bg-white/30">
        {/* Internal light refraction */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
            transform: `translateX(${mousePosition.x * 0.1 - 20}px) translateY(${mousePosition.y * 0.1 - 15}px)`,
          }}
        />
        
        {/* Floating glass orb */}
        <div 
          className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-white/20 to-transparent backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
          style={{
            transform: `translate(${mousePosition.x * 0.15 - 64}px, ${mousePosition.y * 0.15 - 64}px)`,
          }}
        />
        
        <CardContent className="relative p-0 z-10">
          <div className="flex items-start space-x-4">
            {/* Icon container with magnetic effect */}
            <motion.div 
              className="p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/30 group-hover:bg-white/60 transition-all duration-300"
              style={{
                transform: isHovered 
                  ? `translate(${(mousePosition.x - 200) * 0.02}px, ${(mousePosition.y - 150) * 0.02}px)`
                  : 'translate(0px, 0px)',
              }}
            >
              {icon}
            </motion.div>
            
            <div className="flex-1">
              <motion.h3 
                className="text-2xl font-bold mb-3 text-brand-dark group-hover:text-brand-primary transition-colors duration-300"
                style={{
                  transform: isHovered 
                    ? `translate(${(mousePosition.x - 200) * 0.01}px, ${(mousePosition.y - 150) * 0.01}px)`
                    : 'translate(0px, 0px)',
                }}
              >
                {title}
              </motion.h3>
              <motion.p 
                className="text-brand-slate text-lg leading-relaxed group-hover:text-brand-dark transition-colors duration-300"
                style={{
                  transform: isHovered 
                    ? `translate(${(mousePosition.x - 200) * 0.005}px, ${(mousePosition.y - 150) * 0.005}px)`
                    : 'translate(0px, 0px)',
                }}
              >
                {description}
              </motion.p>
            </div>
          </div>
        </CardContent>
        
        {/* Glass reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl" />
      </Card>
    </motion.div>
  );
};

export default InteractiveGlassBenefitCard;
