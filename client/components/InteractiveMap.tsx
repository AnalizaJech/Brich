import { useState, useRef, useEffect } from "react";
import { MapPin, Locate, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapPin {
  id: number;
  x: number;
  y: number;
  mode: "blue" | "amber" | "red";
  distance: number;
}

interface InteractiveMapProps {
  activeMode: "blue" | "amber" | "red";
  onRadiusChange: (radius: number) => void;
}

export default function InteractiveMap({
  activeMode,
  onRadiusChange,
}: InteractiveMapProps) {
  const [radius, setRadius] = useState(5000); // radius in meters
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPinchDistance, setLastPinchDistance] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);

  // San Vicente de Cañete coordinates simulation
  const centerCoords = { lat: -13.0751, lng: -76.3856 };

  // Sample nearby people pins around San Vicente de Cañete
  const [mapPins] = useState<MapPin[]>([
    { id: 1, x: 65, y: 35, mode: "blue", distance: 2300 },
    { id: 2, x: 25, y: 70, mode: "amber", distance: 1800 },
    { id: 3, x: 80, y: 65, mode: "red", distance: 4100 },
    { id: 4, x: 45, y: 25, mode: "blue", distance: 3200 },
    { id: 5, x: 75, y: 40, mode: "amber", distance: 2800 },
    { id: 6, x: 30, y: 55, mode: "red", distance: 3500 },
  ]);

  const filteredPins = mapPins.filter(
    (pin) => pin.mode === activeMode && pin.distance <= radius,
  );

  const modeConfig = {
    blue: "bg-brich-blue-gradient",
    amber: "bg-brich-amber-gradient",
    red: "bg-brich-red-gradient",
  };

  // Convert radius to display format
  const getRadiusDisplay = (radiusMeters: number) => {
    if (radiusMeters >= 1000) {
      return `${(radiusMeters / 1000).toFixed(1)} km`;
    }
    return `${radiusMeters} m`;
  };

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
        const clampedRadius = Math.max(500, Math.min(20000, newRadius)); // 500m to 20km

        setZoom(newZoom);
        setRadius(clampedRadius);
        onRadiusChange(clampedRadius);
      }

      setLastPinchDistance(currentDistance);
    }
  };

  // Handle touch end
  const handleTouchEnd = () => {
    setIsDragging(false);
    setLastPinchDistance(0);
  };

  // Zoom buttons for desktop/accessibility
  const handleZoomIn = () => {
    const newZoom = Math.min(3, zoom * 1.2);
    const newRadius = Math.round(5000 / newZoom);
    const clampedRadius = Math.max(500, Math.min(20000, newRadius));

    setZoom(newZoom);
    setRadius(clampedRadius);
    onRadiusChange(clampedRadius);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(0.5, zoom / 1.2);
    const newRadius = Math.round(5000 / newZoom);
    const clampedRadius = Math.max(500, Math.min(20000, newRadius));

    setZoom(newZoom);
    setRadius(clampedRadius);
    onRadiusChange(clampedRadius);
  };

  // Calculate circle size based on zoom level
  const circleSize = 120 * zoom;

  return (
    <div className="relative h-48 bg-gradient-to-br from-brich-blue-900/20 to-brich-red-900/20 rounded-lg overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0iIzMzMzMzMyIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-30" />

      {/* Street pattern overlay */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-20" viewBox="0 0 200 120">
          {/* Simulated streets of San Vicente de Cañete */}
          <line
            x1="0"
            y1="40"
            x2="200"
            y2="40"
            stroke="white"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="80"
            x2="200"
            y2="80"
            stroke="white"
            strokeWidth="1"
          />
          <line
            x1="50"
            y1="0"
            x2="50"
            y2="120"
            stroke="white"
            strokeWidth="1"
          />
          <line
            x1="100"
            y1="0"
            x2="100"
            y2="120"
            stroke="white"
            strokeWidth="1"
          />
          <line
            x1="150"
            y1="0"
            x2="150"
            y2="120"
            stroke="white"
            strokeWidth="1"
          />

          {/* Diagonal streets */}
          <line
            x1="0"
            y1="0"
            x2="80"
            y2="60"
            stroke="white"
            strokeWidth="0.5"
          />
          <line
            x1="120"
            y1="60"
            x2="200"
            y2="120"
            stroke="white"
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
          }}
        >
          {/* User location (center) */}
          <div className="relative">
            <div
              className={`w-4 h-4 ${modeConfig[activeMode]} rounded-full shadow-lg`}
            />
            <div className="absolute -top-1 -left-1 w-6 h-6 border-2 border-white rounded-full animate-ping" />
          </div>

          {/* Nearby people pins within radius */}
          {filteredPins.map((pin) => (
            <div
              key={pin.id}
              className="absolute w-3 h-3 rounded-full shadow-sm transition-all duration-300 hover:scale-110"
              style={{
                left: `${(pin.x - 50) * (circleSize / 120)}px`,
                top: `${(pin.y - 50) * (circleSize / 120)}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className={`w-full h-full ${modeConfig[pin.mode]} rounded-full`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Location info */}
      <div className="absolute top-3 left-3 bg-black/50 rounded-lg px-3 py-1">
        <div className="flex items-center space-x-2 text-white">
          <MapPin className="h-3 w-3" />
          <span className="text-xs font-medium">San Vicente de Cañete</span>
        </div>
      </div>

      {/* Radius indicator */}
      <div className="absolute bottom-3 left-3 bg-black/50 rounded-lg px-3 py-1">
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
          className="w-8 h-8 bg-black/50 text-white hover:bg-black/70"
          onClick={handleZoomIn}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="w-8 h-8 bg-black/50 text-white hover:bg-black/70"
          onClick={handleZoomOut}
        >
          <Minus className="h-4 w-4" />
        </Button>
      </div>

      {/* Zoom indicator */}
      <div className="absolute top-3 right-3 bg-black/50 rounded-lg px-2 py-1">
        <span className="text-xs text-white">{filteredPins.length} cerca</span>
      </div>

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
