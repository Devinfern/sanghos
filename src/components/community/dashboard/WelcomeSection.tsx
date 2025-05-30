
import { motion } from "framer-motion";

const WelcomeSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="text-center py-8"
    >
      <h1 className="text-4xl font-bold text-brand-dark mb-4">
        Welcome to Your Wellness Community
      </h1>
      <p className="text-brand-dark/70 max-w-2xl mx-auto text-lg">
        Discover personalized content, connect with like-minded individuals, and explore trending wellness topics.
      </p>
    </motion.div>
  );
};

export default WelcomeSection;
