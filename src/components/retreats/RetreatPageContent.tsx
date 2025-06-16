
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Grid, List, MapIcon } from 'lucide-react';
import { ViewMode, type UserLocation } from '@/hooks/useRetreatPageData';
import RetreatResultsHeader from './RetreatResults';
import RetreatCardSkeleton from './RetreatCardSkeleton';
import RetreatMapView from './RetreatMapView';
import RetreatCard from '@/components/RetreatCard';
import RetreatPagination from './RetreatPagination';
import NoRetreatsFound from './NoRetreatsFound';

interface RetreatPageContentProps {
  // Data
  filteredAndSortedRetreats: any[];
  paginatedRetreats: any[];
  isLoaded: boolean;
  isLoadingEvents: boolean;
  insightLALoadingError: boolean;
  activeTab: string;
  
  // View state
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  userLocation: UserLocation | null;
  
  // Pagination
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  
  // Handlers
  handleGetUserLocation: () => void;
  handleRetreatPreview: (retreat: any) => void;
  resetFilters: () => void;
  getCardViewMode: (viewMode: ViewMode) => 'grid' | 'list';
}

const RetreatPageContent: React.FC<RetreatPageContentProps> = ({
  filteredAndSortedRetreats,
  paginatedRetreats,
  isLoaded,
  isLoadingEvents,
  insightLALoadingError,
  activeTab,
  viewMode,
  setViewMode,
  userLocation,
  currentPage,
  totalPages,
  itemsPerPage,
  setCurrentPage,
  setItemsPerPage,
  handleGetUserLocation,
  handleRetreatPreview,
  resetFilters,
  getCardViewMode
}) => {
  return (
    <>
      {/* Enhanced view mode controls */}
      <div className="flex items-center justify-between mb-6">
        <RetreatResultsHeader 
          filteredCount={filteredAndSortedRetreats.length} 
          activeTab={activeTab}
          isLoadingEvents={isLoadingEvents}
        />
        
        <div className="flex items-center gap-2">
          {!userLocation && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleGetUserLocation}
              className="text-sm"
            >
              Detect Location
            </Button>
          )}
          
          <div className="flex border rounded-lg overflow-hidden">
            <Button 
              variant="ghost" 
              size="sm"
              className={cn(
                "rounded-none border-0", 
                viewMode === "grid" && "bg-sage-100"
              )}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className={cn(
                "rounded-none border-0 border-l border-r", 
                viewMode === "list" && "bg-sage-100"
              )}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className={cn(
                "rounded-none border-0", 
                viewMode === "map" && "bg-sage-100"
              )}
              onClick={() => setViewMode("map")}
            >
              <MapIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content section with map view support */}
      {isLoadingEvents ? (
        <div className={cn(
          "gap-6 mb-10",
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "flex flex-col space-y-4"
        )}>
          {Array.from({ length: 6 }).map((_, index) => (
            <RetreatCardSkeleton key={index} viewMode={getCardViewMode(viewMode)} />
          ))}
        </div>
      ) : viewMode === 'map' ? (
        <RetreatMapView
          retreats={filteredAndSortedRetreats}
          onRetreatSelect={handleRetreatPreview}
        />
      ) : filteredAndSortedRetreats.length > 0 ? (
        <>
          <div 
            className={cn(
              "gap-6 mb-10 transition-opacity duration-700",
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "flex flex-col space-y-4",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
          >
            {paginatedRetreats.map((retreat, index) => (
              <div
                key={retreat.id}
                className="cursor-pointer"
                onClick={() => handleRetreatPreview(retreat)}
              >
                <RetreatCard 
                  retreat={retreat} 
                  index={index}
                  comingSoon={retreat.isSanghos}
                  viewMode={getCardViewMode(viewMode)}
                  userLocation={userLocation}
                />
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <RetreatPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredAndSortedRetreats.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(newItemsPerPage) => {
              setItemsPerPage(newItemsPerPage);
              setCurrentPage(1);
            }}
          />
        </>
      ) : (
        <NoRetreatsFound resetFilters={resetFilters} loadingError={insightLALoadingError} />
      )}
    </>
  );
};

export default RetreatPageContent;
