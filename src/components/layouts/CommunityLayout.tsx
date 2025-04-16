
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

interface CommunityLayoutProps {
  children: ReactNode;
  title?: string;
  showCMS?: boolean;
}

const CommunityLayout = ({ children, title = "Community", showCMS = false }: CommunityLayoutProps) => {
  return (
    <>
      <Helmet>
        <title>{title} | Sanghos</title>
        <meta name="description" content="Join our community for discussions, events, and more" />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-brand-subtle/20 to-white">
        {children}
      </main>

      <Footer />
    </>
  );
};

export default CommunityLayout;
