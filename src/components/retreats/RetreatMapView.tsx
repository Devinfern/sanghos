
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Retreat } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Navigation } from 'lucide-react';
import { toast } from 'sonner';

interface RetreatMapViewProps {
  retreats: Retreat[];
  onRetreatSelect?: (retreat: Retreat) => void;
}

const RetreatMapView: React.FC<RetreatMapViewProps> = ({ retreats, onRetreatSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isTokenSet, setIsTokenSet] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-98.5795, 39.8283], // Center of US
      zoom: 4
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add retreat markers
    retreats.forEach((retreat) => {
      if (retreat.location.coordinates) {
        const marker = new mapboxgl.Marker({
          color: '#6B7280'
        })
          .setLngLat([retreat.location.coordinates.lng, retreat.location.coordinates.lat])
          .setPopup(new mapboxgl.Popup().setHTML(`
            <div class="p-2">
              <h3 class="font-semibold">${retreat.title}</h3>
              <p class="text-sm text-gray-600">${retreat.location.city}, ${retreat.location.state}</p>
              <p class="text-sm font-medium">$${retreat.price}</p>
            </div>
          `))
          .addTo(map.current!);

        marker.getElement().addEventListener('click', () => {
          onRetreatSelect?.(retreat);
        });
      }
    });

    setIsTokenSet(true);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          if (map.current) {
            // Add user location marker
            new mapboxgl.Marker({ color: '#EF4444' })
              .setLngLat([longitude, latitude])
              .setPopup(new mapboxgl.Popup().setHTML('<div class="p-2"><h3>Your Location</h3></div>'))
              .addTo(map.current);
            
            // Center map on user location
            map.current.flyTo({
              center: [longitude, latitude],
              zoom: 8
            });
          }
          
          toast.success('Location detected successfully');
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error('Could not detect your location');
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
    }
  };

  useEffect(() => {
    if (mapboxToken && !isTokenSet) {
      initializeMap();
    }
  }, [mapboxToken, retreats]);

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!mapboxToken) {
    return (
      <Card className="p-6 text-center">
        <MapPin className="w-16 h-16 text-sage-400 mx-auto mb-4" />
        <h3 className="text-xl font-medium mb-2">Map View</h3>
        <p className="text-muted-foreground mb-4">
          Enter your Mapbox token to view retreats on an interactive map
        </p>
        <div className="max-w-md mx-auto space-y-3">
          <Input
            type="password"
            placeholder="Enter Mapbox public token"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Get your free token at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-sage-600 hover:underline">mapbox.com</a>
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Map controls */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2">
        <Button
          variant="outline"
          size="sm"
          onClick={getUserLocation}
          className="flex items-center gap-2"
        >
          <Navigation className="h-4 w-4" />
          Find Me
        </Button>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <span>Retreats</span>
        </div>
        {userLocation && (
          <div className="flex items-center gap-2 text-sm mt-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Your Location</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetreatMapView;
