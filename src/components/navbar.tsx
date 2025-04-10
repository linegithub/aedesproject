
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { logout } from "@/services/auth-service";
import { useIsMobile } from "@/hooks/use-mobile";
import { Shield } from "lucide-react";
import { NavLinks } from "@/components/navigation/nav-links";
import { UserDropdown } from "@/components/navigation/user-dropdown";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { AuthButtons } from "@/components/navigation/auth-buttons";

export function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl hidden sm:inline-block">Alerta Aedes</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <NavLinks isAuthenticated={isAuthenticated} />
        </nav>
        
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <UserDropdown user={user} onLogout={handleLogout} />
              <ThemeToggle />
              <AuthButtons isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <AuthButtons isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            </div>
          )}
          
          <MobileMenu 
            isAuthenticated={isAuthenticated} 
            user={user} 
            onLogout={handleLogout} 
          />
        </div>
      </div>
    </header>
  );
}
