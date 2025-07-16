
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturedRetreats from "@/components/FeaturedRetreats";
import { RetreatProvider } from "@/contexts/RetreatContext";
import ComparisonBar from "@/components/retreats/ComparisonBar";
import RetreatQuickPreview from "@/components/retreats/RetreatQuickPreview";
import RetreatPageHeader from "@/components/retreats/RetreatPageHeader";
import RetreatPageContent from "@/components/retreats/RetreatPageContent";
import { useRetreatPageData } from "@/hooks/useRetreatPageData";

const Retreats = () => {
  const {
    // Data
    allRetreats,
    isLoaded,
    isLoadingEvents,
    insightLALoadingError,
    filteredAndSortedRetreats,
    paginatedRetreats,
    allCategories,
    retreatCounts,
    totalPages,
    
    // Filter state
    searchQuery,
    selectedCategory,
    selectedLocation,
    selectedPriceRange,
    startDate,
    endDate,
    activeTab,
    
    // View state
    viewMode,
    sortBy,
    currentPage,
    itemsPerPage,
    userLocation,
    
    // Preview state
    previewRetreat,
    isPreviewOpen,
    
    // Setters
    setSearchQuery,
    setSelectedCategory,
    setSelectedLocation,
    setSelectedPriceRange,
    setStartDate,
    setEndDate,
    setViewMode,
    setSortBy,
    setCurrentPage,
    setItemsPerPage,
    setIsPreviewOpen,
    
    // Handlers
    handleSearch,
    handleCategorySelect,
    handleTabChange,
    handleGetUserLocation,
    resetFilters,
    handleRetreatPreview,
    getCardViewMode
  } = useRetreatPageData();

  return (
    <RetreatProvider>
      <Helmet>
        <title>Retreats | Sanghos</title>
        <meta 
          name="description" 
          content="Discover our mindfulness and wellness retreats to reconnect with yourself."
        />
      </Helmet>

      <Header />
      
      <main className="bg-white min-h-100VH flex flex-col">
        <RetreatPageHeader
          activeTab={activeTab}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          selectedLocation={selectedLocation}
          selectedPriceRange={selectedPriceRange}
          startDate={startDate}
          endDate={endDate}
          viewMode={viewMode}
          sortBy={sortBy}
          allCategories={allCategories}
          retreatCounts={retreatCounts}
          onCategorySelect={handleCategorySelect}
          onTabChange={handleTabChange}
          setSearchQuery={setSearchQuery}
          setSelectedCategory={setSelectedCategory}
          setSelectedLocation={setSelectedLocation}
          setSelectedPriceRange={setSelectedPriceRange}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setViewMode={setViewMode}
          setSortBy={setSortBy}
          onSearch={handleSearch}
          resetFilters={resetFilters}
          getCardViewMode={getCardViewMode}
        />
        
        <div className="container px-4 md:px-6 space-y-6">
          <RetreatPageContent
            filteredAndSortedRetreats={filteredAndSortedRetreats}
            paginatedRetreats={paginatedRetreats}
            isLoaded={isLoaded}
            isLoadingEvents={isLoadingEvents}
            insightLALoadingError={insightLALoadingError}
            activeTab={activeTab}
            viewMode={viewMode}
            setViewMode={setViewMode}
            userLocation={userLocation}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
            handleGetUserLocation={handleGetUserLocation}
            handleRetreatPreview={handleRetreatPreview}
            resetFilters={resetFilters}
            getCardViewMode={getCardViewMode}
          />
        </div>
        
        <FeaturedRetreats />
        
        <ComparisonBar />
      </main>
      
      {/* Quick Preview Modal */}
      <RetreatQuickPreview
        retreat={previewRetreat}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
      
      <Footer />
    </RetreatProvider>
  );
};

export default Retreats;
