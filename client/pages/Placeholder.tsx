import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ArrowLeft, Construction } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PlaceholderProps {
  title: string;
  description: string;
}

export default function Placeholder({ 
  title = "Próximamente", 
  description = "Esta funcionalidad estará disponible pronto." 
}: PlaceholderProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brich-dark via-slate-900 to-brich-dark">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="w-8 h-8 bg-brich-hero-gradient rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white">Brich</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-20">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-brich-amber-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <Construction className="h-10 w-10 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
            <p className="text-white/70 mb-8">{description}</p>
            
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/')}
                className="w-full bg-brich-blue-gradient text-white hover:opacity-90"
              >
                Volver al inicio
              </Button>
              
              <p className="text-sm text-white/50">
                ¿Quieres que prioricemos esta función? ¡Contáctanos!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
