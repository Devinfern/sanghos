
import { Hotel, Home, Building, Bed } from 'lucide-react';
import { RetreatCenter } from '@/lib/wellnessCentersData';

interface PropertyTypeIconProps {
  propertyType: RetreatCenter['propertyType'];
  className?: string;
}

const PropertyTypeIcon = ({ propertyType, className = "h-4 w-4" }: PropertyTypeIconProps) => {
  switch (propertyType) {
    case 'Hotel':
      return <Hotel className={className} />;
    case 'Retreat Center':
      return <Home className={className} />;
    case 'Studio':
      return <Building className={className} />;
    case 'Wellness Stay':
      return <Bed className={className} />;
    default:
      return <Home className={className} />;
  }
};

export default PropertyTypeIcon;
