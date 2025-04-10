
import { Link } from "react-router-dom";
import { Shield, MapPin, LayoutDashboard, AlertTriangle, UsersRound } from "lucide-react";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  requiresAuth?: boolean;
}

interface NavLinksProps {
  isAuthenticated: boolean;
  isMobile?: boolean;
  onClick?: () => void;
}

export const navigationItems: NavigationItem[] = [
  {
    name: "Início",
    href: "/",
    icon: <Shield className="w-4 h-4 mr-2" />,
  },
  {
    name: "Mapa",
    href: "/map",
    icon: <MapPin className="w-4 h-4 mr-2" />,
  },
  {
    name: "Painel",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-4 h-4 mr-2" />,
    requiresAuth: true,
  },
  {
    name: "Minhas Denúncias",
    href: "/reports",
    icon: <AlertTriangle className="w-4 h-4 mr-2" />,
    requiresAuth: true,
  },
  {
    name: "Sobre Nós",
    href: "/about",
    icon: <UsersRound className="w-4 h-4 mr-2" />,
  },
];

export function NavLinks({ isAuthenticated, isMobile, onClick }: NavLinksProps) {
  return (
    <>
      {navigationItems.map((item) => {
        if (item.requiresAuth && !isAuthenticated) {
          return null;
        }
        
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`${
              isMobile 
                ? "flex items-center py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" 
                : "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            }`}
            onClick={onClick}
          >
            {isMobile && item.icon}
            {item.name}
          </Link>
        );
      })}
    </>
  );
}
