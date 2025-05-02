
import { ReactNode, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

interface CommunityLayoutProps {
  children: ReactNode;
  title?: string;
  showCMS?: boolean;
}

const CommunityLayout = ({ children, title = "Community", showCMS = false }: CommunityLayoutProps) => {
  useEffect(() => {
    // Smooth scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Helmet>
        <title>{title} | Sanghos</title>
        <meta name="description" content="Join our wellness community for discussions, events, and more" />
      </Helmet>

      <Header />

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-b from-brand-subtle/10 via-white to-white"
      >
        {showCMS ? (
          <div className="pt-16">{children}</div>
        ) : (
          <>{children}</>
        )}
      </motion.main>

      <Footer />
    </>
  );
};

export default CommunityLayout;
