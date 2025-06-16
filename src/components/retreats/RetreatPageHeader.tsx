
import React from 'react';
import RetreatHero from './RetreatHero';
import RetreatBreadcrumb from './RetreatBreadcrumb';
import RecentlyViewedSection from './RecentlyViewedSection';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface RetreatPageHeaderProps {
  activeTab: string;
  searchQuery: string;
  selectedCategory: string | null;
  retreatCounts: {
    all: number;
    sanghos: number;
    thirdparty: number;
  };
  onCategorySelect: (category: string) => void;
  onTabChange: (tab: string) => void;
  setSearchQuery: (query: string) => void;
  onSearch: (query: string) => void;
}

const RetreatPageHeader: React.FC<RetreatPageHeaderProps> = ({
  activeTab,
  searchQuery,
  selectedCategory,
  retreatCounts,
  onCategorySelect,
  onTabChange,
  setSearchQuery,
  onSearch
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
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
          <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
              <Input 
                type="search" 
                placeholder="Search retreats by name, location, or type..." 
                className="pl-12 pr-20 py-4 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300 focus:border-sage-300 text-base" 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
              />
              <Button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-sage-600 hover:bg-sage-700 text-white px-6 py-2 rounded-full transition-colors duration-200 shadow-sm hover:shadow-md"
                size="sm"
              >
                Search
              </Button>
            </div>
          </form>
        </div>

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
