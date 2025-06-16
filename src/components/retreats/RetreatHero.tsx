
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Leaf, Mountain, Heart } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";

interface RetreatHeroProps {
  onCategorySelect?: (category: string) => void;
  onTabChange?: (tab: string) => void;
  retreatCounts?: {
    all: number;
    sanghos: number;
    thirdparty: number;
  };
  activeTab?: string;
}

const RetreatHero = ({
  onCategorySelect,
  onTabChange,
  retreatCounts = {
    all: 0,
    sanghos: 0,
    thirdparty: 0
  },
  activeTab = "all"
}: RetreatHeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-8, 8, -8],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative min-h-[85vh] overflow-hidden bg-gradient-to-br from-sage-900 via-sage-800 to-sage-700">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <OptimizedImage
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070"
          alt="Mountain landscape with sun rays"
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sage-900/80 via-sage-800/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-sage-900/40 via-transparent to-sage-800/20"></div>
      </div>

      {/* Floating Decoration Elements */}
      <motion.div
        className="absolute top-20 right-16 opacity-20"
        variants={floatingVariants}
        animate="animate"
      >
        <Leaf className="h-8 w-8 text-white" />
      </motion.div>
      
      <motion.div
        className="absolute top-32 left-20 opacity-15"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 2 }}
      >
        <Mountain className="h-10 w-10 text-white" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-32 opacity-25"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 4 }}
      >
        <Heart className="h-6 w-6 text-white" />
      </motion.div>

      {/* Animated Sparkles */}
      <motion.div
        className="absolute top-24 right-1/4"
        initial={{ opacity: 0, scale: 0 }}
        animate={isLoaded ? { opacity: 0.3, scale: 1 } : {}}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Sparkles className="h-6 w-6 text-white" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-24 left-1/3"
        initial={{ opacity: 0, scale: 0 }}
        animate={isLoaded ? { opacity: 0.2, scale: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.8, 1]
          }}
          transition={{
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Sparkles className="h-4 w-4 text-white" />
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 min-h-[85vh] flex items-center">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Content */}
            <motion.div
              className="text-white"
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <div className="flex items-center mb-6">
                  <motion.div
                    className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Sparkles className="h-4 w-4 mr-2 text-brand-peach" />
                    <span className="text-sm font-medium">Discover Your Journey</span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Find Your Perfect{" "}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-brand-peach via-white to-brand-subtle bg-clip-text text-transparent">
                      Daylong Retreat
                    </span>
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-brand-peach to-brand-subtle rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={isLoaded ? { scaleX: 1 } : {}}
                      transition={{ duration: 1, delay: 1.2 }}
                    />
                  </span>
                </h1>
              </motion.div>

              <motion.div variants={itemVariants}>
                <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
                  Discover curated retreats designed to help you reconnect with yourself, 
                  find balance, and cultivate mindfulness in stunning natural locations.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <div className="grid grid-cols-3 gap-4 max-w-md">
                  <motion.div
                    className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                    whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.15)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-2xl font-bold text-brand-peach">
                      {retreatCounts.all}+
                    </div>
                    <div className="text-sm text-white/80">Retreats</div>
                  </motion.div>
                  
                  <motion.div
                    className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                    whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.15)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-2xl font-bold text-brand-peach">50+</div>
                    <div className="text-sm text-white/80">Locations</div>
                  </motion.div>
                  
                  <motion.div
                    className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                    whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.15)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-2xl font-bold text-brand-peach">1000+</div>
                    <div className="text-sm text-white/80">Happy Guests</div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Journey Visualization */}
            <motion.div
              className="hidden lg:block relative"
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <motion.div
                variants={itemVariants}
                className="relative"
              >
                {/* Journey Steps */}
                <div className="space-y-8">
                  <motion.div
                    className="flex items-center space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.15)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-peach rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Choose Your Experience</h3>
                      <p className="text-white/70 text-sm">Browse curated retreats that match your wellness goals</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 ml-8"
                    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.15)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-peach rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Connect & Prepare</h3>
                      <p className="text-white/70 text-sm">Join your retreat community and get ready for transformation</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.15)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-peach rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Experience & Grow</h3>
                      <p className="text-white/70 text-sm">Immerse yourself in mindful practices and natural beauty</p>
                    </div>
                  </motion.div>
                </div>

                {/* Connecting Lines */}
                <motion.div
                  className="absolute left-6 top-20 bottom-20 w-0.5 bg-gradient-to-b from-brand-peach/50 to-transparent"
                  initial={{ scaleY: 0 }}
                  animate={isLoaded ? { scaleY: 1 } : {}}
                  transition={{ duration: 1.5, delay: 1 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sage-50 to-transparent"></div>
    </div>
  );
};

export default RetreatHero;
