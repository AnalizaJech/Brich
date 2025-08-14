import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProfilePhoto from "@/components/ProfilePhoto";
import BottomNavigation from "@/components/BottomNavigation";
import PageHeader from "@/components/PageHeader";
import {
  Settings,
  Edit,
  Camera,
  MapPin,
  Heart,
  Sparkles,
  Flame,
  Star,
  Shield,
  CreditCard,
  Bell,
  Lock,
  HelpCircle,
  LogOut,
  ChevronRight,
  User,
  Phone,
  Mail,
  Calendar,
  Ruler,
  GraduationCap,
  Briefcase,
  Coffee,
  Music,
  Book,
  Globe,
  Plus,
  X,
  Check,
  Zap,
  Crown,
  Gift,
} from "lucide-react";

interface UserProfile {
  name: string;
  age: number;
  personalityType: "blue" | "amber" | "red";
  gender: "male" | "female";
  location: string;
  bio: string;
  verified: boolean;
  premium: boolean;
  height: string;
  education: string;
  profession: string;
  interests: string[];
  languages: string[];
  phone: string;
  email: string;
  joinDate: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const [credits, setCredits] = useState(15);
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Alex Rivera",
    age: 26,
    personalityType: "blue",
    gender: "male",
    location: "San Vicente de Cañete, Lima",
    bio: "Desarrollador apasionado por la tecnología y los viajes. Me gusta explorar nuevos lugares y conectar con personas interesantes. Busco algo serio y duradero.",
    verified: true,
    premium: false,
    height: "1.78m",
    education: "Universidad Nacional de Ingeniería",
    profession: "Desarrollador Full-Stack",
    interests: [
      "Tecnología",
      "Viajes",
      "Fotografía",
      "Cocina",
      "Libros",
      "Música",
      "Deportes",
    ],
    languages: ["Español", "Inglés", "Portugués"],
    phone: "+51 987 654 321",
    email: "alex.rivera@email.com",
    joinDate: "Enero 2024",
  });

  const [newInterest, setNewInterest] = useState("");

  const modeConfig = {
    blue: {
      color: "#3B82F6",
      name: "Serio",
      description: "Relaciones duraderas",
      icon: Heart,
    },
    amber: {
      color: "#F59E0B",
      name: "Aventura",
      description: "Experiencias divertidas",
      icon: Sparkles,
    },
    red: {
      color: "#EF4444",
      name: "Pasión",
      description: "Conexiones intensas",
      icon: Flame,
    },
  };

  const addInterest = () => {
    if (
      newInterest.trim() &&
      !userProfile.interests.includes(newInterest.trim())
    ) {
      setUserProfile((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()],
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setUserProfile((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  const handlePersonalityChange = (type: "blue" | "amber" | "red") => {
    setUserProfile((prev) => ({ ...prev, personalityType: type }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brich-dark via-slate-900 to-brich-dark">
      <PageHeader
        title="Mi Perfil"
        subtitle="Gestiona tu información"
        icon={<Settings className="h-6 w-6" />}
        iconColor="text-purple-500"
        credits={credits}
        isPremium={userProfile.premium}
      />

      <div className="max-w-md mx-auto px-4 py-6 pb-32 space-y-6">
        {/* Profile Header */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <ProfilePhoto
                  name={userProfile.name}
                  gender={userProfile.gender}
                  personalityType={userProfile.personalityType}
                  size="xl"
                  className={`border-4 ${
                    userProfile.personalityType === "blue"
                      ? "border-blue-500"
                      : userProfile.personalityType === "amber"
                        ? "border-amber-500"
                        : "border-red-500"
                  }`}
                />
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-white/90 backdrop-blur-xl border border-white/30 rounded-full text-gray-800 hover:bg-blue-500 hover:text-white shadow-lg"
                >
                  <Camera className="h-4 w-4" />
                </Button>
                {userProfile.verified && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <h2 className="text-2xl font-bold text-white">
                    {userProfile.name}
                  </h2>
                  <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-xl px-3 py-1">
                    <span className="text-sm font-bold text-white">
                      {userProfile.age}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-1 mb-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-300">
                    {userProfile.location}
                  </span>
                </div>

                <Badge
                  className="mb-4"
                  style={{
                    backgroundColor: `${modeConfig[userProfile.personalityType].color}20`,
                    borderColor: `${modeConfig[userProfile.personalityType].color}40`,
                    color: modeConfig[userProfile.personalityType].color,
                  }}
                >
                  {React.createElement(
                    modeConfig[userProfile.personalityType].icon,
                    { className: "h-3 w-3 mr-1" },
                  )}
                  {modeConfig[userProfile.personalityType].name}
                </Badge>

                <p className="text-sm text-gray-300 leading-relaxed">
                  {userProfile.bio}
                </p>
              </div>

              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Guardar cambios" : "Editar perfil"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Personality Type Selector */}
        {isEditing && (
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Tipo de personalidad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {(Object.keys(modeConfig) as Array<keyof typeof modeConfig>).map(
                (mode) => {
                  const IconComponent = modeConfig[mode].icon;
                  const isActive = userProfile.personalityType === mode;

                  return (
                    <Button
                      key={mode}
                      onClick={() => handlePersonalityChange(mode)}
                      variant="ghost"
                      className={`w-full p-4 justify-start rounded-lg border transition-all duration-200 ${
                        isActive
                          ? "bg-slate-700 border-slate-600 text-white"
                          : "bg-slate-800/50 border-slate-700 text-gray-400 hover:bg-slate-700/50 hover:text-white"
                      }`}
                    >
                      <IconComponent className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-semibold">
                          {modeConfig[mode].name}
                        </div>
                        <div className="text-xs opacity-70">
                          {modeConfig[mode].description}
                        </div>
                      </div>
                    </Button>
                  );
                },
              )}
            </CardContent>
          </Card>
        )}

        {/* Personal Information */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="h-5 w-5 mr-2" />
              Información personal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Ruler className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-400">Altura</div>
                  <div className="text-sm text-white font-medium">
                    {userProfile.height}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-400">Miembro desde</div>
                  <div className="text-sm text-white font-medium">
                    {userProfile.joinDate}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <GraduationCap className="h-4 w-4 text-gray-400" />
              <div>
                <div className="text-xs text-gray-400">Educación</div>
                <div className="text-sm text-white font-medium">
                  {userProfile.education}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Briefcase className="h-4 w-4 text-gray-400" />
              <div>
                <div className="text-xs text-gray-400">Profesión</div>
                <div className="text-sm text-white font-medium">
                  {userProfile.profession}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              Contacto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-gray-400" />
              <div>
                <div className="text-xs text-gray-400">Teléfono</div>
                <div className="text-sm text-white font-medium">
                  {userProfile.phone}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-gray-400" />
              <div>
                <div className="text-xs text-gray-400">Email</div>
                <div className="text-sm text-white font-medium">
                  {userProfile.email}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interests */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Intereses
              </div>
              {isEditing && (
                <Button
                  size="sm"
                  onClick={() =>
                    setActiveSection(
                      activeSection === "interests" ? null : "interests",
                    )
                  }
                  className="bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeSection === "interests" && isEditing && (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addInterest()}
                  placeholder="Nuevo interés..."
                  className="flex-1 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-xl px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Button
                  size="sm"
                  onClick={addInterest}
                  className="bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30"
                >
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {userProfile.interests.map((interest, index) => (
                <Badge
                  key={index}
                  className="bg-purple-500/20 text-purple-300 border-purple-500/30 flex items-center space-x-1"
                >
                  <span>{interest}</span>
                  {isEditing && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeInterest(interest)}
                      className="p-0 h-auto hover:bg-red-500/20"
                    >
                      <X className="h-3 w-3 text-red-400" />
                    </Button>
                  )}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Languages */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Idiomas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userProfile.languages.map((language, index) => (
                <Badge
                  key={index}
                  className="bg-blue-500/20 text-blue-300 border-blue-500/30"
                >
                  {language}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Premium Upgrade */}
        {!userProfile.premium && (
          <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-yellow-300 flex items-center">
                <Crown className="h-5 w-5 mr-2" />
                Upgrade a Premium
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-yellow-100">
                Desbloquea funciones exclusivas y mejora tu experiencia en Brich
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-yellow-100">
                  <Zap className="h-4 w-4" />
                  <span>Créditos ilimitados</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-yellow-100">
                  <Star className="h-4 w-4" />
                  <span>Ver quién te dio like</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-yellow-100">
                  <Shield className="h-4 w-4" />
                  <span>Perfil verificado automáticamente</span>
                </div>
              </div>
              <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-600 font-medium">
                <Crown className="h-4 w-4 mr-2" />
                Hacerse Premium - S/ 29.90/mes
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Settings Menu */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Configuración</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-between text-white hover:bg-white/10 h-auto py-3"
            >
              <div className="flex items-center">
                <Bell className="h-4 w-4 mr-3 text-gray-400" />
                <span>Notificaciones</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-between text-white hover:bg-white/10 h-auto py-3"
            >
              <div className="flex items-center">
                <Lock className="h-4 w-4 mr-3 text-gray-400" />
                <span>Privacidad y seguridad</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-between text-white hover:bg-white/10 h-auto py-3"
            >
              <div className="flex items-center">
                <Gift className="h-4 w-4 mr-3 text-gray-400" />
                <span>Invitar amigos</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-between text-white hover:bg-white/10 h-auto py-3"
            >
              <div className="flex items-center">
                <HelpCircle className="h-4 w-4 mr-3 text-gray-400" />
                <span>Ayuda y soporte</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-between text-red-400 hover:bg-red-500/10 h-auto py-3"
            >
              <div className="flex items-center">
                <LogOut className="h-4 w-4 mr-3" />
                <span>Cerrar sesión</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}
