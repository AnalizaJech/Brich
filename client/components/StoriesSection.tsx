import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Flame, Plus, Users } from "lucide-react";
import ProfilePhoto from "./ProfilePhoto";
import StoryViewer from "./StoryViewer";

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
  activeMode: 'blue' | 'amber' | 'red' | 'all';
  onModeChange: (mode: 'blue' | 'amber' | 'red' | 'all') => void;
}

export default function StoriesSection({ activeMode, onModeChange }: StoriesSectionProps) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [stories, setStories] = useState<Story[]>([
    {
      id: 1,
      name: "Maria",
      mode: "blue",
      profileInitial: "M",
      story: "Buscando algo serio y duradero",
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
      story: "Aventuras y diversión sin límites",
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
      story: "Pasión y química intensa",
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
      story: "Profesional buscando estabilidad",
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
      story: "Viajera en busca de aventuras",
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
      story: "Intensidad y conexión real",
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
      description: "Relaciones duraderas",
      color: "#3B82F6"
    },
    amber: {
      gradient: "bg-gradient-to-br from-amber-500 to-orange-500",
      border: "border-amber-500",
      icon: Sparkles,
      name: "Aventura",
      description: "Experiencias divertidas",
      color: "#F59E0B"
    },
    red: {
      gradient: "bg-gradient-to-br from-red-500 to-pink-500",
      border: "border-red-500",
      icon: Flame,
      name: "Pasión",
      description: "Conexiones intensas",
      color: "#EF4444"
    },
    all: {
      gradient: "bg-gradient-to-br from-slate-600 to-slate-700",
      border: "border-slate-500",
      icon: Users,
      name: "Todos",
      description: "Ver todos los tipos",
      color: "#64748B"
    }
  };

  const filteredStories = activeMode === 'all'
    ? stories
    : stories.filter(story => story.mode === activeMode);

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
                        ? `border-2 shadow-lg`
                        : 'border-2 border-gray-600'
                      }
                    `}
                    style={isActive ? { borderColor: modeConfig[mode].color } : {}}
                    >
                      <div className="w-full h-full bg-brich-dark rounded-full flex items-center justify-center">
                        <IconComponent
                          className="h-6 w-6 transition-all duration-300"
                          style={{ color: isActive ? modeConfig[mode].color : '#9CA3AF' }}
                        />
                      </div>
                    </div>
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
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filteredStories.slice(0, 6).map((story) => (
            <Button
              key={story.id}
              variant="ghost"
              className="p-0 h-auto hover:bg-transparent group"
            >
              <div className="relative w-full">
                {/* Enhanced Story container */}
                <div className="aspect-[3/4] rounded-2xl overflow-hidden relative shadow-lg">
                  <div className={`
                    absolute inset-0 ${modeConfig[story.mode].gradient} opacity-90
                  `} />

                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />

                  {/* Profile picture at top */}
                  <div className="absolute top-4 left-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40">
                        <span className="text-white font-bold text-base">
                          {story.profileInitial}
                        </span>
                      </div>

                      {/* Online status */}
                      {story.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
                      )}
                    </div>
                  </div>

                  {/* Story viewed indicator */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/40 backdrop-blur rounded-full p-2">
                      <Eye className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  {/* Story text at bottom with better typography */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="text-left">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-white font-bold text-base">{story.name}</span>
                        <span className="text-white/90 text-sm font-medium">{story.age}</span>
                      </div>
                      <p className="text-white/95 text-sm leading-tight mb-2 overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {story.story}
                      </p>
                      <div className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-white/60 rounded-full" />
                        <span className="text-white/80 text-xs font-medium">
                          {story.distance}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* New story indicator - Instagram style */}
                  {story.hasNewStory && (
                    <div className="absolute top-2 left-2 right-2">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="h-0.5 bg-white/90 rounded-full" />
                        <div className="h-0.5 bg-white/60 rounded-full" />
                        <div className="h-0.5 bg-white/30 rounded-full" />
                      </div>
                    </div>
                  )}

                  {/* Enhanced hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                  {/* Scale effect on hover */}
                  <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105" />
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
