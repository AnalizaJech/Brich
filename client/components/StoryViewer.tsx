import { Button } from "@/components/ui/button";
import { X, Heart, MessageCircle, User } from "lucide-react";
import ProfilePhoto from "./ProfilePhoto";

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

  const modeConfig = {
    blue: {
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
      name: "Serio",
      icon: Heart
    },
    amber: {
      gradient: "bg-gradient-to-br from-amber-500 to-orange-500",
      name: "Aventura",
      icon: Heart
    },
    red: {
      gradient: "bg-gradient-to-br from-red-500 to-pink-500",
      name: "Pasión",
      icon: Heart
    }
  };

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

        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Story progress indicator */}
        <div className="absolute top-4 left-4 right-16 flex space-x-1">
          <div className="flex-1 h-1 bg-white/90 rounded-full" />
          <div className="flex-1 h-1 bg-white/40 rounded-full" />
          <div className="flex-1 h-1 bg-white/40 rounded-full" />
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
              <span className="text-white/80 text-xs">{story.age}</span>
            </div>
            <span className="text-white/70 text-xs">{story.distance}</span>
          </div>
          {story.isOnline && (
            <div className="w-2 h-2 bg-green-400 rounded-full" />
          )}
        </div>

        {/* Story text */}
        <div className="absolute bottom-24 left-4 right-4">
          <p className="text-white text-lg font-medium text-center leading-relaxed">
            {story.story.replace(/[🔥💙🌟💼✈️💫💕🎉]/g, '')}
          </p>
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-6 left-4 right-4 flex justify-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onLike}
            className="w-14 h-14 rounded-full bg-white/20 backdrop-blur text-white hover:bg-white/30 transition-all duration-200"
          >
            <Heart className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onChat}
            className="w-14 h-14 rounded-full bg-white/20 backdrop-blur text-white hover:bg-white/30 transition-all duration-200"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onViewProfile}
            className="w-14 h-14 rounded-full bg-white/20 backdrop-blur text-white hover:bg-white/30 transition-all duration-200"
          >
            <User className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
