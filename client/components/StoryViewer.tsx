import { Button } from "@/components/ui/button";
import { X, Heart, MessageCircle, User } from "lucide-react";
import ProfilePhoto from "./ProfilePhoto";
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

export default function StoryViewer({ story, onClose, onLike, onChat, onViewProfile }: StoryViewerProps) {
  if (!story) return null;

  const [isTextExpanded, setIsTextExpanded] = useState(false);

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

        {/* Story text with enhanced styling */}
        <div className="absolute bottom-32 left-6 right-6">
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <p className="text-white text-xl font-semibold text-center leading-relaxed drop-shadow-lg">
              {story.story.replace(/[🔥💙🌟💼✈️💫💕🎉]/g, '')}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-12 left-6 right-6 flex justify-center space-x-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onLike}
            className="w-16 h-16 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 text-white hover:bg-slate-800/90 hover:scale-110 shadow-2xl transition-all duration-300"
          >
            <Heart className="h-7 w-7" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onChat}
            className="w-16 h-16 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 text-white hover:bg-slate-800/90 hover:scale-110 shadow-2xl transition-all duration-300"
          >
            <MessageCircle className="h-7 w-7" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onViewProfile}
            className="w-16 h-16 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 text-white hover:bg-slate-800/90 hover:scale-110 shadow-2xl transition-all duration-300"
          >
            <User className="h-7 w-7" />
          </Button>
        </div>
      </div>
    </div>
  );
}
