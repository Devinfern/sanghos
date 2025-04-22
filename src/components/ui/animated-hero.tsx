
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  // Use the requested titles for animation
  const titles = useMemo(
    () => ["Daylong Retreat", "Meditation Retreat", "Breathwork"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2200);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full bg-transparent">
      <div className="container mx-auto">
        <div className="flex gap-8 py-10 md:py-20 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-4xl md:text-6xl font-extrabold max-w-3xl tracking-tighter text-center text-white drop-shadow-lg leading-snug relative">
              Find Your Perfect&nbsp;
              <span className="relative flex w-full justify-center overflow-hidden text-center align-middle min-h-[1.2em] md:pb-2 md:pt-1">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-bold text-brand-primary"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : {
                            y: titleNumber > index ? -120 : 120,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
              &nbsp;Experience
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AnimatedHero };
