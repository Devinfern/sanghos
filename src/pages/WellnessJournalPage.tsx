
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WellnessJournal from "@/components/WellnessJournal";
import { Badge } from "@/components/ui/badge";
import OfferingCard from "@/components/OfferingCard";
import { Calendar, User, Star } from "lucide-react";

const OFFERINGS = [
  {
    icon: <Calendar className="h-6 w-6 text-brand-primary" />,
    title: "Daylong Wellness Retreats",
    description:
      "Enjoy intimate retreats led by expert instructors in private, beautiful spaces near you.",
    color: "from-brand-primary/10 to-sage-50",
  },
  {
    icon: <User className="h-6 w-6 text-brand-peach" />,
    title: "Personalized Recommendations",
    description:
      "Get AI-powered suggestions for events and retreats based on your wellness goals and location.",
    color: "from-brand-peach/10 to-sage-50",
  },
  {
    icon: <Star className="h-6 w-6 text-brand-rose" />,
    title: "Expert Instructors",
    description:
      "Practice with passionate, vetted wellness professionals who bring authenticity and care.",
    color: "from-brand-rose/10 to-sage-50",
  },
];

const WellnessJournalPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Wellness Journal & Local Events | Sanghos</title>
        <meta
          name="description"
          content="Express yourself through journaling and discover personalized local wellness events and retreats tailored to your unique needs."
        />
      </Helmet>

      <Header />

      <main className="min-h-screen relative bg-gradient-to-br from-sage-50 via-sand-100 to-brand-subtle/30">
        {/* Soft decorative background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none -z-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sage-50/90 to-sage-100/95 -z-10" />

        {/* Responsive two-column layout */}
        <div className="container mx-auto py-12 lg:py-20 px-4 md:px-10 max-w-7xl relative z-10 flex flex-col md:flex-row gap-16 items-stretch">
          {/* Left: Hero & Offerings */}
          <section className="w-full md:w-1/2 flex flex-col gap-10 justify-center">
            <div className="rounded-3xl bg-gradient-to-br from-brand-primary/10 to-white shadow-lg px-7 py-10 md:px-12 md:py-14 mb-8">
              <Badge
                variant="outline"
                className="mb-3 bg-brand-primary/20 text-brand-primary font-medium px-4 py-1.5 text-base"
              >
                AI-Powered Wellness
              </Badge>
              <h1 className="text-3xl md:text-4xl font-semibold font-banana text-sage-900 mb-3 leading-tight">
                Your Wellness Insight Starts Here
              </h1>
              <p className="text-lg text-sage-700 mb-5 leading-relaxed max-w-xl">
                Journal your goals—receive personalized local event & retreat recommendations just for you, powered by AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 mt-4">
                {OFFERINGS.map((offering, i) => (
                  <OfferingCard key={i} {...offering} />
                ))}
              </div>
            </div>
          </section>

          {/* Right: Journal + Dock */}
          <section className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="rounded-3xl bg-white/90 border border-sage-200/40 shadow-xl px-4 py-8 md:p-8">
              <WellnessJournal />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default WellnessJournalPage;
