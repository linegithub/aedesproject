
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MosquitoReport } from "@/services/report-service";
import { MapPin, Calendar, User } from "lucide-react";

interface ReportCardProps {
  report: MosquitoReport;
  onClick?: () => void;
}

export function ReportCard({ report, onClick }: ReportCardProps) {
  const getStatusBadge = () => {
    switch (report.status) {
      case "pending":
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Pendente</Badge>;
      case "verified":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Verificado</Badge>;
      case "eliminated":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Eliminado</Badge>;
    }
  };

  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-md cursor-pointer"
      onClick={onClick}
    >
      {report.imageUrl && (
        <div className="w-full h-40 overflow-hidden">
          <img
            src={report.imageUrl}
            alt="Foco do mosquito"
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between">
        <div className="space-y-1">
          <p className="font-medium line-clamp-1">{report.description}</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-3 w-3" />
            <span className="line-clamp-1">{report.location.address}</span>
          </div>
        </div>
        {getStatusBadge()}
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center">
            <User className="mr-1 h-3 w-3" />
            <span>{report.userName}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            <span>{format(report.createdAt, "PPP", { locale: ptBR })}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
