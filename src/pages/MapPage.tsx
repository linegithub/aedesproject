
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { ReportsMap } from "@/components/reports/reports-map";
import { useAuth } from "@/hooks/use-auth";

const MapPage = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mapa de Focos</h1>
            <p className="text-muted-foreground">
              Visualize todas as denúncias de focos do Aedes Aegypti
            </p>
          </div>
          
          {isAuthenticated && (
            <Button asChild>
              <Link to="/reports/new">
                <Plus className="mr-2 h-4 w-4" />
                Nova Denúncia
              </Link>
            </Button>
          )}
        </div>
        
        <ReportsMap />
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Dicas para Interpretar o Mapa</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-card p-4 rounded-lg border">
              <h3 className="font-semibold text-lg mb-2">Cores dos Marcadores</h3>
              <p className="text-sm text-muted-foreground">
                Os marcadores utilizam cores diferentes para indicar o status de cada foco:
                amarelo para pendentes, azul para verificados e verde para eliminados.
              </p>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <h3 className="font-semibold text-lg mb-2">Informações Detalhadas</h3>
              <p className="text-sm text-muted-foreground">
                Clique em um marcador para ver detalhes sobre a denúncia, incluindo descrição,
                data de registro e fotos do local.
              </p>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <h3 className="font-semibold text-lg mb-2">Áreas de Concentração</h3>
              <p className="text-sm text-muted-foreground">
                Fique atento às áreas com maior concentração de marcadores, pois representam
                regiões com maior incidência de focos do mosquito.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MapPage;
