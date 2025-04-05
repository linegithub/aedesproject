
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ReportForm } from "@/components/reports/report-form";

const NewReportPage = () => {
  const { isAuthenticated, loading } = useAuth();
  
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
    <div className="flex flex-col min-h-screen" onClick={(e) => e.stopPropagation()}>
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Nova Denúncia</h1>
          <p className="text-muted-foreground">
            Registre um novo foco do mosquito Aedes Aegypti
          </p>
        </div>
        
        <div className="flex justify-center">
          <ReportForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewReportPage;
