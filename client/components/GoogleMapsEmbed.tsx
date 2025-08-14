import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Locate, Minus, Plus } from "lucide-react";

interface PersonPin {
  id: number;
  name: string;
  mode: 'blue' | 'amber' | 'red';
  distance: number;
}

interface GoogleMapsEmbedProps {
  activeMode: 'blue' | 'amber' | 'red' | 'all';
  onRadiusChange: (radius: number) => void;
}

export default function GoogleMapsEmbed({ activeMode, onRadiusChange }: GoogleMapsEmbedProps) {
  const [radius, setRadius] = useState(5000);
  const [zoom, setZoom] = useState(13);
  const [mapUrl, setMapUrl] = useState("");

  const nearbyPeople: PersonPin[] = [
    { id: 1, name: "Maria", mode: "blue", distance: 2300 },
    { id: 2, name: "Carlos", mode: "amber", distance: 1800 },
    { id: 3, name: "Sofia", mode: "red", distance: 4100 },
    { id: 4, name: "Miguel", mode: "blue", distance: 3200 },
    { id: 5, name: "Lucia", mode: "amber", distance: 2800 },
    { id: 6, name: "Diego", mode: "red", distance: 3500 },
  ];

  const modeConfig = {
    all: { color: "#9333EA", name: "Explorar" },
    blue: { color: "#3B82F6", name: "Serio" },
    amber: { color: "#F59E0B", name: "Aventura" },
    red: { color: "#EF4444", name: "Pasión" }
  };

  const filteredPeople = nearbyPeople.filter(person => {
    const modeMatch = activeMode === 'all' || person.mode === activeMode;
    return modeMatch && person.distance <= radius;
  });

  const updateRadius = (newRadius: number) => {
    setRadius(newRadius);
    onRadiusChange(newRadius);
  };

  const generateMapUrl = (zoomLevel: number) => {
    // Base URL with San Vicente de Cañete coordinates
    const baseUrl = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d";
    const coords = "!2d-76.3856!3d-13.0751";
    const mapType = "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f";
    const location = "!5m2!1ses-419!2spe";

    // Calculate distance based on zoom (higher zoom = smaller distance)
    const distance = Math.round(20000 / Math.pow(2, zoomLevel - 10));

    return `${baseUrl}${distance}${coords}${mapType}${zoomLevel}${location}`;
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(18, zoom + 1);
    const newRadius = Math.round(5000 / Math.pow(2, newZoom - 13));
    const clampedRadius = Math.max(500, Math.min(20000, newRadius));

    setZoom(newZoom);
    setMapUrl(generateMapUrl(newZoom));
    updateRadius(clampedRadius);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(10, zoom - 1);
    const newRadius = Math.round(5000 / Math.pow(2, newZoom - 13));
    const clampedRadius = Math.max(500, Math.min(20000, newRadius));

    setZoom(newZoom);
    setMapUrl(generateMapUrl(newZoom));
    updateRadius(clampedRadius);
  };

  const getRadiusDisplay = (radiusMeters: number) => {
    if (radiusMeters >= 1000) {
      return `${(radiusMeters / 1000).toFixed(1)} km`;
    }
    return `${radiusMeters} m`;
  };

  // Initialize map URL on first render
  useState(() => {
    setMapUrl(generateMapUrl(zoom));
  });

  return (
    <div className="relative w-full h-48 lg:h-80 rounded-lg overflow-hidden">
      {/* Google Maps Embed with dynamic zoom */}
      <iframe
        src={mapUrl || "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15544!2d-76.3856!3d-13.0751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5m2!1ses-419!2spe"}
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'contrast(1.1) saturate(0.8)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0"
        key={zoom} // Force reload when zoom changes
      />
      
      {/* Overlay with controls and radius indicator */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Radius Circle Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="border-2 rounded-full transition-all duration-300 pointer-events-none"
            style={{
              width: `${Math.min(200, radius / 50)}px`,
              height: `${Math.min(200, radius / 50)}px`,
              borderColor: (modeConfig[activeMode] || modeConfig.all).color + '88'
            }}
          />
        </div>

        {/* Person Pins Simulation */}
        {filteredPeople.map((person, index) => (
          <div
            key={person.id}
            className="absolute w-4 h-4 rounded-full border-2 border-white shadow-lg pointer-events-none"
            style={{
              backgroundColor: modeConfig[person.mode].color,
              left: `${45 + (index * 8) + Math.sin(index) * 20}%`,
              top: `${40 + (index * 6) + Math.cos(index) * 15}%`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}

        {/* Center User Pin */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-5 h-5 rounded-full border-3 border-white shadow-lg animate-pulse"
            style={{ backgroundColor: (modeConfig[activeMode] || modeConfig.all).color }}
          />
        </div>
      </div>
      
      {/* Controls overlay */}
      <div className="absolute inset-0">
        {/* Location info */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5 pointer-events-none">
          <div className="flex items-center space-x-2">
            <MapPin className="h-3 w-3 text-brich-blue-400" />
            <span className="text-xs font-bold text-white">San Vicente de Cañete</span>
          </div>
        </div>

        {/* Radius indicator */}
        <div className="absolute bottom-3 left-3 bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5 pointer-events-none">
          <div className="flex items-center space-x-2">
            <Locate className="h-3 w-3 text-brich-amber-400" />
            <span className="text-xs font-bold text-white">Radio: {getRadiusDisplay(radius)}</span>
          </div>
        </div>

        {/* Zoom controls */}
        <div className="absolute bottom-3 right-3 flex flex-col space-y-1 pointer-events-auto">
          <Button
            size="icon"
            variant="ghost"
            className="w-8 h-8 bg-black/80 backdrop-blur text-white hover:bg-black/90"
            onClick={handleZoomIn}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="w-8 h-8 bg-black/80 backdrop-blur text-white hover:bg-black/90"
            onClick={handleZoomOut}
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>

        {/* Mode indicator */}
        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur rounded-lg px-3 py-1 pointer-events-none">
          <div className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: (modeConfig[activeMode] || modeConfig.all).color }}
            />
            <span className="text-xs text-white font-medium">
              {filteredPeople.length} {(modeConfig[activeMode] || modeConfig.all).name.toLowerCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
