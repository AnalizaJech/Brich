import { Button } from "@/components/ui/button";
import { X, Heart, MessageCircle } from "lucide-react";
import { useState } from "react";

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

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute top-4 left-4 right-4 h-1 bg-white/30 rounded-full">
          <div className="h-full w-full bg-white rounded-full" />
        </div>

        <div className="absolute top-12 left-4 right-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              <div className="text-white font-bold">{story.name}</div>
              <div className="text-white/70 text-sm">{story.age} años</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-24 left-4 right-4">
          <p className="text-white text-center">
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

        <div className="absolute bottom-8 left-6 right-6 flex justify-center items-center space-x-6">
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
