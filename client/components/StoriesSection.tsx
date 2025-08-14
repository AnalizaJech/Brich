import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Flame, Plus, Eye } from "lucide-react";

interface Story {
  id: number;
  name: string;
  mode: 'blue' | 'amber' | 'red';
  profileInitial: string;
  story: string;
  isOnline: boolean;
  hasNewStory: boolean;
  age: number;
  distance: string;
}

interface StoriesSectionProps {
  activeMode: 'blue' | 'amber' | 'red';
  onModeChange: (mode: 'blue' | 'amber' | 'red') => void;
}

export default function StoriesSection({ activeMode, onModeChange }: StoriesSectionProps) {
  const [stories, setStories] = useState<Story[]>([
    {
      id: 1,
      name: "Maria",
      mode: "blue",
      profileInitial: "M",
      story: "Buscando algo serio 💙",
      isOnline: true,
      hasNewStory: true,
      age: 26,
      distance: "2.3 km"
    },
    {
      id: 2,
      name: "Carlos",
      mode: "amber",
      profileInitial: "C", 
      story: "Aventuras y diversión 🌟",
      isOnline: true,
      hasNewStory: true,
      age: 29,
      distance: "1.8 km"
    },
    {
      id: 3,
      name: "Sofia",
      mode: "red",
      profileInitial: "S",
      story: "Pasión y química 🔥",
      isOnline: false,
      hasNewStory: false,
      age: 24,
      distance: "4.1 km"
    },
    {
      id: 4,
      name: "Miguel",
      mode: "blue",
      profileInitial: "Mi",
      story: "Profesional buscando estabilidad 💼",
      isOnline: true,
      hasNewStory: true,
      age: 31,
      distance: "3.2 km"
    },
    {
      id: 5,
      name: "Lucia",
      mode: "amber",
      profileInitial: "L",
      story: "Viajera en busca de aventuras ✈️",
      isOnline: false,
      hasNewStory: false,
      age: 25,
      distance: "2.8 km"
    },
    {
      id: 6,
      name: "Diego",
      mode: "red",
      profileInitial: "D",
      story: "Intensidad y conexión real 💫",
      isOnline: true,
      hasNewStory: true,
      age: 28,
      distance: "3.5 km"
    }
  ]);

  const modeConfig = {
    blue: {
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
      border: "border-blue-500",
      icon: Heart,
      name: "Serio",
      description: "Relaciones duraderas"
    },
    amber: {
      gradient: "bg-gradient-to-br from-amber-500 to-orange-500",
      border: "border-amber-500",
      icon: Sparkles,
      name: "Aventura",
      description: "Experiencias divertidas"
    },
    red: {
      gradient: "bg-gradient-to-br from-red-500 to-pink-500",
      border: "border-red-500",
      icon: Flame,
      name: "Pasión",
      description: "Conexiones intensas"
    }
  };

  const filteredStories = stories.filter(story => story.mode === activeMode);

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Mode Selector as Stories */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1">¿Qué buscas hoy?</h2>
        <p className="text-sm text-white/60 mb-4">Descubre personas compatibles contigo</p>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {(Object.keys(modeConfig) as Array<keyof typeof modeConfig>).map((mode) => {
            const IconComponent = modeConfig[mode].icon;
            const isActive = activeMode === mode;
            
            return (
              <Button
                key={mode}
                onClick={() => onModeChange(mode)}
                variant="ghost"
                className="flex-shrink-0 p-0 h-auto hover:bg-transparent"
              >
                <div className="flex flex-col items-center space-y-2">
                  {/* Story-style profile picture */}
                  <div className="relative">
                    <div className={`
                      w-16 h-16 rounded-full p-1 transition-all duration-300
                      ${isActive 
                        ? `bg-gradient-to-br ${modeConfig[mode].gradient.replace('bg-gradient-to-br', '')} shadow-lg` 
                        : 'bg-gray-600'
                      }
                    `}>
                      <div className="w-full h-full bg-brich-dark rounded-full flex items-center justify-center">
                        <IconComponent className={`
                          h-6 w-6 transition-all duration-300
                          ${isActive ? 'text-white' : 'text-gray-400'}
                        `} />
                      </div>
                    </div>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-brich-dark rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <span className={`
                      text-sm font-medium transition-colors duration-300
                      ${isActive ? 'text-white' : 'text-gray-400'}
                    `}>
                      {modeConfig[mode].name}
                    </span>
                  </div>
                </div>
              </Button>
            );
          })}
          
          {/* Add Story Button */}
          <Button
            variant="ghost"
            className="flex-shrink-0 p-0 h-auto hover:bg-transparent"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 border-2 border-dashed border-gray-600 rounded-full flex items-center justify-center">
                <Plus className="h-6 w-6 text-gray-400" />
              </div>
              <span className="text-sm text-gray-400">Tu historia</span>
            </div>
          </Button>
        </div>
        
        <p className="text-sm text-white/60 mt-3 text-center">
          {modeConfig[activeMode].description}
        </p>
      </div>

      {/* Stories Grid */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-md font-semibold text-white">Historias recientes</h3>
          <span className="text-sm text-white/60">{filteredStories.length} personas</span>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {filteredStories.slice(0, 6).map((story) => (
            <Button
              key={story.id}
              variant="ghost"
              className="p-0 h-auto hover:bg-transparent group"
            >
              <div className="relative w-full">
                {/* Story container with gradient overlay */}
                <div className="aspect-[3/4] rounded-xl overflow-hidden relative">
                  <div className={`
                    absolute inset-0 ${modeConfig[story.mode].gradient} opacity-80
                  `} />
                  
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0iIzMzMzMzMyIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-30" />
                  
                  {/* Profile picture at top */}
                  <div className="absolute top-3 left-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/30">
                        <span className="text-white font-semibold text-sm">
                          {story.profileInitial}
                        </span>
                      </div>
                      
                      {/* Online status */}
                      {story.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border border-white rounded-full" />
                      )}
                    </div>
                  </div>

                  {/* View indicator */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-black/30 backdrop-blur rounded-full p-1">
                      <Eye className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  
                  {/* Story text at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="text-left">
                      <div className="flex items-center space-x-1 mb-1">
                        <span className="text-white font-semibold text-sm">{story.name}</span>
                        <span className="text-white/80 text-xs">{story.age}</span>
                      </div>
                      <p className="text-white/90 text-xs leading-tight overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {story.story}
                      </p>
                      <p className="text-white/70 text-xs mt-1">
                        {story.distance}
                      </p>
                    </div>
                  </div>

                  {/* New story indicator */}
                  {story.hasNewStory && (
                    <div className="absolute top-1 left-1 right-1">
                      <div className="h-1 bg-white/80 rounded-full" />
                    </div>
                  )}

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </div>
            </Button>
          ))}
        </div>
        
        {/* View all button */}
        {filteredStories.length > 6 && (
          <Button
            variant="ghost"
            className="w-full mt-3 text-white/70 hover:text-white hover:bg-white/10"
          >
            Ver todas las historias ({filteredStories.length - 6} más)
          </Button>
        )}
      </div>
    </div>
  );
}
