
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { QRCodeLogin } from "@/components/auth/qr-code-login";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { Shield } from "lucide-react";

type AuthMode = "login" | "register" | "qrcode";

const AuthPage = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const { isAuthenticated } = useAuth();
  
  // Redirecionar se já estiver autenticado
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen flex">
      {/* Left side (form) */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-8">
            <a href="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-semibold text-xl">Alerta Mosquito</span>
            </a>
            <ThemeToggle />
          </div>
          
          {authMode === "login" && (
            <LoginForm
              onRegisterClick={() => setAuthMode("register")}
              onQrCodeClick={() => setAuthMode("qrcode")}
            />
          )}
          
          {authMode === "register" && (
            <RegisterForm onLoginClick={() => setAuthMode("login")} />
          )}
          
          {authMode === "qrcode" && (
            <QRCodeLogin onBackClick={() => setAuthMode("login")} />
          )}
        </div>
      </div>
      
      {/* Right side (image and info) */}
      <div className="hidden lg:flex flex-1 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('https://via.placeholder.com/1200x800/E2F0E2/40C840?text=Mosquito+Background')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        
        <div className="relative flex flex-col justify-center p-12 text-foreground z-10">
          <div className="mb-8">
            <div className="inline-block bg-primary/10 text-primary rounded-lg px-3 py-1 text-sm mb-4">
              Sistema de Alerta
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Juntos no combate ao Aedes Aegypti
            </h1>
            <p className="text-muted-foreground text-lg">
              Faça parte da rede de monitoramento colaborativo contra a dengue, 
              zika e chikungunya. Sua participação salva vidas.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-background/20 backdrop-blur-sm p-4 rounded-lg border border-border/50">
              <div className="text-2xl font-bold mb-1">250+</div>
              <div className="text-sm text-muted-foreground">
                Denúncias feitas em nossa plataforma
              </div>
            </div>
            <div className="bg-background/20 backdrop-blur-sm p-4 rounded-lg border border-border/50">
              <div className="text-2xl font-bold mb-1">85%</div>
              <div className="text-sm text-muted-foreground">
                Focos eliminados após denúncias
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
