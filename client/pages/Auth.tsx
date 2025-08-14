import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Heart, 
  Shield, 
  Camera, 
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function Auth() {
  const [step, setStep] = useState<'login' | 'register' | 'dni-verify'>('login');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    dni: '',
    phone: '',
    email: '',
    name: '',
    birthDate: '',
    bio: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (step === 'login') {
        // Redirect to main app
        window.location.href = '/';
      } else if (step === 'register') {
        setStep('dni-verify');
      }
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brich-dark via-slate-900 to-brich-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brich-hero-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Brich</h1>
          <p className="text-white/70">Tu app de citas con verificación segura</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <div className="flex items-center space-x-2">
              {step !== 'login' && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setStep(step === 'dni-verify' ? 'register' : 'login')}
                  className="text-white hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <CardTitle className="text-white">
                {step === 'login' && "Iniciar Sesión"}
                {step === 'register' && "Crear Cuenta"}
                {step === 'dni-verify' && "Verificación DNI"}
              </CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 'login' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="login-dni" className="text-white">DNI</Label>
                    <Input
                      id="login-dni"
                      type="text"
                      placeholder="12345678"
                      value={formData.dni}
                      onChange={(e) => handleInputChange('dni', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      maxLength={8}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-phone" className="text-white">Teléfono</Label>
                    <Input
                      id="login-phone"
                      type="tel"
                      placeholder="987654321"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-brich-blue-gradient text-white hover:opacity-90"
                    disabled={loading}
                  >
                    {loading ? "Verificando..." : "Iniciar Sesión"}
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setStep('register')}
                      className="text-brich-blue-500 hover:text-brich-blue-400 text-sm"
                    >
                      ¿No tienes cuenta? Regístrate
                    </button>
                  </div>
                </>
              )}

              {step === 'register' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="reg-dni" className="text-white">DNI *</Label>
                    <Input
                      id="reg-dni"
                      type="text"
                      placeholder="12345678"
                      value={formData.dni}
                      onChange={(e) => handleInputChange('dni', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      maxLength={8}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-name" className="text-white">Nombre completo *</Label>
                    <Input
                      id="reg-name"
                      type="text"
                      placeholder="Tu nombre completo"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-birth" className="text-white">Fecha de nacimiento *</Label>
                    <Input
                      id="reg-birth"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-phone" className="text-white">Teléfono *</Label>
                    <Input
                      id="reg-phone"
                      type="tel"
                      placeholder="987654321"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-email" className="text-white">Email</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-bio" className="text-white">Biografía</Label>
                    <textarea
                      id="reg-bio"
                      placeholder="Cuéntanos sobre ti..."
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/50 resize-none"
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-brich-blue-gradient text-white hover:opacity-90"
                    disabled={loading}
                  >
                    {loading ? "Creando cuenta..." : "Continuar con verificación"}
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setStep('login')}
                      className="text-brich-blue-500 hover:text-brich-blue-400 text-sm"
                    >
                      ¿Ya tienes cuenta? Inicia sesión
                    </button>
                  </div>
                </>
              )}

              {step === 'dni-verify' && (
                <>
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-brich-amber-gradient rounded-full flex items-center justify-center mx-auto">
                      <Shield className="h-10 w-10 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Verificación de identidad</h3>
                      <p className="text-white/70 text-sm">
                        Para garantizar la seguridad, necesitamos verificar tu identidad con una foto de tu DNI.
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 space-y-3">
                      <div className="flex items-center space-x-3 text-white/80 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Mantén tu DNI bien iluminado</span>
                      </div>
                      <div className="flex items-center space-x-3 text-white/80 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Asegúrate de que se vea claramente</span>
                      </div>
                      <div className="flex items-center space-x-3 text-white/80 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Los datos deben coincidir con tu registro</span>
                      </div>
                    </div>

                    <Button 
                      type="button"
                      className="w-full bg-brich-amber-gradient text-white hover:opacity-90"
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      Tomar foto del DNI
                    </Button>

                    <div className="flex items-center space-x-2 text-yellow-400 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>Tu información está protegida y encriptada</span>
                    </div>
                  </div>
                </>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-white/60 text-sm">
          <p>Al registrarte, aceptas nuestros términos y condiciones</p>
        </div>
      </div>
    </div>
  );
}
