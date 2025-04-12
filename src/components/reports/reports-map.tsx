
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MosquitoReport, getAllReports, subscribe } from "@/services/report-service";
import { Card } from "@/components/ui/card";
import { AlertCircle, MapPin } from "lucide-react";

export function ReportsMap() {
  const [reports, setReports] = useState<MosquitoReport[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Carregar denúncias iniciais
    setReports(getAllReports());
    
    // Assinar mudanças nas denúncias
    const unsubscribe = subscribe(() => {
      setReports(getAllReports());
    });
    
    return unsubscribe;
  }, []);
  
  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    const initMap = () => {
      const mapContainer = mapContainerRef.current;
      if (!mapContainer) return;
      
      // Limpar conteúdo existente
      mapContainer.innerHTML = "";
      
      // Criar mapa simulado com suporte cross-browser
      const mapElem = document.createElement("div");
      mapElem.className = "w-full h-full bg-muted rounded-lg overflow-hidden relative";
      
      // Use a solid background color with a grid pattern for better cross-browser support
      mapElem.style.backgroundColor = "#E2F0E2";
      mapElem.style.backgroundImage = "linear-gradient(rgba(64, 200, 64, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(64, 200, 64, 0.1) 1px, transparent 1px)";
      mapElem.style.backgroundSize = "20px 20px";
      
      mapContainer.appendChild(mapElem);
      
      // Adicionar marcadores para cada denúncia com posicionamento determinístico
      reports.forEach((report, index) => {
        const marker = document.createElement("div");
        marker.className = "absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer";
        
        // Usar posicionamento determinístico baseado no ID do relatório
        // para garantir consistência entre navegadores
        const reportIdNumber = parseInt(report.id, 10) || index;
        const hashValue = (reportIdNumber * 9973) % 8929; // números primos para melhor distribuição
        
        // Usar o hash para determinar a posição, garantindo que seja consistente
        const top = 15 + (hashValue % 70); // 15-85%
        const left = 15 + ((hashValue * 31) % 70); // 15-85%, usando outro fator primo
        
        marker.style.top = `${top}%`;
        marker.style.left = `${left}%`;
        
        // Marcador personalizado com melhor suporte cross-browser
        const statusColor = 
          report.status === 'pending' ? 'text-amber-500' : 
          report.status === 'verified' ? 'text-blue-500' : 'text-green-500';
          
        marker.innerHTML = `
          <div class="
            w-6 h-6 flex items-center justify-center
            ${statusColor}
            hover:scale-125 transition-transform
          ">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        `;
        
        // Adicionar tooltip ao passar o mouse com melhor suporte cross-browser
        const tooltip = document.createElement("div");
        tooltip.className = "absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-background border border-border rounded px-2 py-1 text-xs whitespace-nowrap opacity-0 transition-opacity z-10";
        tooltip.textContent = report.description.slice(0, 30) + (report.description.length > 30 ? "..." : "");
        marker.appendChild(tooltip);
        
        // Mostrar tooltip ao passar o mouse usando eventos padrão
        marker.addEventListener("mouseenter", () => {
          tooltip.style.opacity = "1";
        });
        
        marker.addEventListener("mouseleave", () => {
          tooltip.style.opacity = "0";
        });
        
        // Navegar para a denúncia ao clicar no marcador
        marker.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          navigate(`/reports/${report.id}`);
        });
        
        mapElem.appendChild(marker);
      });
      
      // Adicionar mensagem quando não há denúncias
      if (reports.length === 0) {
        const noDataMessage = document.createElement("div");
        noDataMessage.className = "absolute inset-0 flex flex-col items-center justify-center bg-background/50";
        noDataMessage.innerHTML = `
          <div class="text-muted-foreground flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>
            Não há denúncias registradas ainda
          </div>
        `;
        mapElem.appendChild(noDataMessage);
      }
      
      // Adicionar botão de atualização do mapa
      const refreshButton = document.createElement("button");
      refreshButton.className = "absolute top-2 right-2 bg-background/80 hover:bg-background p-2 rounded-full shadow-md z-10";
      refreshButton.setAttribute("aria-label", "Atualizar mapa");
      refreshButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.72 2.25"></path><path d="M21 3v9h-9"></path></svg>
      `;
      refreshButton.addEventListener("click", (e) => {
        e.preventDefault();
        toast.success("Mapa atualizado");
        initMap();
      });
      mapElem.appendChild(refreshButton);
      
      // Adicionar legenda
      const legend = document.createElement("div");
      legend.className = "absolute bottom-2 left-2 bg-background/80 p-2 rounded shadow-md z-10 text-xs";
      legend.innerHTML = `
        <div class="font-medium mb-1">Legenda:</div>
        <div class="flex items-center mb-1">
          <span class="text-amber-500 mr-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </span>
          <span>Pendente</span>
        </div>
        <div class="flex items-center mb-1">
          <span class="text-blue-500 mr-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </span>
          <span>Verificado</span>
        </div>
        <div class="flex items-center">
          <span class="text-green-500 mr-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </span>
          <span>Eliminado</span>
        </div>
      `;
      mapElem.appendChild(legend);
    };
    
    initMap();
  }, [reports, navigate]);
  
  return (
    <Card className="w-full h-[70vh] p-0 overflow-hidden shadow-lg">
      <div ref={mapContainerRef} className="w-full h-full" />
    </Card>
  );
}
