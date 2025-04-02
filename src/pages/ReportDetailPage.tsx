
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MosquitoReport, getReportById } from "@/services/report-service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  AlertTriangle, 
  Calendar, 
  ChevronLeft, 
  MapPin, 
  User 
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const ReportDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<MosquitoReport | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!id) {
      navigate("/reports");
      return;
    }
    
    const reportData = getReportById(id);
    if (reportData) {
      setReport(reportData);
    } else {
      navigate("/reports");
    }
    setLoading(false);
  }, [id, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Denúncia não encontrada</h1>
          <p className="text-muted-foreground mb-4">
            A denúncia que você está procurando não existe ou foi removida.
          </p>
          <Button asChild>
            <Link to="/reports">Voltar para Denúncias</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const getStatusBadge = () => {
    switch (report.status) {
      case "pending":
        return <Badge className="bg-amber-500 text-white">Pendente</Badge>;
      case "verified":
        return <Badge className="bg-blue-500 text-white">Verificado</Badge>;
      case "eliminated":
        return <Badge className="bg-green-500 text-white">Eliminado</Badge>;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/reports">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Voltar para Denúncias
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Detalhes da Denúncia</h1>
                {getStatusBadge()}
              </div>
              <p className="text-muted-foreground">
                Informações sobre o foco do Aedes Aegypti reportado
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Image and map */}
          <div className="lg:col-span-2 space-y-6">
            {report.imageUrl ? (
              <Card>
                <CardHeader>
                  <CardTitle>Imagem do Foco</CardTitle>
                  <CardDescription>
                    Fotografia enviada na denúncia
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={report.imageUrl}
                      alt="Foco do mosquito"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Sem Imagem</CardTitle>
                  <CardDescription>
                    Nenhuma imagem foi enviada para esta denúncia
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-12 bg-muted/50">
                  <AlertTriangle className="h-16 w-16 text-muted-foreground/50" />
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle>Localização</CardTitle>
                <CardDescription>
                  Mapa do local da denúncia
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div
                  className="aspect-video w-full relative"
                  style={{
                    background: "url('https://via.placeholder.com/800x450/E2F0E2/40C840?text=Mapa') center/cover",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-primary animate-pulse">
                      <MapPin className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-background/90 p-2 rounded text-sm">
                    {report.location.address}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>
                    Coordenadas: {report.location.lat.toFixed(6)}, {report.location.lng.toFixed(6)}
                  </span>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          {/* Right column - Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detalhes da Denúncia</CardTitle>
                <CardDescription>
                  Informações sobre este registro
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Descrição</h3>
                  <p>{report.description}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Autoria</h3>
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{report.userName}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Data do Registro</h3>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{format(report.createdAt, "PPP 'às' HH:mm", { locale: ptBR })}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                  <div className="flex items-center">
                    {getStatusBadge()}
                    <span className="ml-2">
                      {report.status === "pending" && "Aguardando verificação"}
                      {report.status === "verified" && "Verificado pela equipe"}
                      {report.status === "eliminated" && "Foco eliminado"}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/reports/new">
                    Criar Nova Denúncia
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recomendações</CardTitle>
                <CardDescription>
                  O que fazer enquanto aguarda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                  <p className="text-sm">Elimine água parada em recipientes próximos</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                  <p className="text-sm">Use repelentes em áreas de risco</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                  <p className="text-sm">Mantenha portas e janelas teladas</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                  <p className="text-sm">Alerte seus vizinhos sobre o foco</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReportDetailPage;
