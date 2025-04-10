
import { User } from "@/services/auth-service";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlertTriangle, LogOut, Menu, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { NavLinks } from "./nav-links";

interface MobileMenuProps {
  isAuthenticated: boolean;
  user: User | null;
  onLogout: () => void;
}

export function MobileMenu({ isAuthenticated, user, onLogout }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleClose = () => setIsOpen(false);
  
  const handleLogoutClick = () => {
    onLogout();
    handleClose();
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
                  <UserIcon className="h-5 w-5" />
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
          <NavLinks 
            isAuthenticated={isAuthenticated} 
            isMobile={true}
            onClick={handleClose}
          />
          
          <div className="h-px bg-border my-2" />
          
          {isAuthenticated ? (
            <>
              <Link
                to="/reports/new"
                className="flex items-center py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={handleClose}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Nova Denúncia
              </Link>
              <Button
                variant="destructive"
                className="justify-start p-2 h-auto font-normal"
                onClick={handleLogoutClick}
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
                handleClose();
              }}
            >
              <UserCircle className="w-4 h-4 mr-2" />
              Entrar
            </Button>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
