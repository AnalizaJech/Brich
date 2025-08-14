import { Button } from "@/components/ui/button";
import { X, Heart, MessageCircle, User } from "lucide-react";
import ProfilePhoto from "./ProfilePhoto";
import { useState, useEffect, useCallback, useMemo } from "react";

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

  // Stable callback to avoid useEffect dependency issues
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Reset state when story changes
  useEffect(() => {
    setCurrentStoryIndex(0);
    setProgress(0);
    setIsTextExpanded(false);
  }, [story?.id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentStoryIndex < totalStories - 1) {
            setCurrentStoryIndex(prev => prev + 1);
            return 0;
          } else {
            handleClose();
            return 100;
          }
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [currentStoryIndex, handleClose]);

  const handleStoryBarClick = useCallback((index: number) => {
    setCurrentStoryIndex(index);
    setProgress(0);
  }, []);

  // Memoize config to prevent re-renders
  const modeConfig = useMemo(() => ({
    blue: {
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
      name: "Serio",
      icon: Heart,
      color: "blue-500",
      textColor: "text-blue-500",
      bgColor: "bg-blue-500",
      chatButtonClass: "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-blue-400/50 hover:border-blue-300"
    },
    amber: {
      gradient: "bg-gradient-to-br from-amber-500 to-orange-500",
      name: "Aventura",
      icon: Heart,
      color: "amber-500",
      textColor: "text-amber-500",
      bgColor: "bg-amber-500",
      chatButtonClass: "bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 border-amber-400/50 hover:border-amber-300"
    },
    red: {
      gradient: "bg-gradient-to-br from-red-500 to-pink-500",
      name: "Pasión",
      icon: Heart,
      color: "red-500",
      textColor: "text-red-500",
      bgColor: "bg-red-500",
      chatButtonClass: "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-red-400/50 hover:border-red-300"
    }
  }), []);

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
          {Array.from({ length: totalStories }, (_, index) => {
            const progressWidth = index < currentStoryIndex ? '100%' :
                                 index === currentStoryIndex ? `${progress}%` : '0%';
            return (
              <button
                key={`story-${story.id}-${index}`}
                onClick={() => handleStoryBarClick(index)}
                className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer hover:h-1.5 transition-all duration-200"
              >
                <div
                  className={`h-full rounded-full transition-all duration-300 ${modeConfig[story.mode].bgColor}`}
                  style={{ width: progressWidth }}
                />
              </button>
            );
          })}
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
              <span className={`${modeConfig[story.mode].textColor} font-semibold text-sm`}>{story.age} años</span>
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
                className={`ml-2 ${modeConfig[story.mode].textColor} hover:opacity-80 font-bold underline transition-colors duration-200`}
              >
                ver más...
              </button>
            )}
            {shouldTruncate && isTextExpanded && (
              <button
                onClick={() => setIsTextExpanded(false)}
                className={`ml-2 ${modeConfig[story.mode].textColor} hover:opacity-80 font-bold underline transition-colors duration-200`}
              >
                ver menos
              </button>
            )}
          </p>
        </div>

        {/* Redesigned Action buttons */}
        <div className="absolute bottom-8 sm:bottom-12 left-6 right-6 flex justify-center space-x-8">
          {/* Close Button - Minimalist design */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border-2 border-white/40 hover:border-white/60 text-white hover:scale-105 shadow-xl transition-all duration-300"
          >
            <X className="h-6 w-6 sm:h-7 sm:w-7 stroke-2" />
          </Button>

          {/* Like Button - Always red for heart */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onLike}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 backdrop-blur-xl border-2 border-red-400/50 hover:border-red-300 text-white hover:scale-105 shadow-xl transition-all duration-300"
          >
            <Heart className="h-6 w-6 sm:h-7 sm:w-7 fill-current" />
          </Button>

          {/* Chat Button - Uses personality color */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onChat}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full backdrop-blur-xl border-2 text-white hover:scale-105 shadow-xl transition-all duration-300 ${modeConfig[story.mode].chatButtonClass}`}
          >
            <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
          </Button>
        </div>
      </div>
    </div>
  );
}
