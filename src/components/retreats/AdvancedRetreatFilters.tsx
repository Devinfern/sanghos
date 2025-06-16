
import { useState } from 'react';
import { SlidersHorizontal, Grid3X3, List, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';

interface AdvancedRetreatFiltersProps {
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
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  allCategories: string[];
  resetFilters: () => void;
}

const AdvancedRetreatFilters = ({
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
  resetFilters
}: AdvancedRetreatFiltersProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const hasActiveFilters = searchQuery !== '' || selectedCategory !== null || 
                          selectedLocation !== 'All' || selectedPriceRange !== 'All' ||
                          startDate !== undefined || endDate !== undefined;

  const priceRanges = ['All', '$0-$100', '$100-$300', '$300-$500', '$500+'];
  const locations = ['All', 'California', 'New York', 'Colorado', 'Arizona', 'Online'];
  const sortOptions = [
    { value: 'date', label: 'Date (Soonest)' },
    { value: 'price-low', label: 'Price (Low to High)' },
    { value: 'price-high', label: 'Price (High to Low)' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'name', label: 'Name (A-Z)' }
  ];

  return (
    <div className="space-y-4">
      {/* Top Row: View Toggle + Sort + Advanced Filters Toggle */}
      <div className="flex items-center justify-end gap-2">
        {/* View Toggle */}
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'grid' | 'list')}>
          <TabsList className="bg-white border border-sage-200">
            <TabsTrigger value="grid" className="data-[state=active]:bg-sage-100">
              <Grid3X3 className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="list" className="data-[state=active]:bg-sage-100">
              <List className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Sort Dropdown */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px] bg-white border-sage-200">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Advanced Filters Toggle */}
        <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="border-sage-200">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <Badge variant="default" className="ml-2 h-5 w-5 p-0 text-xs">
                  {[selectedCategory, selectedLocation !== 'All', selectedPriceRange !== 'All', startDate, endDate].filter(Boolean).length}
                </Badge>
              )}
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </div>

      {/* Advanced Filters Panel */}
      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <CollapsibleContent>
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Date Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <DatePicker date={startDate} setDate={setStartDate} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <DatePicker date={endDate} setDate={setEndDate} />
                </div>

                {/* Location Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price Range</label>
                  <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="All prices" />
                    </SelectTrigger>
                    <SelectContent>
                      {priceRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Categories</label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === null ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                    className="rounded-full"
                  >
                    All Categories
                  </Button>
                  {allCategories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="rounded-full"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              {hasActiveFilters && (
                <div className="pt-4 border-t">
                  <Button
                    variant="ghost"
                    onClick={resetFilters}
                    className="text-sm text-muted-foreground"
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AdvancedRetreatFilters;
