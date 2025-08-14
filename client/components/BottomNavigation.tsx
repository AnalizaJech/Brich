import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  Users,
  MessageCircle,
  Settings,
  Heart,
} from "lucide-react";

interface BottomNavigationProps {
  totalUnreadMessages?: number;
}

export default function BottomNavigation({ totalUnreadMessages = 0 }: BottomNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      icon: Home,
      label: "Inicio",
      activeColor: "text-blue-500",
    },
    {
      path: "/matches",
      icon: Users,
      label: "Matches",
      activeColor: "text-pink-500",
    },
    {
      path: "/chats",
      icon: MessageCircle,
      label: "Chats",
      activeColor: "text-blue-500",
      hasNotification: totalUnreadMessages > 0,
    },
    {
      path: "/profile",
      icon: Settings,
      label: "Perfil",
      activeColor: "text-purple-500",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/50 z-40">
      <div className="max-w-md mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Button
                key={item.path}
                variant="ghost"
                className={`relative flex flex-col items-center space-y-1 h-auto py-2 px-4 transition-all duration-200 ${
                  isActive ? "" : "hover:bg-white/5"
                }`}
                onClick={() => navigate(item.path)}
              >
                <div className="relative">
                  <IconComponent className={`h-6 w-6 transition-colors duration-200 ${
                    isActive ? item.activeColor : "text-gray-400"
                  }`} />

                  {/* Notification dot for chats */}
                  {item.hasNotification && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </div>

                <span className={`text-xs transition-colors duration-200 ${
                  isActive ? `${item.activeColor} font-medium` : "text-gray-400 font-normal"
                }`}>
                  {item.label}
                </span>

                {/* Simple active indicator */}
                {isActive && (
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${item.activeColor.replace('text-', 'bg-')}`}></div>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
