
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Retreat } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface RetreatMapViewProps {
  retreats: Retreat[];
  onRetreatSelect?: (retreat: Retreat) => void;
}

const RetreatMapView: React.FC<RetreatMapViewProps> = ({ retreats, onRetreatSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const fetchMapboxToken = async () => {
    try {
      console.log('Starting to fetch Mapbox token...');
      
      const { data, error } = await supabase.functions.invoke('get-mapbox-token');
      
      console.log('Supabase function response:', { data, error });
      
      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Failed to fetch Mapbox token: ${error.message}`);
      }
      
      if (!data?.token) {
        console.error('No token in response:', data);
        throw new Error('No token received from server');
      }
      
      console.log('Successfully fetched Mapbox token');
      return data.token;
    } catch (error) {
      console.error('Error in fetchMapboxToken:', error);
      throw error;
    }
  };

  const initializeMap = async () => {
    if (!mapContainer.current) {
      console.error('Map container not found');
      return;
    }

    try {
      console.log('Starting map initialization...');
      setIsLoading(true);
      setError(null);
      
      const token = await fetchMapboxToken();
      console.log('Got token, setting mapboxgl.accessToken');
      
      mapboxgl.accessToken = token;
      
      console.log('Creating new Mapbox map...');
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-98.5795, 39.8283], // Center of US
        zoom: 4
      });

      console.log('Map created, adding event listeners...');

      map.current.on('load', () => {
        console.log('Map loaded successfully');
        setIsLoading(false);
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setError('Failed to load map');
        setIsLoading(false);
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      console.log(`Adding ${retreats.length} retreat markers...`);
      // Add retreat markers
      retreats.forEach((retreat, index) => {
        if (retreat.location?.coordinates) {
          console.log(`Adding marker ${index + 1} for ${retreat.title}`);
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
        } else {
          console.warn(`Retreat ${retreat.title} has no coordinates`);
        }
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      setError(`Failed to load map: ${error.message}`);
      setIsLoading(false);
    }
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
    console.log('RetreatMapView mounted, initializing map...');
    initializeMap();
    
    return () => {
      console.log('Cleaning up map...');
      map.current?.remove();
    };
  }, [retreats]);

  if (error) {
    return (
      <Card className="p-6 text-center">
        <MapPin className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-medium mb-2">Map Unavailable</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={initializeMap} variant="outline">
          Try Again
        </Button>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="p-6 text-center">
        <Loader2 className="w-16 h-16 text-sage-400 mx-auto mb-4 animate-spin" />
        <h3 className="text-xl font-medium mb-2">Loading Map</h3>
        <p className="text-muted-foreground">
          Initializing interactive map view...
        </p>
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
