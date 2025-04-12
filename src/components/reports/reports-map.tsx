
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MosquitoReport, getAllReports, subscribe } from "@/services/report-service";
import { Card } from "@/components/ui/card";
import { MapPin, RefreshCw } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet icons that don't work correctly in React
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Create default icon for Leaflet
const DefaultIcon = L.Icon.extend({});
const defaultIcon = new DefaultIcon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Component to center the map when data changes
function MapUpdater({ reports }: { reports: MosquitoReport[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (reports.length > 0) {
      try {
        // Calculate bounds to fit all markers
        const bounds = L.latLngBounds(
          reports.map(report => [
            report.location.lat,
            report.location.lng
          ]) as [number, number][]
        );
        
        map.fitBounds(bounds, { padding: [50, 50] });
      } catch (error) {
        // Fallback if there's an issue with bounds
        map.setView([-15.77972, -47.92972], 4);
      }
    } else {
      // If there are no markers, center on Brazil
      map.setView([-15.77972, -47.92972], 4);
    }
  }, [reports, map]);
  
  return null;
}

// Generate colored icons based on report status
function getMarkerIcon(status: string) {
  let color = "";
  
  switch (status) {
    case "pending":
      color = "#f59e0b"; // amber-500
      break;
    case "verified":
      color = "#3b82f6"; // blue-500
      break;
    case "eliminated":
      color = "#22c55e"; // green-500
      break;
    default:
      color = "#f59e0b"; // amber-500
  }
  
  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        border: 2px solid white;
        box-shadow: 0 0 5px rgba(0,0,0,0.3);
      ">
        <div style="
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 100%;
        "></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
}

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
  
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Pendente";
      case "verified": return "Verificado";
      case "eliminated": return "Eliminado";
      default: return status;
    }
  };
  
  return (
    <Card className="w-full h-[70vh] p-0 overflow-hidden shadow-lg relative">
      <MapContainer 
        className="w-full h-full z-0"
        center={[-15.77972, -47.92972]} 
        zoom={4} 
        scrollWheelZoom={false}
        style={{ zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[report.location.lat, report.location.lng]}
            icon={getMarkerIcon(report.status)}
            eventHandlers={{
              click: () => {
                navigate(`/reports/${report.id}`);
              }
            }}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-medium">{report.description}</h3>
                <p className="text-sm text-muted-foreground">
                  {report.location.address}
                </p>
                <p className="text-xs mt-1">
                  Status: <span className="font-medium">{getStatusText(report.status)}</span>
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
        
        <MapUpdater reports={reports} />
      </MapContainer>
      
      {/* Refresh button */}
      <button 
        className="absolute top-2 right-2 bg-background/80 hover:bg-background p-2 rounded-full shadow-md z-[500]"
        onClick={handleRefreshMap}
        aria-label="Atualizar mapa"
      >
        <RefreshCw className="h-4 w-4" />
      </button>
      
      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-background/90 p-2 rounded shadow-md z-[500] text-xs">
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
      
      {/* Loading/empty state message */}
      {reports.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 z-[400]">
          <div className="text-muted-foreground flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Não há denúncias registradas ainda
          </div>
        </div>
      )}
    </Card>
  );
}
