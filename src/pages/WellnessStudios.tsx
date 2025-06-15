import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { featuredCenters } from '@/lib/wellnessCentersData';
import RetreatCenterCard from '@/components/RetreatCenterCard';
const WellnessStudios = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const allSpecialties = Array.from(new Set(featuredCenters.flatMap(center => center.specialties))).sort();
  const filteredCenters = featuredCenters.filter(center => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || center.name.toLowerCase().includes(lowercasedQuery) || center.description.toLowerCase().includes(lowercasedQuery) || center.location.toLowerCase().includes(lowercasedQuery);
    const matchesSpecialty = selectedSpecialty === null || center.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });
  return <>
      <Helmet>
        <title>Wellness Studios and Retreat Centers | Sanghos</title>
        <meta name="description" content="Discover top wellness studios and retreat centers." />
      </Helmet>
      <Header />
      <main className="pt-24 bg-sage-50/20 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="text-left mb-12 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-2">Retreat Centers & Wellness Studios</h1>
            <p className="text-lg text-slate-600">Discover your next wellness experience </p>
          </div>

          <div className="mb-10 flex flex-col gap-4">
            <div className="relative flex-grow max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input type="text" placeholder="Search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-12 w-full rounded-full py-3 h-auto bg-white" />
            </div>
            <div className="flex flex-wrap gap-2">
                <Button variant={selectedSpecialty === null ? 'default' : 'outline'} onClick={() => setSelectedSpecialty(null)} className="rounded-full">
                  All
                </Button>
                {allSpecialties.map(specialty => <Button key={specialty} variant={selectedSpecialty === specialty ? 'default' : 'outline'} onClick={() => setSelectedSpecialty(specialty)} className="rounded-full">
                    {specialty}
                  </Button>)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCenters.map((center, index) => <RetreatCenterCard key={center.id} center={center} index={index} />)}
          </div>
            {filteredCenters.length === 0 && <div className="text-center col-span-full py-16">
                    <h3 className="text-2xl font-bold text-brand-dark">No studios found</h3>
                    <p className="text-slate-600 mt-2">Try adjusting your search or filters.</p>
                </div>}
        </div>
      </main>
      <Footer />
    </>;
};
export default WellnessStudios;