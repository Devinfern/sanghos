
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { propertyTypes, priceRanges } from '@/lib/wellnessCentersData';
import PropertyTypeIcon from '@/components/PropertyTypeIcon';
import { useState } from 'react';

interface WellnessPropertyFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedPropertyType: string;
  setSelectedPropertyType: (type: string) => void;
  selectedPriceRange: string;
  setSelectedPriceRange: (range: string) => void;
  selectedSpecialty: string | null;
  setSelectedSpecialty: (specialty: string | null) => void;
  allSpecialties: string[];
  resetFilters: () => void;
}

const WellnessPropertyFilters = ({
  searchQuery,
  setSearchQuery,
  selectedPropertyType,
  setSelectedPropertyType,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedSpecialty,
  setSelectedSpecialty,
  allSpecialties,
  resetFilters
}: WellnessPropertyFiltersProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const hasActiveFilters = searchQuery !== '' || selectedPropertyType !== 'All' || 
                          selectedPriceRange !== 'All' || selectedSpecialty !== null;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search properties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 w-full rounded-full py-3 h-auto bg-white"
        />
      </div>

      {/* Property Type Tabs */}
      <Tabs value={selectedPropertyType} onValueChange={setSelectedPropertyType} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-white border border-sand-200">
          {propertyTypes.map((type) => (
            <TabsTrigger 
              key={type} 
              value={type}
              className="flex items-center gap-2 text-sm data-[state=active]:bg-brand-primary data-[state=active]:text-white"
            >
              {type !== 'All' && (
                <PropertyTypeIcon 
                  propertyType={type as any} 
                  className="h-4 w-4" 
                />
              )}
              {type}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Advanced Filters */}
      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full md:w-auto">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Advanced Filters
            {hasActiveFilters && (
              <Badge variant="default" className="ml-2 h-5 w-5 p-0 text-xs">
                {[searchQuery, selectedPriceRange !== 'All', selectedSpecialty].filter(Boolean).length}
              </Badge>
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              {/* Price Range Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Price Range</label>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <Button
                      key={range}
                      variant={selectedPriceRange === range ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedPriceRange(range)}
                      className="rounded-full"
                    >
                      {range === 'All' ? 'All Prices' : range}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Specialty Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Specialties</label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedSpecialty === null ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSpecialty(null)}
                    className="rounded-full"
                  >
                    All Specialties
                  </Button>
                  {allSpecialties.map((specialty) => (
                    <Button
                      key={specialty}
                      variant={selectedSpecialty === specialty ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedSpecialty(specialty)}
                      className="rounded-full"
                    >
                      {specialty}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              {hasActiveFilters && (
                <div className="pt-2 border-t">
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

export default WellnessPropertyFilters;
