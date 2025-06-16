
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { featuredCenters } from '@/lib/wellnessCentersData';
import RetreatCenterCard from '@/components/RetreatCenterCard';
import WellnessPropertyFilters from '@/components/WellnessPropertyFilters';

const WellnessStudios = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  const allSpecialties = Array.from(new Set(featuredCenters.flatMap(center => center.specialties))).sort();

  const filteredCenters = featuredCenters.filter(center => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      center.name.toLowerCase().includes(lowercasedQuery) || 
      center.description.toLowerCase().includes(lowercasedQuery) || 
      center.location.toLowerCase().includes(lowercasedQuery) ||
      center.amenities.some(amenity => amenity.toLowerCase().includes(lowercasedQuery));

    const matchesPropertyType = selectedPropertyType === 'All' || center.propertyType === selectedPropertyType;
    const matchesPriceRange = selectedPriceRange === 'All' || center.priceRange === selectedPriceRange;
    const matchesSpecialty = selectedSpecialty === null || center.specialties.includes(selectedSpecialty);

    return matchesSearch && matchesPropertyType && matchesPriceRange && matchesSpecialty;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedPropertyType('All');
    setSelectedPriceRange('All');
    setSelectedSpecialty(null);
  };

  return (
    <>
      <Helmet>
        <title>Wellness Properties | Sanghos</title>
        <meta name="description" content="Discover wellness hotels, retreat centers, studios, and unique stays for your next transformative experience." />
      </Helmet>
      
      <Header />
      
      <main className="pt-24 bg-sage-50/20 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="text-left mb-12 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
              Wellness Properties & Studios
            </h1>
            <p className="text-lg text-slate-600 mb-2">
              Discover transformative wellness experiences across hotels, retreat centers, studios, and unique stays
            </p>
            <p className="text-sm text-slate-500">
              From luxury wellness resorts to intimate meditation centers and modern yoga studios
            </p>
          </div>

          <div className="mb-10">
            <WellnessPropertyFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedPropertyType={selectedPropertyType}
              setSelectedPropertyType={setSelectedPropertyType}
              selectedPriceRange={selectedPriceRange}
              setSelectedPriceRange={setSelectedPriceRange}
              selectedSpecialty={selectedSpecialty}
              setSelectedSpecialty={setSelectedSpecialty}
              allSpecialties={allSpecialties}
              resetFilters={resetFilters}
            />
          </div>

          {/* Results Summary */}
          <div className="mb-8">
            <p className="text-lg font-medium text-brand-dark">
              {filteredCenters.length} {filteredCenters.length === 1 ? 'property' : 'properties'} found
              {selectedPropertyType !== 'All' && (
                <span className="text-slate-600"> • {selectedPropertyType.toLowerCase()}s</span>
              )}
            </p>
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCenters.map((center, index) => (
              <RetreatCenterCard key={center.id} center={center} index={index} />
            ))}
          </div>

          {filteredCenters.length === 0 && (
            <div className="text-center col-span-full py-16">
              <h3 className="text-2xl font-bold text-brand-dark mb-2">No properties found</h3>
              <p className="text-slate-600 mb-4">Try adjusting your search or filters to discover more options.</p>
              <button 
                onClick={resetFilters}
                className="text-brand-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default WellnessStudios;
