
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { MapPin, Upload, X, Edit2 } from "lucide-react";
import { createReport, uploadImage } from "@/services/report-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formSchema = z.object({
  address: z.string().min(5, { message: "Endereço muito curto" }),
  description: z.string().min(10, { message: "Forneça mais detalhes" }),
  image: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ReportForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCoordinatesDialogOpen, setIsCoordinatesDialogOpen] = useState(false);
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      description: "",
      image: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast.error("O arquivo deve ser uma imagem");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5MB");
      return;
    }
    
    form.setValue("image", file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const clearImage = () => {
    form.setValue("image", undefined);
    setImagePreview(null);
  };

  const getCurrentPosition = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocalização não suportada pelo seu navegador");
      return;
    }
    
    toast.info("Obtendo sua localização...");
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          // Em um app real, usaríamos um serviço de geocodificação reversa
          // para obter o endereço a partir das coordenadas
          const mockAddress = `Local próximo a ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
          
          form.setValue("address", mockAddress);
          toast.success("Localização obtida com sucesso!");
        } catch (error) {
          toast.error("Erro ao obter sua localização");
        }
      },
      (error) => {
        toast.error(`Erro ao obter sua localização: ${error.message}`);
      }
    );
  };
  
  const openCoordinatesDialog = () => {
    setIsCoordinatesDialogOpen(true);
  };
  
  const handleManualCoordinates = () => {
    try {
      const lat = parseFloat(manualLat);
      const lng = parseFloat(manualLng);
      
      if (isNaN(lat) || isNaN(lng)) {
        toast.error("Por favor, insira coordenadas válidas");
        return;
      }
      
      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        toast.error("Coordenadas fora dos limites válidos");
        return;
      }
      
      const mockAddress = `Local em ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      form.setValue("address", mockAddress);
      setIsCoordinatesDialogOpen(false);
      toast.success("Coordenadas inseridas com sucesso!");
    } catch (error) {
      toast.error("Erro ao processar coordenadas");
    }
  };

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      let imageUrl;
      
      if (values.image) {
        toast.info("Enviando imagem...");
        imageUrl = await uploadImage(values.image);
      }
      
      // Extrair coordenadas do endereço, se forem coordenadas inseridas manualmente
      let lat = -22.9068 + (Math.random() - 0.5) * 0.1;
      let lng = -43.1729 + (Math.random() - 0.5) * 0.1;
      
      // Tenta extrair as coordenadas do endereço, se for do formato "Local em X.XXXXX, Y.YYYYY"
      const coordsMatch = values.address.match(/Local (próximo a|em) (-?\d+\.\d+), (-?\d+\.\d+)/);
      if (coordsMatch) {
        lat = parseFloat(coordsMatch[2]);
        lng = parseFloat(coordsMatch[3]);
      }
      
      const report = await createReport(
        {
          lat,
          lng,
          address: values.address
        },
        values.description,
        imageUrl
      );
      
      if (report) {
        navigate(`/reports/${report.id}`);
      }
    } catch (error) {
      toast.error("Erro ao enviar denúncia");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle>Nova Denúncia</CardTitle>
          <CardDescription>
            Informe os detalhes sobre um possível foco do mosquito Aedes Aegypti
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localização</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="Endereço do foco" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={getCurrentPosition}
                        title="Usar localização atual"
                      >
                        <MapPin className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={openCoordinatesDialog}
                        title="Inserir coordenadas manualmente"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva o foco em detalhes (tipo de local, condições, etc.)"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Foto do Foco (opcional)</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        {imagePreview ? (
                          <div className="relative w-full h-48 bg-muted rounded-md overflow-hidden">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={clearImage}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center w-full h-32 bg-muted rounded-md border-2 border-dashed border-muted-foreground/50 p-4 relative">
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground text-center">
                              Arraste uma imagem ou clique para selecionar
                            </p>
                            <input
                              type="file"
                              accept="image/*"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              onChange={handleImageChange}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar Denúncia"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Dialog open={isCoordinatesDialogOpen} onOpenChange={setIsCoordinatesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inserir Coordenadas Manualmente</DialogTitle>
            <DialogDescription>
              Digite a latitude e longitude do local da denúncia.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="latitude" className="text-sm font-medium">
                Latitude (entre -90 e 90)
              </label>
              <Input
                id="latitude"
                value={manualLat}
                onChange={(e) => setManualLat(e.target.value)}
                placeholder="-22.9068"
                type="number"
                step="0.000001"
                min="-90"
                max="90"
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="longitude" className="text-sm font-medium">
                Longitude (entre -180 e 180)
              </label>
              <Input
                id="longitude"
                value={manualLng}
                onChange={(e) => setManualLng(e.target.value)}
                placeholder="-43.1729"
                type="number"
                step="0.000001"
                min="-180"
                max="180"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCoordinatesDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleManualCoordinates}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
