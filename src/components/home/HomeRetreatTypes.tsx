import { motion } from "framer-motion";
const HomeRetreatTypes = () => {
  // Animation variants for container
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  // Animation variants for items
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  return <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute h-96 w-96 rounded-full bg-brand-primary/5 -top-20 -right-20 blur-3xl"></div>
        <div className="absolute h-96 w-96 rounded-full bg-brand-peach/5 -bottom-20 -left-20 blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Text content */}
          <motion.div className="lg:w-1/2" initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={containerVariants}>
            <motion.span className="text-sm font-medium text-brand-primary uppercase tracking-wider mb-3 block" variants={itemVariants}>
              Our Approach
            </motion.span>
            
            <motion.h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6 leading-tight" variants={itemVariants}>We want to make wellness retreats more approachable and accessible. </motion.h2>
            
            <motion.p className="text-xl text-brand-slate mb-8" variants={itemVariants}>
              Through innovative wellness practices, building community connections, and creating accessible retreat 
              experiences, we aspire to expand access to life-changing wellness services for everyone so that people 
              can access the right practices when and where they need them.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <a href="/retreats" className="inline-block bg-[#D2EF9A] hover:bg-[#C2E280] text-brand-dark font-medium px-8 py-4 rounded-full transition-colors">
                Learn More
              </a>
            </motion.div>
          </motion.div>
          
          {/* Image */}
          <motion.div className="lg:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.4
        }}>
            <img src="/lovable-uploads/c7b66cfd-c5b4-498e-92bd-d17042163c8f.png" alt="Group meditation session in a cozy living room" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>;
};
export default HomeRetreatTypes;