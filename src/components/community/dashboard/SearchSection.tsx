
import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      custom={1}
      className="max-w-3xl mx-auto mb-12"
    >
      <div className="relative">
        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
        <Input
          placeholder="Search discussions, events, resources, and members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-16 pr-6 py-4 text-lg rounded-2xl border-2 border-brand-subtle/30 focus:border-brand-primary transition-colors bg-white shadow-sm"
        />
        {searchQuery && (
          <Button
            size="sm"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-xl"
          >
            Search
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default SearchSection;
