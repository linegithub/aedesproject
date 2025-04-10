
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { logout } from "@/services/auth-service";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlertTriangle,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  Shield,
  User,
  UsersRound,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const navigationItems = [
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
          {navigationItems.map((item) => {
            if (item.requiresAuth && !isAuthenticated) {
              return null;
            }
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      {user?.avatar ? (
                        <AvatarImage src={user.avatar} alt={user.name} />
                      ) : (
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      {user?.avatar ? (
                        <AvatarImage src={user.avatar} alt={user.name} />
                      ) : (
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/reports" className="w-full cursor-pointer">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      <span>Minhas Denúncias</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/reports/new" className="w-full cursor-pointer">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      <span>Nova Denúncia</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <ThemeToggle />
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="gap-1"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="default" size="sm" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
            </div>
          )}
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="md:hidden">
              <SheetHeader className="mb-4">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              
              {isAuthenticated && (
                <div className="flex items-center gap-2 mb-4 p-2 bg-muted/50 rounded-md">
                  <Avatar className="h-10 w-10">
                    {user?.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    ) : (
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{user?.name}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                </div>
              )}
              
              <nav className="flex flex-col gap-4">
                {navigationItems.map((item) => {
                  if (item.requiresAuth && !isAuthenticated) {
                    return null;
                  }
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      onClick={closeMobileMenu}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  );
                })}
                
                <div className="h-px bg-border my-2" />
                
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/reports/new"
                      className="flex items-center py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      onClick={closeMobileMenu}
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Nova Denúncia
                    </Link>
                    <Button
                      variant="destructive"
                      className="justify-start p-2 h-auto font-normal"
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="default"
                    className="justify-start p-2 h-auto font-normal"
                    onClick={() => {
                      navigate("/login");
                      closeMobileMenu();
                    }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Entrar
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
