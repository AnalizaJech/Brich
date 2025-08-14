import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GoogleMapComponent from "@/components/GoogleMapComponent";
import StoriesSection from "@/components/StoriesSection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Heart, 
  MessageCircle, 
  Settings, 
  CreditCard,
  Users,
  Smartphone,
  Share2,
  Eye,
  Camera,
  Shield,
  Zap
} from "lucide-react";

interface PersonCard {
  id: number;
  name: string;
  age: number;
  distance: string;
  mode: 'blue' | 'amber' | 'red';
  story: string;
  online: boolean;
  verified: boolean;
}

export default function Index() {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState<'blue' | 'amber' | 'red'>('blue');
  const [credits, setCredits] = useState(15);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // For demo purposes
  const [searchRadius, setSearchRadius] = useState(5000); // in meters
  const [nearbyPeople, setNearbyPeople] = useState<PersonCard[]>([
    {
      id: 1,
      name: "Maria",
      age: 26,
      distance: "2.3 km",
      mode: "blue",
      story: "Buscando algo serio 💙",
      online: true,
      verified: true
    },
    {
      id: 2,
      name: "Carlos",
      age: 29,
      distance: "1.8 km",
      mode: "amber",
      story: "Aventuras y diversión 🌟",
      online: true,
      verified: false
    },
    {
      id: 3,
      name: "Sofia",
      age: 24,
      distance: "4.1 km",
      mode: "red",
      story: "Pasión y química 🔥",
      online: false,
      verified: true
    },
    {
      id: 4,
      name: "Miguel",
      age: 31,
      distance: "3.2 km",
      mode: "blue",
      story: "Profesional buscando estabilidad 💼",
      online: true,
      verified: true
    },
    {
      id: 5,
      name: "Lucia",
      age: 25,
      distance: "2.8 km",
      mode: "amber",
      story: "Viajera en busca de aventuras ✈️",
      online: false,
      verified: false
    },
    {
      id: 6,
      name: "Diego",
      age: 28,
      distance: "3.5 km",
      mode: "red",
      story: "Intensidad y conexión real 💫",
      online: true,
      verified: true
    },
    {
      id: 7,
      name: "Ana",
      age: 23,
      distance: "6.2 km",
      mode: "blue",
      story: "Relación seria y comprometida 💕",
      online: false,
      verified: true
    },
    {
      id: 8,
      name: "Roberto",
      age: 33,
      distance: "7.1 km",
      mode: "amber",
      story: "Divertirse y conocer gente nueva 🎉",
      online: true,
      verified: false
    }
  ]);

  const modeConfig = {
    blue: {
      gradient: "bg-brich-blue-gradient",
      color: "text-brich-blue-600",
      bg: "bg-brich-blue-50",
      border: "border-brich-blue-500",
      description: "Relaciones serias y duraderas"
    },
    amber: {
      gradient: "bg-brich-amber-gradient",
      color: "text-brich-amber-600",
      bg: "bg-brich-amber-50",
      border: "border-brich-amber-500",
      description: "Aventuras y experiencias divertidas"
    },
    red: {
      gradient: "bg-brich-red-gradient",
      color: "text-brich-red-600",
      bg: "bg-brich-red-50",
      border: "border-brich-red-500",
      description: "Conexiones intensas y apasionadas"
    }
  };

  // Filter people by mode and distance based on search radius
  const filteredPeople = nearbyPeople.filter(person => {
    const personDistanceMeters = parseFloat(person.distance.replace(' km', '')) * 1000;
    return person.mode === activeMode && personDistanceMeters <= searchRadius;
  });

  const handleRadiusChange = (newRadius: number) => {
    setSearchRadius(newRadius);
  };

  // Show auth prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brich-dark via-slate-900 to-brich-dark flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-brich-hero-gradient rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Bienvenido a Brich</h1>
          <p className="text-white/70 mb-8">La app de citas más segura y divertida del Perú</p>
          <div className="space-y-3">
            <Button
              onClick={() => navigate('/auth')}
              className="w-full bg-brich-blue-gradient text-white hover:opacity-90"
            >
              Iniciar Sesión
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/auth')}
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              Crear Cuenta
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brich-dark via-slate-900 to-brich-dark">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brich-hero-gradient rounded-xl flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Brich</h1>
              <p className="text-xs text-white/70">Encuentra tu conexión</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-white/10 rounded-full px-3 py-1">
              <CreditCard className="h-4 w-4 text-brich-amber-500" />
              <span className="text-sm font-medium text-white">{credits}</span>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stories Section (replaces old mode selector) */}
      <StoriesSection
        activeMode={activeMode}
        onModeChange={setActiveMode}
      />

      {/* Google Map Area */}
      <div className="max-w-md mx-auto px-4 mb-6">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 overflow-hidden">
          <CardContent className="p-0">
            <GoogleMapComponent
              activeMode={activeMode}
              onRadiusChange={handleRadiusChange}
            />
          </CardContent>
        </Card>
      </div>

      {/* Nearby People Stories */}
      <div className="max-w-md mx-auto px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Cerca de ti</h2>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              {filteredPeople.length} personas
            </Badge>
            <Badge variant="secondary" className="bg-brich-blue-500/20 text-brich-blue-300 border-brich-blue-500/30 text-xs">
              {searchRadius >= 1000 ? `${(searchRadius/1000).toFixed(1)}km` : `${searchRadius}m`}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-3">
          {filteredPeople.map((person) => (
            <Card key={person.id} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className={`w-12 h-12 ${modeConfig[person.mode].gradient} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-semibold text-lg">
                        {person.name.charAt(0)}
                      </span>
                    </div>
                    {person.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                    )}
                    {person.verified && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                        <Shield className="h-2 w-2 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-white">{person.name}</h3>
                      <span className="text-white/60 text-sm">{person.age}</span>
                    </div>
                    <p className="text-white/70 text-sm">{person.story}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <MapPin className="h-3 w-3 text-white/50" />
                      <span className="text-xs text-white/50">{person.distance}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      className={`${modeConfig[person.mode].gradient} text-white hover:opacity-90`}
                      onClick={() => setCredits(prev => Math.max(0, prev - 1))}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-md mx-auto px-4 pb-6">
        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-brich-amber-gradient text-white hover:opacity-90 h-12">
            <CreditCard className="h-5 w-5 mr-2" />
            Recargar Créditos
          </Button>
          <Button className="bg-brich-blue-gradient text-white hover:opacity-90 h-12">
            <Share2 className="h-5 w-5 mr-2" />
            Invitar Amigos
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/20">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="grid grid-cols-4 gap-1">
            <Button variant="ghost" className="flex flex-col items-center space-y-1 text-white hover:bg-white/10 h-auto py-2">
              <Heart className="h-5 w-5" />
              <span className="text-xs">Inicio</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 text-white/60 hover:bg-white/10 h-auto py-2"
              onClick={() => window.location.href = '/matches'}
            >
              <Users className="h-5 w-5" />
              <span className="text-xs">Matches</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 text-white/60 hover:bg-white/10 h-auto py-2"
              onClick={() => window.location.href = '/chats'}
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-xs">Chats</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 text-white/60 hover:bg-white/10 h-auto py-2"
              onClick={() => window.location.href = '/profile'}
            >
              <Settings className="h-5 w-5" />
              <span className="text-xs">Perfil</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Camera/Stories */}
      <div className="fixed bottom-20 right-4">
        <Button 
          size="icon" 
          className="w-14 h-14 bg-brich-hero-gradient rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-float"
        >
          <Camera className="h-6 w-6 text-white" />
        </Button>
      </div>

      {/* Authentication Prompt (if needed) */}
      {credits < 5 && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <Card className="bg-white backdrop-blur-lg border-white/20 shadow-2xl max-w-sm mx-4">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-brich-amber-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-brich-dark mb-2">Créditos bajos</h3>
              <p className="text-sm text-gray-600 mb-4">
                Recarga tus créditos para seguir conversando o invita amigos para ganar más.
              </p>
              <div className="space-y-2">
                <Button className="w-full bg-brich-amber-gradient text-white">
                  Recargar con Yape/Plin
                </Button>
                <Button variant="outline" className="w-full">
                  Invitar Amigos (+3 créditos)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
