
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Search, Download, FileJson, FileCsv } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getAllReports, MosquitoReport } from "@/services/report-service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PublicDataPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [reports, setReports] = useState<MosquitoReport[]>(getAllReports());

  const handleSearch = () => {
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

    setReports(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDate(undefined);
    setReports(getAllReports());
  };

  // Function to download data as JSON
  const downloadAsJSON = () => {
    // Prepare data for export - removing sensitive information
    const exportData = reports.map(report => ({
      id: report.id,
      location: {
        lat: report.location.lat,
        lng: report.location.lng,
        address: report.location.address
      },
      description: report.description,
      status: report.status,
      createdAt: format(new Date(report.createdAt), "yyyy-MM-dd")
    }));

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `dados-dengue-${format(new Date(), "yyyy-MM-dd")}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Function to download data as CSV
  const downloadAsCSV = () => {
    // Prepare data for export - removing sensitive information
    const exportData = reports.map(report => ({
      id: report.id,
      latitude: report.location.lat,
      longitude: report.location.lng,
      endereco: report.location.address,
      descricao: report.description,
      status: report.status === "pending" ? "Pendente" : report.status === "verified" ? "Verificado" : "Eliminado",
      data: format(new Date(report.createdAt), "dd/MM/yyyy")
    }));

    // Create CSV headers
    const headers = ["ID", "Latitude", "Longitude", "Endereço", "Descrição", "Status", "Data"];
    
    // Create CSV rows
    const csvRows = [
      headers.join(","),
      ...exportData.map(row => [
        row.id,
        row.latitude,
        row.longitude,
        `"${row.endereco.replace(/"/g, '""')}"`,
        `"${row.descricao.replace(/"/g, '""')}"`,
        row.status,
        row.data
      ].join(","))
    ];

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `dados-dengue-${format(new Date(), "yyyy-MM-dd")}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dados para Pesquisa</h1>
          <p className="text-muted-foreground">
            Acesso aos dados anônimos de denúncias para estudos e pesquisas sobre o Aedes Aegypti
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Filtrar Dados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Pesquisar por descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto justify-start">
                    {selectedDate ? (
                      format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                    ) : (
                      "Selecionar data"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" />
                Pesquisar
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                Limpar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Resultados ({reports.length})</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={downloadAsCSV}>
                <FileCsv className="mr-2 h-4 w-4" />
                CSV
              </Button>
              <Button variant="outline" size="sm" onClick={downloadAsJSON}>
                <FileJson className="mr-2 h-4 w-4" />
                JSON
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => {
                    const statusMap: Record<string, string> = {
                      pending: "Pendente",
                      verified: "Verificado",
                      eliminated: "Eliminado"
                    };

                    return (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>
                          {report.location.address}<br/>
                          <span className="text-xs text-muted-foreground">
                            {report.location.lat.toFixed(6)}, {report.location.lng.toFixed(6)}
                          </span>
                        </TableCell>
                        <TableCell>{report.description}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                            ${report.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
                            ${report.status === "verified" ? "bg-blue-100 text-blue-800" : ""}
                            ${report.status === "eliminated" ? "bg-green-100 text-green-800" : ""}
                          `}>
                            {statusMap[report.status]}
                          </span>
                        </TableCell>
                        <TableCell>
                          {format(new Date(report.createdAt), "dd/MM/yyyy", { locale: ptBR })}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {reports.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        Nenhum resultado encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicDataPage;
