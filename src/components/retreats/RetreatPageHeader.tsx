
import React from 'react';
import RetreatHero from './RetreatHero';
import RetreatBreadcrumb from './RetreatBreadcrumb';
import RecentlyViewedSection from './RecentlyViewedSection';

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
  return (
    <>
      <RetreatHero 
        onCategorySelect={onCategorySelect}
        onTabChange={onTabChange}
        retreatCounts={retreatCounts}
        activeTab={activeTab}
      />
      
      <div className="container px-4 md:px-6 py-10 flex-grow bg-sage-50/30">
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
