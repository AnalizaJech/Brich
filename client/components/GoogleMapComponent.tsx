import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Locate, Minus, Plus, Navigation } from "lucide-react";

interface PersonPin {
  id: number;
  name: string;
  x: number; // percentage position
  y: number; // percentage position
  mode: "blue" | "amber" | "red";
  distance: number;
  profileImage?: string;
}

interface GoogleMapComponentProps {
  activeMode: "blue" | "amber" | "red";
  onRadiusChange: (radius: number) => void;
}

export default function GoogleMapComponent({
  activeMode,
  onRadiusChange,
}: GoogleMapComponentProps) {
  const [radius, setRadius] = useState(5000);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPinchDistance, setLastPinchDistance] = useState(0);
  const [selectedPerson, setSelectedPerson] = useState<PersonPin | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Sample people positioned around San Vicente de Cañete (simulated coordinates)
  const nearbyPeople: PersonPin[] = [
    {
      id: 1,
      name: "Maria",
      x: 45,
      y: 35,
      mode: "blue",
      distance: 2300,
      profileImage: "M",
    },
    {
      id: 2,
      name: "Carlos",
      x: 65,
      y: 55,
      mode: "amber",
      distance: 1800,
      profileImage: "C",
    },
    {
      id: 3,
      name: "Sofia",
      x: 25,
      y: 65,
      mode: "red",
      distance: 4100,
      profileImage: "S",
    },
    {
      id: 4,
      name: "Miguel",
      x: 55,
      y: 25,
      mode: "blue",
      distance: 3200,
      profileImage: "M",
    },
    {
      id: 5,
      name: "Lucia",
      x: 75,
      y: 40,
      mode: "amber",
      distance: 2800,
      profileImage: "L",
    },
    {
      id: 6,
      name: "Diego",
      x: 35,
      y: 75,
      mode: "red",
      distance: 3500,
      profileImage: "D",
    },
  ];

  const modeConfig = {
    blue: { color: "#3B82F6", name: "Serio" },
    amber: { color: "#F59E0B", name: "Aventura" },
    red: { color: "#EF4444", name: "Pasión" },
  };

  const filteredPeople = nearbyPeople.filter(
    (person) => person.mode === activeMode && person.distance <= radius,
  );

  // Calculate distance between two touch points
  const getTouchDistance = (touches: TouchList) => {
    if (touches.length < 2) return 0;
    const touch1 = touches[0];
    const touch2 = touches[1];
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Handle touch start for pinch detection
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches);
      setLastPinchDistance(distance);
      setIsDragging(true);
    }
  };

  // Handle touch move for pinch-to-zoom
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();

    if (e.touches.length === 2 && isDragging) {
      const currentDistance = getTouchDistance(e.touches);

      if (lastPinchDistance > 0) {
        const pinchDelta = currentDistance - lastPinchDistance;
        const zoomSensitivity = 0.005;
        const newZoom = Math.max(
          0.5,
          Math.min(3, zoom + pinchDelta * zoomSensitivity),
        );

        // Calculate new radius based on zoom level (inverse relationship)
        const baseRadius = 5000; // 5km base
        const newRadius = Math.round(baseRadius / newZoom);
        const clampedRadius = Math.max(500, Math.min(20000, newRadius));

        setZoom(newZoom);
        updateRadius(clampedRadius);
      }

      setLastPinchDistance(currentDistance);
    }
  };

  // Handle touch end
  const handleTouchEnd = () => {
    setIsDragging(false);
    setLastPinchDistance(0);
  };

  const updateRadius = (newRadius: number) => {
    setRadius(newRadius);
    onRadiusChange(newRadius);
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(3, zoom * 1.2);
    const newRadius = Math.round(5000 / newZoom);
    const clampedRadius = Math.max(500, Math.min(20000, newRadius));

    setZoom(newZoom);
    updateRadius(clampedRadius);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(0.5, zoom / 1.2);
    const newRadius = Math.round(5000 / newZoom);
    const clampedRadius = Math.max(500, Math.min(20000, newRadius));

    setZoom(newZoom);
    updateRadius(clampedRadius);
  };

  const getRadiusDisplay = (radiusMeters: number) => {
    if (radiusMeters >= 1000) {
      return `${(radiusMeters / 1000).toFixed(1)} km`;
    }
    return `${radiusMeters} m`;
  };

  const circleSize = 120 * zoom;

  return (
    <div className="relative h-48 rounded-lg overflow-hidden">
      {/* Simulated map background with San Vicente de Cañete style */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 to-yellow-900/30">
        {/* Streets pattern */}
        <svg className="w-full h-full opacity-30" viewBox="0 0 200 120">
          {/* Main streets of San Vicente de Cañete */}
          <line
            x1="0"
            y1="40"
            x2="200"
            y2="40"
            stroke="#ffffff"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="80"
            x2="200"
            y2="80"
            stroke="#ffffff"
            strokeWidth="1"
          />
          <line
            x1="50"
            y1="0"
            x2="50"
            y2="120"
            stroke="#ffffff"
            strokeWidth="1"
          />
          <line
            x1="100"
            y1="0"
            x2="100"
            y2="120"
            stroke="#ffffff"
            strokeWidth="1"
          />
          <line
            x1="150"
            y1="0"
            x2="150"
            y2="120"
            stroke="#ffffff"
            strokeWidth="1"
          />

          {/* Plaza and important locations */}
          <rect
            x="90"
            y="35"
            width="20"
            height="10"
            fill="#ffffff"
            fillOpacity="0.2"
          />
          <circle cx="100" cy="40" r="3" fill="#ffffff" fillOpacity="0.3" />

          {/* Diagonal streets */}
          <line
            x1="0"
            y1="0"
            x2="80"
            y2="60"
            stroke="#ffffff"
            strokeWidth="0.5"
          />
          <line
            x1="120"
            y1="60"
            x2="200"
            y2="120"
            stroke="#ffffff"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Interactive map area */}
      <div
        ref={mapRef}
        className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: "none" }}
      >
        {/* Search radius circle */}
        <div
          className="absolute border-2 border-white/40 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
            borderColor: modeConfig[activeMode].color + "66",
          }}
        >
          {/* User location (center) */}
          <div className="relative">
            <div
              className="w-4 h-4 rounded-full shadow-lg"
              style={{ backgroundColor: modeConfig[activeMode].color }}
            />
            <div className="absolute -top-1 -left-1 w-6 h-6 border-2 border-white rounded-full animate-ping" />
          </div>

          {/* Nearby people pins within radius */}
          {filteredPeople.map((pin) => (
            <div
              key={pin.id}
              className="absolute w-8 h-8 rounded-full shadow-sm transition-all duration-300 hover:scale-110 cursor-pointer"
              style={{
                left: `${(pin.x - 50) * (circleSize / 120)}px`,
                top: `${(pin.y - 50) * (circleSize / 120)}px`,
                transform: "translate(-50%, -50%)",
                backgroundColor: modeConfig[pin.mode].color,
              }}
              onClick={() => setSelectedPerson(pin)}
            >
              <div className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                {pin.profileImage}
              </div>
            </div>
          ))}
        </div>
      </div>

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
          <span className="text-xs font-medium">
            Radio: {getRadiusDisplay(radius)}
          </span>
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
            {filteredPeople.length} {modeConfig[activeMode].name.toLowerCase()}
          </span>
        </div>
      </div>

      {/* Person info popup */}
      {selectedPerson && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="bg-white rounded-lg p-4 mx-4 max-w-xs">
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2"
                style={{
                  backgroundColor: modeConfig[selectedPerson.mode].color,
                }}
              >
                {selectedPerson.profileImage}
              </div>
              <h3 className="font-bold text-gray-900">{selectedPerson.name}</h3>
              <p className="text-sm text-gray-600">
                {(selectedPerson.distance / 1000).toFixed(1)} km de distancia
              </p>
              <Button
                className="mt-3 w-full"
                onClick={() => setSelectedPerson(null)}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Touch gesture hint */}
      {zoom === 1 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/60 rounded-lg px-3 py-2 animate-pulse">
            <p className="text-xs text-white text-center">
              Pellizca para hacer zoom
              <br />
              <span className="text-white/70">y ajustar el radio</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
