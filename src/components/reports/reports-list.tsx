
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReportCard } from "@/components/reports/report-card";
import { getAllReports, MosquitoReport } from "@/services/report-service";

interface ReportsListProps {
  reports?: MosquitoReport[];
}

export function ReportsList({ reports: propReports }: ReportsListProps) {
  const [reports, setReports] = useState<MosquitoReport[]>([]);
  
  useEffect(() => {
    // If reports are provided via props, use them, otherwise fetch all reports
    if (propReports) {
      setReports(propReports);
    } else {
      setReports(getAllReports());
    }
  }, [propReports]);

  if (reports.length === 0) {
    return (
      <div className="text-center py-12 border rounded-md bg-muted/30">
        <h3 className="text-lg font-medium mb-2">Nenhuma denúncia encontrada</h3>
        <p className="text-muted-foreground mb-4">
          Você ainda não realizou denúncias ou não há resultados para os filtros selecionados.
        </p>
        <Link 
          to="/reports/new" 
          className="text-primary hover:text-primary/80 font-medium"
        >
          Criar uma nova denúncia
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {reports.map((report) => (
        <Link to={`/reports/${report.id}`} key={report.id}>
          <ReportCard report={report} />
        </Link>
      ))}
    </div>
  );
}
