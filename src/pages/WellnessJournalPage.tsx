import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WellnessJournal from "@/components/WellnessJournal";
import { cn } from "@/lib/utils";
import { Sparkles, Feather, Heart, Leaf, MapPin } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
const WellnessJournalPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  return <>
      <Helmet>
        <title>AI Retreat Finder | Sanghos</title>
        <meta name="description" content="Discover personalized wellness retreats tailored to your unique needs using our AI-powered retreat matching technology." />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16 min-h-screen relative">
        {/* Forest/Nature Background with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          backgroundAttachment: "fixed"
        }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2C]/85 to-[#1A1F2C]/95" />
        </div>

        <div className="container px-4 md:px-6 max-w-5xl mx-auto relative z-10">
          <div className={cn("mb-12 text-center transition-opacity duration-700", isLoaded ? "opacity-100" : "opacity-0")}>
            <motion.div initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            duration: 0.6,
            delay: 0.1
          }} className="my-[100px]">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">AI Retreat Finder</h1>
              <p className="text-white/80 max-w-2xl mx-auto text-lg">Unlock your perfect wellness journey with our AI-powered retreat matching service. Share your thoughts and let our intelligent system guide you to transformative IRL experiences.</p>
            </motion.div>

            <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.6,
            delay: 0.3
          }} className="flex justify-center gap-8 mt-8 mb-12">
              <div className="flex items-center text-white/80">
                <Feather className="h-5 w-5 mr-2" />
                <span className="text-sm">Express</span>
              </div>
              <div className="flex items-center text-white/80">
                <Sparkles className="h-5 w-5 mr-2" />
                <span className="text-sm">Analyze</span>
              </div>
              <div className="flex items-center text-white/80">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-sm">Discover</span>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{
          y: 20,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          duration: 0.7,
          delay: 0.4
        }} className="relative">
            <div className="absolute -top-4 -left-4 h-20 w-20 text-white/10 opacity-70">
              <Leaf className="h-full w-full" />
            </div>
            
            <div className="absolute -bottom-8 -right-8 h-24 w-24 text-white/10 opacity-70 rotate-45">
              <Feather className="h-full w-full" />
            </div>
            
            <div className="relative z-10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-brand-subtle/20 bg-white/[0.07]">
              <WellnessJournal />
            </div>
          </motion.div>

          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 1,
          delay: 0.7
        }} className="mt-24 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">Benefits of Journaling</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="p-6 bg-white/10 rounded-xl shadow-sm border border-white/20 backdrop-blur-sm">
                <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="text-white h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Enhanced Self-Awareness</h3>
                <p className="text-white/70">Regular journaling helps you identify patterns in your emotions and behaviors.</p>
              </div>
              
              <div className="p-6 bg-white/10 rounded-xl shadow-sm border border-white/20 backdrop-blur-sm">
                <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-white h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Stress Reduction</h3>
                <p className="text-white/70">Writing down your thoughts can help reduce anxiety and mental clutter.</p>
              </div>
              
              <div className="p-6 bg-white/10 rounded-xl shadow-sm border border-white/20 backdrop-blur-sm">
                <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="text-white h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Personal Growth</h3>
                <p className="text-white/70">Document your journey and celebrate your progress toward wellness goals.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>;
};
export default WellnessJournalPage;