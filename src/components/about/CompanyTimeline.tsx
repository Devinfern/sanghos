
import { motion } from "framer-motion";

interface CompanyTimelineProps {
  isLoaded: boolean;
}

const CompanyTimeline = ({ isLoaded }: CompanyTimelineProps) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const milestones = [
    {
      year: "2019",
      title: "The Beginning",
      description: "Sanghos started as a small community of mindfulness practitioners in San Francisco hosting informal gatherings."
    },
    {
      year: "2020",
      title: "Digital Pivot",
      description: "During the pandemic, we created virtual retreat experiences, connecting people across distances when they needed it most."
    },
    {
      year: "2021",
      title: "Official Launch",
      description: "Sanghos platform launched officially, connecting retreat hosts with spaces and participants for in-person experiences."
    },
    {
      year: "2022",
      title: "Expansion",
      description: "Expanded to 5 major cities with over 100 hosts and 50 instructors joining our growing community."
    },
    {
      year: "2023",
      title: "Community Growth",
      description: "Reached 10,000 retreat participants and launched our host certification program for quality experiences."
    }
  ];

  return (
    <section className="py-20 bg-sand-50">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Journey</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From a small community gathering to a thriving platform
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-sand-200"></div>
          
          {/* Timeline Items */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2 + (index * 0.1), duration: 0.6 }}
                className={`flex flex-col md:flex-row gap-8 relative ${
                  index % 2 === 0 ? "md:flex-row-reverse text-left md:text-right" : ""
                }`}
              >
                <div className="md:w-1/2"></div>
                <div className="z-10 absolute left-0 md:left-1/2 transform -translate-y-1/3 md:-translate-x-1/2 w-10 h-10 rounded-full bg-sage-500 border-4 border-white flex items-center justify-center">
                  <span className="text-white font-bold text-xs">{milestone.year}</span>
                </div>
                <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-sm border border-sand-100">
                  <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyTimeline;
