
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MosquitoReport, getAllReports, subscribe } from "@/services/report-service";
import { Card } from "@/components/ui/card";
import { MapPin, RefreshCw } from "lucide-react";

// Simpler map implementation without Leaflet
export function ReportsMap() {
  const [reports, setReports] = useState<MosquitoReport[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load initial reports
    setReports(getAllReports());
    
    // Subscribe to changes in reports
    const unsubscribe = subscribe(() => {
      setReports(getAllReports());
    });
    
    return unsubscribe;
  }, []);
  
  const handleRefreshMap = () => {
    setReports(getAllReports());
    toast.success("Mapa atualizado");
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-amber-500";
      case "verified": return "bg-blue-500";
      case "eliminated": return "bg-green-500";
      default: return "bg-amber-500";
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Pendente";
      case "verified": return "Verificado";
      case "eliminated": return "Eliminado";
      default: return status;
    }
  };
  
  return (
    <Card className="w-full h-[70vh] p-4 overflow-hidden shadow-lg relative flex flex-col">
      <div className="flex justify-end mb-2">
        <button 
          className="bg-background hover:bg-background/80 p-2 rounded-full shadow-md z-10"
          onClick={handleRefreshMap}
          aria-label="Atualizar mapa"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
      
      {/* Map visualization */}
      <div className="flex-1 relative bg-gray-100 rounded-md overflow-hidden">
        {reports.length > 0 ? (
          <div className="absolute inset-0">
            {/* Simple Map implementation */}
            <div className="relative w-full h-full bg-[url('https://via.placeholder.com/1200x800/e5e7eb/a3a3a3?text=Mapa+do+Brasil')] bg-cover bg-center">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{
                    left: `${((report.location.lng + 180) / 360) * 100}%`, 
                    top: `${((90 - report.location.lat) / 180) * 100}%`
                  }}
                  onClick={() => navigate(`/reports/${report.id}`)}
                >
                  <div className={`w-6 h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center ${getStatusColor(report.status)}`}>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded text-xs shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {report.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 z-10">
            <div className="text-muted-foreground flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Não há denúncias registradas ainda
            </div>
          </div>
        )}
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-background/90 p-2 rounded shadow-md z-20 text-xs">
        <div className="font-medium mb-1">Legenda:</div>
        <div className="flex items-center mb-1">
          <span className="h-3 w-3 rounded-full bg-amber-500 mr-1"></span>
          <span>Pendente</span>
        </div>
        <div className="flex items-center mb-1">
          <span className="h-3 w-3 rounded-full bg-blue-500 mr-1"></span>
          <span>Verificado</span>
        </div>
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-green-500 mr-1"></span>
          <span>Eliminado</span>
        </div>
      </div>
    </Card>
  );
}
