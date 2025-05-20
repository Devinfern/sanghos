
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventList from "@/components/EventList";
import { events } from "@/data/mockEvents";
import DateFilter, { DateFilterOption } from "@/components/DateFilter";

const Events = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDateFilter, setSelectedDateFilter] = useState<DateFilterOption>('all');
  const [customDate, setCustomDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Events | Sanghos</title>
        <meta 
          name="description" 
          content="Browse and book wellness events and partner workshops on Sanghos."
        />
      </Helmet>

      <Header />
      
      <main className="pt-20 bg-sage-50/30 min-h-screen flex flex-col">
        <section className="bg-sage-100/50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-sage-800">Wellness Events</h1>
              <p className="text-lg text-sage-700">
                Discover transformative in-person events and workshops from Sanghos and our partners.
              </p>
            </div>
          </div>
        </section>
        
        <div className="container mx-auto px-4 py-10">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Partner Events</h2>
            <p className="text-muted-foreground mb-6">
              Explore these carefully selected events from our trusted wellness partners.
            </p>
            <div className="flex justify-center mb-8">
              <DateFilter
                selectedOption={selectedDateFilter}
                customDate={customDate}
                onSelectOption={setSelectedDateFilter}
                onSelectCustomDate={setCustomDate}
              />
            </div>
            <EventList events={events} />
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Events;
