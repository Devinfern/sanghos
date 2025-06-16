
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
        {/* Redesigned Search Bar */}
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
