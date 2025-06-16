
import React from 'react';
import RetreatHero from './RetreatHero';
import RetreatBreadcrumb from './RetreatBreadcrumb';
import RecentlyViewedSection from './RecentlyViewedSection';
import AdvancedRetreatFilters from './AdvancedRetreatFilters';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ViewMode } from '@/hooks/useRetreatPageData';

interface RetreatPageHeaderProps {
  activeTab: string;
  searchQuery: string;
  selectedCategory: string | null;
  selectedLocation: string;
  selectedPriceRange: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  viewMode: ViewMode;
  sortBy: string;
  allCategories: string[];
  retreatCounts: {
    all: number;
    sanghos: number;
    thirdparty: number;
  };
  onCategorySelect: (category: string) => void;
  onTabChange: (tab: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedLocation: (location: string) => void;
  setSelectedPriceRange: (range: string) => void;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  setViewMode: (mode: ViewMode) => void;
  setSortBy: (sort: string) => void;
  onSearch: (query: string) => void;
  resetFilters: () => void;
  getCardViewMode: (viewMode: ViewMode) => 'grid' | 'list';
}

const RetreatPageHeader: React.FC<RetreatPageHeaderProps> = ({
  activeTab,
  searchQuery,
  selectedCategory,
  selectedLocation,
  selectedPriceRange,
  startDate,
  endDate,
  viewMode,
  sortBy,
  allCategories,
  retreatCounts,
  onCategorySelect,
  onTabChange,
  setSearchQuery,
  setSelectedCategory,
  setSelectedLocation,
  setSelectedPriceRange,
  setStartDate,
  setEndDate,
  setViewMode,
  setSortBy,
  onSearch,
  resetFilters,
  getCardViewMode
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  return (
    <>
      <RetreatHero 
        onCategorySelect={onCategorySelect}
        onTabChange={onTabChange}
        retreatCounts={retreatCounts}
        activeTab={activeTab}
      />
      
      <div className="container px-4 md:px-6 py-10 flex-grow bg-sage-50/30">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md focus-within:shadow-lg focus-within:border-sage-300 transition-all duration-300">
              <Search className="absolute left-5 text-gray-400 h-5 w-5" />
              <Input 
                type="search" 
                placeholder="Search retreats by name, location, or type..." 
                className="flex-1 pl-14 pr-4 py-4 bg-transparent border-0 rounded-2xl focus:ring-0 focus:outline-none text-base placeholder:text-gray-500" 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button 
                type="button"
                onClick={() => onSearch(searchQuery)}
                variant="ghost"
                size="sm"
                className="mr-2 text-sage-600 hover:text-sage-700 hover:bg-sage-50 rounded-xl px-4 py-2 transition-colors duration-200"
              >
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Retreat Type Tabs */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Tabs value={activeTab} onValueChange={onTabChange}>
            <TabsList className="grid w-full grid-cols-3 max-w-md bg-white shadow-sm">
              <TabsTrigger value="all" className="data-[state=active]:bg-sage-100">
                All ({retreatCounts.all})
              </TabsTrigger>
              <TabsTrigger value="sanghos" className="data-[state=active]:bg-sage-100">
                Sanghos ({retreatCounts.sanghos})
              </TabsTrigger>
              <TabsTrigger value="thirdparty" className="data-[state=active]:bg-sage-100">
                Partners ({retreatCounts.thirdparty})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Advanced Filters */}
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

        <RetreatBreadcrumb 
          activeTab={activeTab}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />

        <RecentlyViewedSection />
      </div>
    </>
  );
};

export default RetreatPageHeader;
