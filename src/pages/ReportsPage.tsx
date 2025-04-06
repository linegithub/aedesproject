
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { ReportsList } from "@/components/reports/reports-list";
import { ReportsSearch } from "@/components/reports/reports-search";
import { useAuth } from "@/hooks/use-auth";
import { getAllReports, MosquitoReport } from "@/services/report-service";

const ReportsPage = () => {
  const { isAuthenticated, loading } = useAuth();
  const [filteredReports, setFilteredReports] = useState<MosquitoReport[]>([]);
  const [hasFiltered, setHasFiltered] = useState(false);
  
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
  
  const handleSearch = (searchTerm: string, selectedDate: Date | undefined) => {
    const allReports = getAllReports();
    let filtered = allReports;

    // Filter by description
    if (searchTerm) {
      filtered = filtered.filter(report => 
        report.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date
    if (selectedDate) {
      filtered = filtered.filter(report => {
        const reportDate = new Date(report.createdAt);
        return (
          reportDate.getDate() === selectedDate.getDate() &&
          reportDate.getMonth() === selectedDate.getMonth() &&
          reportDate.getFullYear() === selectedDate.getFullYear()
        );
      });
    }

    setFilteredReports(filtered);
    setHasFiltered(searchTerm !== "" || selectedDate !== undefined);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Minhas Denúncias</h1>
            <p className="text-muted-foreground">
              Visualize e gerencie suas denúncias de focos do Aedes Aegypti
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
        
        <ReportsSearch onSearch={handleSearch} />
        <ReportsList reports={hasFiltered ? filteredReports : undefined} />
      </main>
      
      <Footer />
    </div>
  );
};

export default ReportsPage;
