
import React from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ViewMode } from '@/hooks/useRetreatPageData';
import AdvancedRetreatFilters from './AdvancedRetreatFilters';
import RetreatSearchSuggestions from './RetreatSearchSuggestions';

interface RetreatPageFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedPriceRange: string;
  setSelectedPriceRange: (range: string) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  allCategories: string[];
  allRetreats: any[];
  resetFilters: () => void;
  getCardViewMode: (viewMode: ViewMode) => 'grid' | 'list';
  onSearch: (query: string) => void;
}

const RetreatPageFilters: React.FC<RetreatPageFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  selectedPriceRange,
  setSelectedPriceRange,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  allCategories,
  allRetreats,
  resetFilters,
  getCardViewMode,
  onSearch
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="space-y-6">
      {/* Main search bar */}
      <div className="mb-6">
        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              type="search" 
              placeholder="Search retreats by name, location, or type..." 
              className="pl-10 py-6 bg-white border-0 shadow-md hover:shadow-lg transition-shadow duration-300" 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
            />
            <Button 
              type="submit" 
              className="absolute right-1.5 top-1/2 transform -translate-y-1/2 group"
            >
              Search
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </form>
      </div>

      <AdvancedRetreatFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={setSelectedPriceRange}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        viewMode={getCardViewMode(viewMode)}
        setViewMode={(mode) => setViewMode(mode as ViewMode)}
        sortBy={sortBy}
        setSortBy={setSortBy}
        allCategories={allCategories}
        resetFilters={resetFilters}
      />
    </div>
  );
};

export default RetreatPageFilters;
