import { Button } from "@/components/ui/button";
import { X, Heart, MessageCircle } from "lucide-react";
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

export default function StoryViewer(props: StoryViewerProps) {
  const { story, onClose, onLike, onChat } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isChatting, setIsChatting] = useState(false);

  if (!story) {
    return null;
  }

  const handleClose = () => onClose();
  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike();
  };
  const handleChat = () => {
    setIsChatting(!isChatting);
    onChat();
  };

  const getPersonalityColor = (mode: string) => {
    switch (mode) {
      case 'blue': return 'text-blue-500';
      case 'amber': return 'text-amber-500';
      case 'red': return 'text-red-500';
      default: return 'text-blue-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="relative w-full h-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://picsum.photos/seed/${story.name}/800/1200)`,
          }}
        />

        {/* Gradient overlays for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />

        {/* Colored progress bars */}
        <div className="absolute top-4 left-4 right-4 flex space-x-1">
          <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div className={`h-full w-full rounded-full ${
              story.mode === 'blue' ? 'bg-blue-500' :
              story.mode === 'amber' ? 'bg-amber-500' :
              'bg-red-500'
            }`} />
          </div>
          <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div className={`h-full w-3/4 rounded-full ${
              story.mode === 'blue' ? 'bg-blue-500/60' :
              story.mode === 'amber' ? 'bg-amber-500/60' :
              'bg-red-500/60'
            }`} />
          </div>
          <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div className={`h-full w-1/2 rounded-full ${
              story.mode === 'blue' ? 'bg-blue-500/30' :
              story.mode === 'amber' ? 'bg-amber-500/30' :
              'bg-red-500/30'
            }`} />
          </div>
        </div>

        {/* User info header with ProfilePhoto */}
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
              <span className={`${getPersonalityColor(story.mode)} font-semibold text-sm`}>{story.age} años</span>
            </div>
            <span className="text-white/70 text-xs">{story.distance}</span>
          </div>
        </div>

        {/* Story text with better spacing */}
        <div className="absolute bottom-32 sm:bottom-36 left-4 sm:left-6 right-4 sm:right-6">
          <p className="text-white text-lg sm:text-xl font-semibold text-center leading-relaxed drop-shadow-2xl">
            {isExpanded ? story.story : story.story.substring(0, 100)}
            {story.story.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`ml-2 ${getPersonalityColor(story.mode)} hover:opacity-80 underline font-semibold transition-colors duration-200`}
              >
                {isExpanded ? "ver menos" : "ver más"}
              </button>
            )}
          </p>
        </div>

        <div className="absolute bottom-8 sm:bottom-12 left-6 right-6 flex justify-center items-center space-x-8">
          {/* Close Button */}
          <Button
            onClick={handleClose}
            className="w-14 h-14 rounded-full bg-black/50 hover:bg-black/70 border-2 border-white/50 hover:border-white/70 text-white hover:scale-110 transition-all duration-300 shadow-xl"
          >
            <X className="h-6 w-6 stroke-2" />
          </Button>

          {/* Chat Button - Center, filled like heart */}
          <Button
            onClick={handleChat}
            className={`w-16 h-16 rounded-full border-2 text-white hover:scale-110 transition-all duration-300 shadow-xl ${
              isChatting
                ? 'bg-white/20 border-white hover:bg-white/30'
                : story.mode === 'blue'
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-blue-400/50'
                  : story.mode === 'amber'
                  ? 'bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 border-amber-400/50'
                  : 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-red-400/50'
            }`}
          >
            <MessageCircle className="h-7 w-7 fill-current" />
          </Button>

          {/* Like Button */}
          <Button
            onClick={handleLike}
            className={`w-14 h-14 rounded-full border-2 text-white hover:scale-110 transition-all duration-300 shadow-xl ${
              isLiked
                ? 'bg-white/20 border-white hover:bg-white/30'
                : 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-red-400/50'
            }`}
          >
            <Heart className="h-6 w-6 fill-current" />
          </Button>
        </div>
      </div>
    </div>
  );
}
