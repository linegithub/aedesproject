
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MapPin, Plus } from "lucide-react";
import { ReportsList } from "@/components/reports/reports-list";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const { user, isAuthenticated, loading } = useAuth();
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Painel de Controle</h1>
            <p className="text-muted-foreground">
              Bem-vindo(a), {user?.name}! Gerencie suas denúncias e monitore os focos do mosquito.
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button asChild>
              <Link to="/reports/new">
                <Plus className="mr-2 h-4 w-4" />
                Nova Denúncia
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/map">
                <MapPin className="mr-2 h-4 w-4" />
                Ver Mapa
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Minhas Denúncias</CardTitle>
              <CardDescription>Total de focos reportados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">2</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Status</CardTitle>
              <CardDescription>Situação dos focos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pendentes</span>
                  <span className="font-semibold">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Verificados</span>
                  <span className="font-semibold">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Eliminados</span>
                  <span className="font-semibold">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Ações Rápidas</CardTitle>
              <CardDescription>Acesso rápido às funções</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/reports/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Denunciar Novo Foco
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/reports">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Ver Minhas Denúncias
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/map">
                  <MapPin className="mr-2 h-4 w-4" />
                  Visualizar Mapa
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-4">Denúncias Recentes</h2>
            <ReportsList />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;
