
import React from 'react';
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
  getCardViewMode
}) => {
  return (
    <div className="space-y-6">
      {/* Enhanced search with suggestions */}
      <div className="mb-6">
        <RetreatSearchSuggestions
          value={searchQuery}
          onChange={setSearchQuery}
          retreats={allRetreats}
          className="max-w-2xl"
        />
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
