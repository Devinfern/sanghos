
import React from 'react';
import RetreatHero from './RetreatHero';
import RetreatBreadcrumb from './RetreatBreadcrumb';
import RecentlyViewedSection from './RecentlyViewedSection';
import AdvancedRetreatFilters from './AdvancedRetreatFilters';
import { Search, MapPin, Calendar, DollarSign } from 'lucide-react';
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
      
      <div className="container px-4 md:px-6 py-12 flex-grow bg-gradient-to-b from-sage-50/50 to-white">
        {/* Enhanced Search Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-brand-dark mb-3">Find Your Perfect Retreat</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover transformative experiences tailored to your wellness journey
            </p>
          </div>
          
          {/* Main Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative bg-white rounded-3xl shadow-xl border-2 border-sage-100 hover:border-sage-200 focus-within:border-sage-300 transition-all duration-300 p-2">
              <div className="flex items-center">
                <div className="flex-1 flex items-center">
                  <Search className="ml-6 mr-4 text-sage-400 h-6 w-6" />
                  <Input 
                    type="search" 
                    placeholder="Search by retreat name, location, or type..." 
                    className="flex-1 border-0 bg-transparent text-lg placeholder:text-gray-400 focus:ring-0 focus:outline-none py-4 pr-4" 
                    value={searchQuery} 
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <Button 
                  onClick={() => onSearch(searchQuery)}
                  className="bg-sage-500 hover:bg-sage-600 text-white px-8 py-4 rounded-2xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Filter Pills */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-sage-100 hover:border-sage-200 transition-colors">
                <MapPin className="h-4 w-4 text-sage-500" />
                <span className="text-sm text-gray-600">
                  {selectedLocation === 'All' ? 'Any Location' : selectedLocation}
                </span>
              </div>
              
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-sage-100 hover:border-sage-200 transition-colors">
                <DollarSign className="h-4 w-4 text-sage-500" />
                <span className="text-sm text-gray-600">
                  {selectedPriceRange === 'All' ? 'Any Price' : selectedPriceRange}
                </span>
              </div>
              
              {(startDate || endDate) && (
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-sage-100 hover:border-sage-200 transition-colors">
                  <Calendar className="h-4 w-4 text-sage-500" />
                  <span className="text-sm text-gray-600">
                    {startDate ? startDate.toLocaleDateString() : 'Any Date'}
                  </span>
                </div>
              )}
              
              {selectedCategory && (
                <div className="flex items-center gap-2 bg-sage-100 rounded-full px-4 py-2 shadow-sm border border-sage-200">
                  <span className="text-sm text-sage-700 font-medium">{selectedCategory}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Retreat Type Tabs */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Tabs value={activeTab} onValueChange={onTabChange}>
            <TabsList className="grid w-full grid-cols-3 max-w-md bg-white shadow-lg border border-sage-100 rounded-xl p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-sage-100 data-[state=active]:text-sage-700 rounded-lg py-3">
                All ({retreatCounts.all})
              </TabsTrigger>
              <TabsTrigger value="sanghos" className="data-[state=active]:bg-sage-100 data-[state=active]:text-sage-700 rounded-lg py-3">
                Sanghos ({retreatCounts.sanghos})
              </TabsTrigger>
              <TabsTrigger value="thirdparty" className="data-[state=active]:bg-sage-100 data-[state=active]:text-sage-700 rounded-lg py-3">
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
