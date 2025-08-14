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

  if (!story) {
    return null;
  }

  const handleClose = () => onClose();
  const handleLike = () => onLike();
  const handleChat = () => onChat();

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
                className="ml-2 text-blue-400 underline"
              >
                {isExpanded ? "ver menos" : "ver más"}
              </button>
            )}
          </p>
        </div>

        <div className="absolute bottom-8 left-6 right-6 flex justify-center space-x-8">
          <Button
            onClick={handleClose}
            className="w-14 h-14 rounded-full bg-black/40 border-2 border-white/40 text-white"
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            onClick={handleLike}
            className="w-14 h-14 rounded-full bg-red-500 text-white"
          >
            <Heart className="h-6 w-6" />
          </Button>

          <Button
            onClick={handleChat}
            className="w-14 h-14 rounded-full bg-blue-500 text-white"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
