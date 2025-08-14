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
  const [radius, setRadius] = useState(5000); // Start at 5km
  const [zoom, setZoom] = useState(14); // Closer zoom for better detail
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

  const getMapUrl = (zoomLevel: number) => {
    // Use original working URL and modify zoom parameter
    const baseUrl = "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d15544.873545863364!2d-76.4068570447244!3d-13.085341426263092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f";
    const endUrl = "!4m13!3e6!4m5!1s0x910ff9495dbe053f%3A0x10f4c235753f7244!2sSan%20Vicente%20de%20Ca%C3%B1ete%2C%20Per%C3%BA!3m2!1d-13.076476699999999!2d-76.38488319999999!4m5!1s0x910ff9495dbe053f%3A0x10f4c235753f7244!2sSan%20Vicente%20de%20Ca%C3%B1ete%2C%20Per%C3%BA!3m2!1d-13.076476699999999!2d-76.38488319999999!5e0!3m2!1ses-419!2spe!4v1755149517211!5m2!1ses-419!2spe";

    return `${baseUrl}${zoomLevel}${endUrl}`;
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(18, zoom + 1);
    const newRadius = Math.round(5000 / Math.pow(2, newZoom - 14)); // Adjusted for starting zoom 14
    const clampedRadius = Math.max(200, Math.min(5000, newRadius)); // 200m to 5km range

    setZoom(newZoom);
    setMapUrl(getMapUrl(newZoom));
    updateRadius(clampedRadius);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(12, zoom - 1); // Min zoom 12 for 5km radius
    const newRadius = Math.round(5000 / Math.pow(2, newZoom - 14));
    const clampedRadius = Math.max(200, Math.min(5000, newRadius));

    setZoom(newZoom);
    setMapUrl(getMapUrl(newZoom));
    updateRadius(clampedRadius);
  };

  const getRadiusDisplay = (radiusMeters: number) => {
    if (radiusMeters >= 1000) {
      return `${(radiusMeters / 1000).toFixed(1)} km`;
    }
    return `${radiusMeters} m`;
  };

  // Initialize map URL on component mount
  if (!mapUrl) {
    setMapUrl(getMapUrl(zoom));
  }

  return (
    <div className="relative w-full h-48 lg:h-80 rounded-lg overflow-hidden">
      {/* Google Maps Embed */}
      <iframe
        src={mapUrl || "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d15544.873545863364!2d-76.4068570447244!3d-13.085341426263092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x910ff9495dbe053f%3A0x10f4c235753f7244!2sSan%20Vicente%20de%20Ca%C3%B1ete%2C%20Per%C3%BA!3m2!1d-13.076476699999999!2d-76.38488319999999!4m5!1s0x910ff9495dbe053f%3A0x10f4c235753f7244!2sSan%20Vicente%20de%20Ca%C3%B1ete%2C%20Per%C3%BA!3m2!1d-13.076476699999999!2d-76.38488319999999!5e0!3m2!1ses-419!2spe!4v1755149517211!5m2!1ses-419!2spe"}
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'contrast(1.1) saturate(0.8)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0"
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
        <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 rounded-2xl px-4 py-2 shadow-2xl pointer-events-none">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-white">San Vicente de Cañete</span>
          </div>
        </div>

        {/* Radius indicator */}
        <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 rounded-2xl px-4 py-2 shadow-2xl pointer-events-none">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span className="text-sm font-semibold text-white">Radio: {getRadiusDisplay(radius)}</span>
          </div>
        </div>

        {/* Zoom controls */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-1 pointer-events-auto">
          <Button
            size="icon"
            variant="ghost"
            className="w-12 h-12 bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 rounded-2xl text-white hover:bg-slate-800/90 hover:scale-110 shadow-2xl transition-all duration-300 group"
            onClick={handleZoomIn}
          >
            <Plus className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="w-12 h-12 bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 rounded-2xl text-white hover:bg-slate-800/90 hover:scale-110 shadow-2xl transition-all duration-300 group"
            onClick={handleZoomOut}
          >
            <Minus className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </Button>
        </div>

        {/* Mode indicator */}
        <div className="absolute top-3 right-3 bg-gradient-to-l from-black/70 to-black/50 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5 pointer-events-none">
          <div className="flex items-center space-x-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: (modeConfig[activeMode] || modeConfig.all).color }}
            />
            <span className="text-xs text-white font-bold">
              {filteredPeople.length} {(modeConfig[activeMode] || modeConfig.all).name.toLowerCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
