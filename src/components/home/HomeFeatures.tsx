
import { motion } from "framer-motion";
import { FeatureTabs } from "@/components/ui/feature-tabs";

interface HomeFeaturesProps {
  isLoaded: boolean;
}

const HomeFeatures = ({ isLoaded }: HomeFeaturesProps) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={fadeIn}
    >
      <FeatureTabs />
    </motion.div>
  );
};

export default HomeFeatures;
