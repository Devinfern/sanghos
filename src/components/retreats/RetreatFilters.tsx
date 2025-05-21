
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RetreatFiltersProps {
  searchQuery: string;
  selectedCategory: string | null;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  resetFilters: () => void;
}

const RetreatFilters: React.FC<RetreatFiltersProps> = ({
  searchQuery,
  selectedCategory,
  setSearchQuery,
  setSelectedCategory,
  resetFilters
}) => {
  const hasFilters = searchQuery !== "" || selectedCategory !== null;
  
  if (!hasFilters) {
    return null;
  }
  
  return (
    <Card className="mb-6 overflow-hidden shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm text-muted-foreground mr-2">Active filters:</span>
            
            {searchQuery && (
              <Badge variant="secondary" className="gap-1 pl-2 pr-1 py-1">
                Search: {searchQuery.length > 15 ? `${searchQuery.substring(0, 15)}...` : searchQuery}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-5 w-5 p-0 ml-1 text-muted-foreground hover:text-foreground"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            
            {selectedCategory && (
              <Badge variant="secondary" className="gap-1 pl-2 pr-1 py-1">
                Category: {selectedCategory}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-5 w-5 p-0 ml-1 text-muted-foreground hover:text-foreground"
                  onClick={() => setSelectedCategory(null)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm text-muted-foreground hover:text-primary ml-auto"
              onClick={resetFilters}
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Clear all filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RetreatFilters;
