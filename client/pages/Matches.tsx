import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProfilePhoto from "@/components/ProfilePhoto";
import BottomNavigation from "@/components/BottomNavigation";
import PageHeader from "@/components/PageHeader";
import {
  Heart,
  Users,
  MessageCircle,
  Flame,
  Star,
  Clock,
  MapPin,
  Sparkles,
  X,
  Check,
  CreditCard,
  Filter,
  Search,
} from "lucide-react";

interface Match {
  id: number;
  name: string;
  age: number;
  distance: string;
  mode: "blue" | "amber" | "red";
  gender: "male" | "female";
  story: string;
  online: boolean;
  verified: boolean;
  matchDate: string;
  compatibility: number;
  commonInterests: string[];
  lastMessage?: string;
  unreadMessages?: number;
}

export default function Matches() {
  const navigate = useNavigate();
  const [credits, setCredits] = useState(15);
  const [activeFilter, setActiveFilter] = useState<"all" | "blue" | "amber" | "red">("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [matches, setMatches] = useState<Match[]>([
    {
      id: 1,
      name: "Isabella",
      age: 24,
      distance: "1.2 km",
      mode: "blue",
      gender: "female",
      story: "Psicóloga buscando algo serio y duradero",
      online: true,
      verified: true,
      matchDate: "Hace 2 horas",
      compatibility: 95,
      commonInterests: ["Psicología", "Libros", "Café"],
      lastMessage: "¡Hola! Me encanta tu perfil 😊",
      unreadMessages: 2,
    },
    {
      id: 2,
      name: "Carlos",
      age: 29,
      distance: "1.8 km",
      mode: "amber",
      gender: "male",
      story: "Aventuras y diversión sin límites",
      online: true,
      verified: false,
      matchDate: "Ayer",
      compatibility: 88,
      commonInterests: ["Viajes", "Deportes", "Música"],
      lastMessage: "¿Te gusta hacer hiking?",
      unreadMessages: 0,
    },
    {
      id: 3,
      name: "Sofia",
      age: 24,
      distance: "4.1 km",
      mode: "red",
      gender: "female",
      story: "Pasión y química intensa",
      online: false,
      verified: true,
      matchDate: "Hace 1 día",
      compatibility: 92,
      commonInterests: ["Arte", "Danza", "Vino"],
      lastMessage: "Deberíamos conocernos pronto...",
      unreadMessages: 1,
    },
    {
      id: 4,
      name: "Miguel",
      age: 31,
      distance: "3.2 km",
      mode: "blue",
      gender: "male",
      story: "Profesional buscando estabilidad",
      online: true,
      verified: true,
      matchDate: "Hace 3 días",
      compatibility: 85,
      commonInterests: ["Negocios", "Tecnología", "Cocina"],
    },
    {
      id: 5,
      name: "Lucia",
      age: 25,
      distance: "2.8 km",
      mode: "amber",
      gender: "female",
      story: "Viajera en busca de aventuras",
      online: false,
      verified: false,
      matchDate: "Hace 1 semana",
      compatibility: 78,
      commonInterests: ["Fotografía", "Naturaleza", "Yoga"],
    },
    {
      id: 6,
      name: "Diego",
      age: 28,
      distance: "3.5 km",
      mode: "red",
      gender: "male",
      story: "Intensidad y conexión real",
      online: true,
      verified: true,
      matchDate: "Hace 1 semana",
      compatibility: 90,
      commonInterests: ["Fitness", "Cocina", "Cine"],
      lastMessage: "¿Cuándo nos vemos?",
      unreadMessages: 3,
    },
  ]);

  const modeConfig = {
    all: { color: "#9333EA", name: "Todos", icon: Users },
    blue: { color: "#3B82F6", name: "Serio", icon: Heart },
    amber: { color: "#F59E0B", name: "Aventura", icon: Sparkles },
    red: { color: "#EF4444", name: "Pasión", icon: Flame },
  };

  const filteredMatches = matches.filter((match) => {
    const modeMatch = activeFilter === "all" || match.mode === activeFilter;
    const searchMatch = searchQuery === "" || 
      match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.story.toLowerCase().includes(searchQuery.toLowerCase());
    return modeMatch && searchMatch;
  });

  const handleStartChat = (matchId: number) => {
    setCredits(prev => Math.max(0, prev - 1));
    navigate(`/chats?match=${matchId}`);
  };

  const handleUnmatch = (matchId: number) => {
    setMatches(prev => prev.filter(match => match.id !== matchId));
  };

  const totalUnreadMessages = matches.reduce((total, match) => total + (match.unreadMessages || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brich-dark via-slate-900 to-brich-dark">
      <PageHeader
        title="Matches"
        subtitle={`${filteredMatches.length} conexiones`}
        icon={<Heart className="h-6 w-6" />}
        iconColor="text-pink-500"
        credits={credits}
      />

      {/* Filters and Search */}
      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar matches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Mode Filters */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {(Object.keys(modeConfig) as Array<keyof typeof modeConfig>).map((mode) => {
            const IconComponent = modeConfig[mode].icon;
            const isActive = activeFilter === mode;

            return (
              <Button
                key={mode}
                onClick={() => setActiveFilter(mode)}
                variant="ghost"
                className={`flex-shrink-0 px-4 py-2 rounded-lg border transition-all duration-200 ${
                  isActive
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-slate-800/50 border-slate-700 text-gray-400 hover:bg-slate-700/50 hover:text-white"
                }`}
              >
                <IconComponent className={`h-4 w-4 mr-2 ${isActive ? modeConfig[mode].color.replace('text-', 'text-') : ''}`} />
                <span className="text-sm font-medium">{modeConfig[mode].name}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Matches List */}
      <div className="max-w-md mx-auto px-4 pb-32 space-y-4">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <Card
              key={match.id}
              className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 group overflow-hidden"
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  {/* Profile Photo */}
                  <div className="relative flex-shrink-0">
                    <ProfilePhoto
                      name={match.name}
                      gender={match.gender}
                      personalityType={match.mode}
                      size="lg"
                      className={`border-3 ${
                        match.mode === "blue"
                          ? "border-blue-500"
                          : match.mode === "amber"
                            ? "border-amber-500"
                            : "border-red-500"
                      }`}
                    />
                    {match.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                    {match.unreadMessages && match.unreadMessages > 0 && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{match.unreadMessages}</span>
                      </div>
                    )}
                  </div>

                  {/* Match Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-bold text-white text-lg">{match.name}</h3>
                      <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-xl px-2 py-1">
                        <span className="text-sm font-bold text-white">{match.age}</span>
                      </div>
                      {match.verified && (
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          <Check className="h-3 w-3 mr-1" />
                          Verificado
                        </Badge>
                      )}
                    </div>

                    {/* Compatibility */}
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm font-semibold text-yellow-400">{match.compatibility}%</span>
                        <span className="text-xs text-gray-400">compatibilidad</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400">{match.distance}</span>
                      </div>
                    </div>

                    {/* Story */}
                    <p className="text-white/80 text-sm mb-2 line-clamp-2">{match.story}</p>

                    {/* Last Message */}
                    {match.lastMessage && (
                      <div className="bg-slate-800/40 rounded-lg p-2 mb-2">
                        <p className="text-sm text-gray-300 italic">"{match.lastMessage}"</p>
                      </div>
                    )}

                    {/* Common Interests */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {match.commonInterests.slice(0, 3).map((interest, index) => (
                        <Badge
                          key={index}
                          className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs"
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>

                    {/* Match Date */}
                    <div className="flex items-center space-x-1 mb-3">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-400">Match {match.matchDate}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUnmatch(match.id)}
                    className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Deshacer
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleStartChat(match.id)}
                    className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chatear
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No hay matches</h3>
            <p className="text-gray-400 mb-4">
              {searchQuery ? "No se encontraron resultados" : "Aún no tienes matches con estos filtros"}
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Explorar personas
            </Button>
          </div>
        )}
      </div>

      <BottomNavigation totalUnreadMessages={totalUnreadMessages} />
    </div>
  );
}
