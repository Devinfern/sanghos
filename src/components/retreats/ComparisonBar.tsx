
import React from "react";
import { X, Scale, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useRetreatContext } from "@/contexts/RetreatContext";
import { motion, AnimatePresence } from "framer-motion";

const ComparisonBar: React.FC = () => {
  const { comparison, removeFromComparison, clearComparison } = useRetreatContext();

  if (comparison.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-4 right-4 z-50"
      >
        <Card className="bg-white shadow-lg border border-sage-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Scale className="h-5 w-5 mr-2 text-sage-600" />
                <span className="font-medium">Compare Retreats</span>
                <Badge variant="secondary" className="ml-2">
                  {comparison.length}/3
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearComparison}
                className="text-muted-foreground hover:text-red-600"
              >
                Clear All
              </Button>
            </div>
            
            <div className="flex items-center gap-3 mb-3">
              {comparison.map((retreat) => (
                <div key={retreat.id} className="flex items-center gap-2 bg-sage-50 rounded-lg p-2">
                  <span className="text-sm font-medium truncate max-w-[120px]">
                    {retreat.title}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromComparison(retreat.id)}
                    className="h-5 w-5 p-0 text-muted-foreground hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            
            <Button
              className="w-full bg-sage-600 hover:bg-sage-700"
              disabled={comparison.length < 2}
            >
              <Eye className="h-4 w-4 mr-2" />
              Compare {comparison.length} Retreats
            </Button>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default ComparisonBar;
