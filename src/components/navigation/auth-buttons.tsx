
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export function AuthButtons({ isAuthenticated, onLogout }: AuthButtonsProps) {
  if (isAuthenticated) {
    return (
      <Button 
        variant="destructive"
        size="sm"
        onClick={onLogout}
        className="gap-1"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Sair</span>
      </Button>
    );
  }

  return (
    <Button variant="default" size="sm" asChild>
      <Link to="/login">Entrar</Link>
    </Button>
  );
}
