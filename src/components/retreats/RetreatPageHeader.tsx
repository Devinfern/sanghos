
import React from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
        <RetreatBreadcrumb 
          activeTab={activeTab}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />

        {/* Main search bar */}
        <div className="mb-8">
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

        {/* Retreat type tabs */}
        <div className="mb-8 flex justify-center">
          <Tabs value={activeTab} onValueChange={onTabChange}>
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto bg-white shadow-sm">
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

        <RecentlyViewedSection />
      </div>
    </>
  );
};

export default RetreatPageHeader;
