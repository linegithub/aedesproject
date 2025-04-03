
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MosquitoReport, subscribe, getUserReports } from "@/services/report-service";
import { ReportCard } from "./report-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function ReportsList() {
  const [userReports, setUserReports] = useState<MosquitoReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Carregar denúncias do usuário
    setUserReports(getUserReports());
    setIsLoading(false);
    
    // Assinar mudanças nas denúncias
    const unsubscribe = subscribe(() => {
      setUserReports(getUserReports());
    });
    
    return unsubscribe;
  }, []);
  
  const handleReportClick = (reportId: string) => {
    navigate(`/reports/${reportId}`);
  };
  
  if (isLoading) {
    return (
      <div className="w-full flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      {userReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userReports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onClick={() => handleReportClick(report.id)}
            />
          ))}
        </div>
      ) : (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Você ainda não fez nenhuma denúncia.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
