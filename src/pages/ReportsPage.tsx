
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { ReportsList } from "@/components/reports/reports-list";
import { useAuth } from "@/hooks/use-auth";

const ReportsPage = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Denúncias</h1>
            <p className="text-muted-foreground">
              Visualize e gerencie as denúncias de focos do Aedes Aegypti
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
        
        <ReportsList />
      </main>
      
      <Footer />
    </div>
  );
};

export default ReportsPage;
