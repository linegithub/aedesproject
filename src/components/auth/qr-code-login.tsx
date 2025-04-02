
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithQRCode } from "@/services/auth-service";
import { generateQRCode } from "@/services/report-service";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";

interface QRCodeLoginProps {
  onBackClick: () => void;
  onSuccess?: () => void;
}

export function QRCodeLogin({ onBackClick, onSuccess }: QRCodeLoginProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const navigate = useNavigate();
  
  // Gera um novo QR Code
  const refreshQRCode = () => {
    setQrCodeUrl(generateQRCode());
    setCountdown(60);
  };
  
  // Gerar QR Code inicial
  useEffect(() => {
    refreshQRCode();
  }, []);
  
  // Contador regressivo
  useEffect(() => {
    if (countdown <= 0) {
      refreshQRCode();
      return;
    }
    
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [countdown]);
  
  // Simula o login com QR Code após alguns segundos (em um app real, isso seria verificado pelo backend)
  useEffect(() => {
    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const success = await loginWithQRCode("mock-token");
        if (success) {
          if (onSuccess) {
            onSuccess();
          } else {
            navigate("/dashboard");
          }
        }
      } finally {
        setIsLoading(false);
      }
    }, 5000); // Simula 5 segundos para escanear
    
    return () => clearTimeout(timer);
  }, [qrCodeUrl, navigate, onSuccess]);
  
  return (
    <div className="w-full max-w-md p-6 space-y-6 bg-card rounded-xl shadow-lg glassmorphism">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Login com QR Code</h2>
        <p className="text-sm text-muted-foreground">
          Escaneie o QR Code com o aplicativo móvel
        </p>
      </div>
      
      <div className="flex flex-col items-center space-y-6">
        <div className="relative p-2 bg-white rounded-lg shadow">
          <img
            src={qrCodeUrl}
            alt="QR Code para Login"
            className="w-64 h-64 object-contain"
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            O QR Code expira em <span className="font-semibold">{countdown}</span> segundos
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={refreshQRCode}
            disabled={isLoading}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Gerar novo QR Code
          </Button>
        </div>
      </div>
      
      <Button
        variant="ghost"
        className="w-full"
        onClick={onBackClick}
        disabled={isLoading}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para o login
      </Button>
    </div>
  );
}
