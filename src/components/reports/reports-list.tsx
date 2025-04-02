
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MosquitoReport, subscribe, getAllReports, getUserReports } from "@/services/report-service";
import { ReportCard } from "./report-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function ReportsList() {
  const [allReports, setAllReports] = useState<MosquitoReport[]>([]);
  const [userReports, setUserReports] = useState<MosquitoReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Carregar denúncias iniciais
    setAllReports(getAllReports());
    setUserReports(getUserReports());
    setIsLoading(false);
    
    // Assinar mudanças nas denúncias
    const unsubscribe = subscribe(() => {
      setAllReports(getAllReports());
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
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="w-full grid grid-cols-2 mb-6">
        <TabsTrigger value="all">Todas as Denúncias</TabsTrigger>
        <TabsTrigger value="user">Minhas Denúncias</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        {allReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allReports.map((report) => (
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
              Não há denúncias registradas ainda.
            </AlertDescription>
          </Alert>
        )}
      </TabsContent>
      
      <TabsContent value="user">
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
      </TabsContent>
    </Tabs>
  );
}
