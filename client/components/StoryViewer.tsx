import { Button } from "@/components/ui/button";
import { X, Heart, MessageCircle, User } from "lucide-react";
import ProfilePhoto from "./ProfilePhoto";
import { useState, useEffect } from "react";

interface StoryViewerProps {
  story: {
    id: number;
    name: string;
    mode: 'blue' | 'amber' | 'red';
    profileInitial: string;
    story: string;
    isOnline: boolean;
    hasNewStory: boolean;
    age: number;
    distance: string;
  } | null;
  onClose: () => void;
  onLike: () => void;
  onChat: () => void;
  onViewProfile: () => void;
}

export default function StoryViewer({ story, onClose, onLike, onChat, onViewProfile }: StoryViewerProps) {
  if (!story) return null;

  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Simulate multiple stories for this person
  const totalStories = 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentStoryIndex < totalStories - 1) {
            setCurrentStoryIndex(prev => prev + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [currentStoryIndex, onClose]);

  const handleStoryBarClick = (index: number) => {
    setCurrentStoryIndex(index);
    setProgress(0);
  };

  const modeConfig = {
    blue: {
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
      name: "Serio",
      icon: Heart,
      color: "blue-500",
      buttonBg: "bg-blue-500/90",
      hoverBg: "hover:bg-blue-600"
    },
    amber: {
      gradient: "bg-gradient-to-br from-amber-500 to-orange-500",
      name: "Aventura",
      icon: Heart,
      color: "amber-500",
      buttonBg: "bg-amber-500/90",
      hoverBg: "hover:bg-amber-600"
    },
    red: {
      gradient: "bg-gradient-to-br from-red-500 to-pink-500",
      name: "Pasión",
      icon: Heart,
      color: "red-500",
      buttonBg: "bg-red-500/90",
      hoverBg: "hover:bg-red-600"
    }
  };

  // Clean story text and check if it needs truncation
  const cleanStoryText = story.story.replace(/[🔥💙🌟💼✈️💫💕🎉]/g, '');
  const shouldTruncate = cleanStoryText.length > 100;
  const displayText = shouldTruncate && !isTextExpanded
    ? cleanStoryText.substring(0, 100)
    : cleanStoryText;

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Story Container - Fullscreen */}
      <div className="relative w-full h-full">
        {/* Fullscreen Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://picsum.photos/seed/${story.name}-${story.mode}-story/800/1200)`,
          }}
        />

        {/* Gradient overlays for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />

        {/* Close button - removed, will be replaced by bottom X button */}

        {/* Interactive Story progress indicator */}
        <div className="absolute top-4 left-4 right-4 flex space-x-1">
          {Array.from({ length: totalStories }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleStoryBarClick(index)}
              className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer hover:h-1.5 transition-all duration-200"
            >
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  story.mode === 'blue' ? 'bg-blue-500' :
                  story.mode === 'amber' ? 'bg-amber-500' :
                  'bg-red-500'
                }`}
                style={{
                  width: index < currentStoryIndex ? '100%' :
                         index === currentStoryIndex ? `${progress}%` : '0%'
                }}
              />
            </button>
          ))}
        </div>

        {/* User info header */}
        <div className="absolute top-12 left-4 right-4 flex items-center space-x-3">
          <ProfilePhoto
            name={story.name}
            gender={story.name === 'Maria' || story.name === 'Sofia' || story.name === 'Lucia' || story.name === 'Ana' ? 'female' : 'male'}
            personalityType={story.mode}
            size="sm"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-white font-bold text-sm">{story.name}</span>
              <span className={`text-${modeConfig[story.mode].color} font-semibold text-sm`}>{story.age} años</span>
            </div>
            <span className="text-white/70 text-xs">{story.distance}</span>
          </div>
        </div>

        {/* Story text without background container - Responsive */}
        <div className="absolute bottom-24 sm:bottom-32 left-4 sm:left-6 right-4 sm:right-6">
          <p className="text-white text-lg sm:text-xl font-semibold text-center leading-relaxed drop-shadow-2xl">
            {displayText}
            {shouldTruncate && !isTextExpanded && (
              <button
                onClick={() => setIsTextExpanded(true)}
                className={`ml-2 text-${modeConfig[story.mode].color} hover:text-${modeConfig[story.mode].color}/80 font-bold underline transition-colors duration-200`}
              >
                ver más...
              </button>
            )}
            {shouldTruncate && isTextExpanded && (
              <button
                onClick={() => setIsTextExpanded(false)}
                className={`ml-2 text-${modeConfig[story.mode].color} hover:text-${modeConfig[story.mode].color}/80 font-bold underline transition-colors duration-200`}
              >
                ver menos
              </button>
            )}
          </p>
        </div>

        {/* Action buttons - Redesigned with ideal colors, X button first */}
        <div className="absolute bottom-8 sm:bottom-12 left-6 right-6 flex justify-center space-x-6 sm:space-x-8">
          {/* Close Button - First position */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-2xl border border-white/30 text-white hover:scale-110 shadow-2xl transition-all duration-300 hover:rotate-90"
          >
            <X className="h-7 w-7 sm:h-8 sm:w-8" />
          </Button>

          {/* Like Button - Personality color */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onLike}
            className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-${modeConfig[story.mode].color} to-${modeConfig[story.mode].color}/80 hover:from-${modeConfig[story.mode].color}/90 hover:to-${modeConfig[story.mode].color}/70 backdrop-blur-2xl border border-white/30 text-white hover:scale-110 shadow-2xl transition-all duration-300`}
          >
            <Heart className="h-7 w-7 sm:h-8 sm:w-8 fill-current" />
          </Button>

          {/* Chat Button - Premium purple gradient */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onChat}
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 backdrop-blur-2xl border border-white/30 text-white hover:scale-110 shadow-2xl transition-all duration-300"
          >
            <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" />
          </Button>
        </div>
      </div>
    </div>
  );
}
