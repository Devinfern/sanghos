
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AdvancedFloatingGlass = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  // Parallax transforms for different layers
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -300]);
  const rotate1 = useTransform(scrollY, [0, 1000], [0, 45]);
  const rotate2 = useTransform(scrollY, [0, 1000], [0, -30]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Layer 1 - Large background orbs */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10"
        style={{ 
          y: y1,
          rotate: rotate1,
          x: mousePosition.x * 50 - 25,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-brand-primary/3 backdrop-blur-3xl border border-brand-primary/8"
        style={{ 
          y: y2,
          rotate: rotate2,
          x: mousePosition.x * -30 + 15,
        }}
        animate={{
          scale: [1, 0.9, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Layer 2 - Medium floating elements */}
      <motion.div
        className="absolute top-1/3 left-1/2 w-64 h-64 rounded-full bg-brand-peach/4 backdrop-blur-2xl border border-brand-peach/8"
        style={{ 
          y: y3,
          x: mousePosition.x * 40 - 20,
          y: mousePosition.y * 30 - 15,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Layer 3 - Small interactive particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-16 rounded-full bg-white/8 backdrop-blur-xl border border-white/15"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
            x: mousePosition.x * (20 + i * 5) - (10 + i * 2.5),
            y: mousePosition.y * (15 + i * 3) - (7.5 + i * 1.5),
          }}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Layer 4 - Morphing glass shapes */}
      <motion.div
        className="absolute top-1/2 right-1/4 w-48 h-48 bg-gradient-to-br from-white/10 to-brand-sky/5 backdrop-blur-2xl border border-white/20"
        style={{
          borderRadius: scrollY.get() % 200 > 100 ? "50%" : "25%",
          x: mousePosition.x * 25 - 12.5,
          y: y1,
        }}
        animate={{
          borderRadius: ["25%", "50%", "25%"],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Layer 5 - Cursor-responsive magnetic orb */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-brand-primary/8 to-transparent backdrop-blur-xl border border-brand-primary/15"
        style={{
          left: `${mousePosition.x * 100}%`,
          top: `${mousePosition.y * 100}%`,
          transform: `translate(-50%, -50%)`,
        }}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Ambient light effects */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(37, 182, 164, 0.1) 0%, transparent 50%)`,
        }}
      />
    </div>
  );
};

export default AdvancedFloatingGlass;
