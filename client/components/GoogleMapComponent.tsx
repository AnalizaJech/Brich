import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Locate, Minus, Plus, Navigation } from "lucide-react";

interface PersonPin {
  id: number;
  name: string;
  lat: number;
  lng: number;
  mode: 'blue' | 'amber' | 'red';
  distance: number;
  profileImage?: string;
}

interface GoogleMapComponentProps {
  activeMode: 'blue' | 'amber' | 'red';
  onRadiusChange: (radius: number) => void;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function GoogleMapComponent({ activeMode, onRadiusChange }: GoogleMapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [circle, setCircle] = useState<any>(null);
  const [radius, setRadius] = useState(5000);
  const [userLocation, setUserLocation] = useState({ lat: -13.0751, lng: -76.3856 }); // San Vicente de Cañete
  const [markers, setMarkers] = useState<any[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Sample people around San Vicente de Cañete
  const nearbyPeople: PersonPin[] = [
    { id: 1, name: "Maria", lat: -13.0751, lng: -76.3856, mode: "blue", distance: 2300, profileImage: "M" },
    { id: 2, name: "Carlos", lat: -13.0821, lng: -76.3756, mode: "amber", distance: 1800, profileImage: "C" },
    { id: 3, name: "Sofia", lat: -13.0651, lng: -76.3956, mode: "red", distance: 4100, profileImage: "S" },
    { id: 4, name: "Miguel", lat: -13.0781, lng: -76.3806, mode: "blue", distance: 3200, profileImage: "M" },
    { id: 5, name: "Lucia", lat: -13.0701, lng: -76.3906, mode: "amber", distance: 2800, profileImage: "L" },
    { id: 6, name: "Diego", lat: -13.0831, lng: -76.3706, mode: "red", distance: 3500, profileImage: "D" },
  ];

  const modeConfig = {
    blue: { color: "#3B82F6", name: "Serio" },
    amber: { color: "#F59E0B", name: "Aventura" },
    red: { color: "#EF4444", name: "Pasión" }
  };

  // Initialize Google Map
  const initializeMap = () => {
    if (!window.google || !mapRef.current) return;

    const mapOptions = {
      center: userLocation,
      zoom: 13,
      styles: [
        {
          featureType: "all",
          stylers: [{ saturation: -20 }]
        },
        {
          featureType: "road",
          stylers: [{ visibility: "on" }]
        },
        {
          featureType: "landscape",
          stylers: [{ color: "#1f2937" }]
        },
        {
          featureType: "water",
          stylers: [{ color: "#1e40af" }]
        }
      ],
      disableDefaultUI: true,
      zoomControl: false,
      gestureHandling: 'greedy',
      backgroundColor: '#1f2937'
    };

    const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
    
    // Create radius circle
    const newCircle = new window.google.maps.Circle({
      strokeColor: modeConfig[activeMode].color,
      strokeOpacity: 0.6,
      strokeWeight: 2,
      fillColor: modeConfig[activeMode].color,
      fillOpacity: 0.1,
      map: newMap,
      center: userLocation,
      radius: radius,
    });

    // User location marker
    new window.google.maps.Marker({
      position: userLocation,
      map: newMap,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: modeConfig[activeMode].color,
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#ffffff',
      },
      title: "Tu ubicación"
    });

    setMap(newMap);
    setCircle(newCircle);
    setIsMapLoaded(true);

    // Listen for zoom changes
    newMap.addListener('zoom_changed', () => {
      const zoom = newMap.getZoom();
      const newRadius = Math.max(500, Math.min(20000, 10000 / Math.pow(2, zoom - 13)));
      updateRadius(newRadius);
    });
  };

  // Load Google Maps script
  useEffect(() => {
    if (window.google) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBl2pWN-k4T-8xX-2j_mIr0zNzVp3H5LWw&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    window.initMap = initializeMap;
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Update markers when mode changes
  useEffect(() => {
    if (!map || !isMapLoaded) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    // Filter and create new markers
    const filteredPeople = nearbyPeople.filter(person => person.mode === activeMode);
    const newMarkers = filteredPeople.map(person => {
      const marker = new window.google.maps.Marker({
        position: { lat: person.lat, lng: person.lng },
        map: map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 6,
          fillColor: modeConfig[person.mode].color,
          fillOpacity: 0.9,
          strokeWeight: 2,
          strokeColor: '#ffffff',
        },
        title: person.name
      });

      // Add click listener
      marker.addListener('click', () => {
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; text-align: center;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: ${modeConfig[person.mode].color}; 
                          display: flex; align-items: center; justify-content: center; color: white; 
                          font-weight: bold; margin: 0 auto 8px;">${person.profileImage}</div>
              <div style="font-weight: bold; color: #1f2937;">${person.name}</div>
              <div style="font-size: 12px; color: #6b7280;">${(person.distance/1000).toFixed(1)} km</div>
            </div>
          `
        });
        infoWindow.open(map, marker);
      });

      return marker;
    });

    setMarkers(newMarkers);
  }, [activeMode, map, isMapLoaded]);

  // Update circle color when mode changes
  useEffect(() => {
    if (circle) {
      circle.setOptions({
        strokeColor: modeConfig[activeMode].color,
        fillColor: modeConfig[activeMode].color,
      });
    }
  }, [activeMode, circle]);

  const updateRadius = (newRadius: number) => {
    setRadius(newRadius);
    onRadiusChange(newRadius);
    
    if (circle) {
      circle.setRadius(newRadius);
    }
  };

  const handleZoomIn = () => {
    if (map) {
      map.setZoom(map.getZoom() + 1);
    }
  };

  const handleZoomOut = () => {
    if (map) {
      map.setZoom(map.getZoom() - 1);
    }
  };

  const getRadiusDisplay = (radiusMeters: number) => {
    if (radiusMeters >= 1000) {
      return `${(radiusMeters / 1000).toFixed(1)} km`;
    }
    return `${radiusMeters} m`;
  };

  const filteredCount = nearbyPeople.filter(person => person.mode === activeMode).length;

  return (
    <div className="relative h-48 rounded-lg overflow-hidden">
      {/* Google Maps container */}
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Loading overlay */}
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-brich-blue-900/20 to-brich-red-900/20 flex items-center justify-center">
          <div className="bg-black/50 rounded-lg px-4 py-2">
            <div className="flex items-center space-x-2 text-white">
              <Navigation className="h-4 w-4 animate-spin" />
              <span className="text-sm">Cargando mapa...</span>
            </div>
          </div>
        </div>
      )}

      {/* Controls overlay */}
      {isMapLoaded && (
        <>
          {/* Location info */}
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur rounded-lg px-3 py-1">
            <div className="flex items-center space-x-2 text-white">
              <MapPin className="h-3 w-3" />
              <span className="text-xs font-medium">San Vicente de Cañete</span>
            </div>
          </div>

          {/* Radius indicator */}
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur rounded-lg px-3 py-1">
            <div className="flex items-center space-x-2 text-white">
              <Locate className="h-3 w-3" />
              <span className="text-xs font-medium">Radio: {getRadiusDisplay(radius)}</span>
            </div>
          </div>

          {/* Zoom controls */}
          <div className="absolute bottom-3 right-3 flex flex-col space-y-1">
            <Button
              size="icon"
              variant="ghost"
              className="w-8 h-8 bg-black/70 backdrop-blur text-white hover:bg-black/80"
              onClick={handleZoomIn}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="w-8 h-8 bg-black/70 backdrop-blur text-white hover:bg-black/80"
              onClick={handleZoomOut}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>

          {/* Mode indicator */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur rounded-lg px-3 py-1">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: modeConfig[activeMode].color }}
              />
              <span className="text-xs text-white font-medium">
                {filteredCount} {modeConfig[activeMode].name.toLowerCase()}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
