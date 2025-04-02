
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-background">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
        <AlertCircle className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-xl text-muted-foreground mb-6">Página não encontrada</p>
      <p className="max-w-md text-muted-foreground mb-8">
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>
      <Button asChild>
        <Link to="/">Voltar para a página inicial</Link>
      </Button>
    </div>
  );
};

export default NotFound;
