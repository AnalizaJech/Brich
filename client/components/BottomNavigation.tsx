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
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-brich-dark via-brich-dark/98 to-brich-dark/95 backdrop-blur-2xl border-t border-white/15 z-40">
      <div className="max-w-md mx-auto px-4 py-3 pb-safe">
        <div className="grid grid-cols-4 gap-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Button
                key={item.path}
                variant="ghost"
                className={`relative flex flex-col items-center space-y-2 h-auto py-4 rounded-2xl transition-all duration-300 group ${
                  isActive 
                    ? "text-white hover:bg-white/10" 
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => navigate(item.path)}
              >
                <div className="relative">
                  <div className={`p-2 rounded-xl transition-colors ${
                    isActive 
                      ? `bg-gradient-to-br ${item.activeGradient} border ${item.activeBorder}` 
                      : "bg-white/5 group-hover:bg-white/10"
                  }`}>
                    <IconComponent className={`h-6 w-6 ${
                      isActive ? item.activeIconColor : ""
                    }`} />
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-white to-gray-200 rounded-full"></div>
                  )}
                  
                  {/* Notification dot for chats */}
                  {item.hasNotification && !isActive && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                
                <span className={`text-xs transition-all duration-300 ${
                  isActive ? "font-bold" : "font-medium"
                }`}>
                  {item.label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
