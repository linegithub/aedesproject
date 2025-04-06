
import { useState } from "react";
import { Search } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReportsSearchProps {
  onSearch: (searchTerm: string, selectedDate: Date | undefined) => void;
}

export function ReportsSearch({ onSearch }: ReportsSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleSearch = () => {
    onSearch(searchTerm, selectedDate);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDate(undefined);
    onSearch("", undefined);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl">Filtrar Denúncias</CardTitle>
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
  );
}
