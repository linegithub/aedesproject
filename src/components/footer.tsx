import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Alerta Aedes</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Sistema de monitoramento colaborativo contra o Aedes Aegypti.
              Trabalhe conosco para combater a dengue, zika e chikungunya.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Navegação</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Início
              </Link>
              <Link to="/map" className="text-muted-foreground hover:text-foreground">
                Mapa
              </Link>
              <Link to="/reports" className="text-muted-foreground hover:text-foreground">
                Denúncias
              </Link>
              <Link to="/reports/new" className="text-muted-foreground hover:text-foreground">
                Nova Denúncia
              </Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Recursos</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <a
                href="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dengue"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                Ministério da Saúde
              </a>
              <a
                href="https://www.paho.org/pt/topicos/dengue"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                OPAS/OMS
              </a>
              <a
                href="https://www.who.int/health-topics/dengue-and-severe-dengue"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                OMS
              </a>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Legal</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Termos de Uso
              </Link>
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Política de Privacidade
              </Link>
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Cookies
              </Link>
            </nav>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Alerta Aedes. Todos os direitos reservados.
          </p>
          
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
