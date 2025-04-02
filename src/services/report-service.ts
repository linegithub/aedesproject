
import { toast } from "sonner";
import { getCurrentUser } from "./auth-service";

export interface MosquitoReport {
  id: string;
  userId: string;
  userName: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  description: string;
  imageUrl?: string;
  status: "pending" | "verified" | "eliminated";
  createdAt: Date;
}

// Simulando banco de dados (em um app real, isso seria no backend)
let reports: MosquitoReport[] = [
  {
    id: "1",
    userId: "1",
    userName: "Usuário Teste",
    location: {
      lat: -22.9068,
      lng: -43.1729,
      address: "Rio de Janeiro, RJ, Brasil"
    },
    description: "Água parada em um pneu abandonado",
    imageUrl: "https://via.placeholder.com/300/40C840/FFFFFF?text=Foco+Dengue",
    status: "pending",
    createdAt: new Date(2023, 9, 15)
  },
  {
    id: "2",
    userId: "1",
    userName: "Usuário Teste",
    location: {
      lat: -23.5505,
      lng: -46.6333,
      address: "São Paulo, SP, Brasil"
    },
    description: "Recipientes destampados com água parada",
    imageUrl: "https://via.placeholder.com/300/40C840/FFFFFF?text=Foco+Dengue",
    status: "verified",
    createdAt: new Date(2023, 10, 5)
  }
];

// Assinantes para mudanças de dados
let subscribers: (() => void)[] = [];

// Notificar assinantes
const notifySubscribers = () => {
  subscribers.forEach(callback => callback());
};

// Criar uma nova denúncia
export const createReport = async (
  location: { lat: number; lng: number; address: string },
  description: string,
  imageUrl?: string
): Promise<MosquitoReport | null> => {
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    toast.error("Você precisa estar logado para enviar uma denúncia.");
    return null;
  }

  const newReport: MosquitoReport = {
    id: `${Date.now()}`,
    userId: currentUser.id,
    userName: currentUser.name,
    location,
    description,
    imageUrl,
    status: "pending",
    createdAt: new Date()
  };

  reports = [...reports, newReport];
  notifySubscribers();
  
  toast.success("Denúncia enviada com sucesso!");
  return newReport;
};

// Obter todas as denúncias
export const getAllReports = (): MosquitoReport[] => {
  return [...reports].sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  );
};

// Obter denúncias do usuário atual
export const getUserReports = (): MosquitoReport[] => {
  const currentUser = getCurrentUser();
  
  if (!currentUser) return [];
  
  return [...reports]
    .filter(report => report.userId === currentUser.id)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

// Obter uma denúncia por ID
export const getReportById = (id: string): MosquitoReport | undefined => {
  return reports.find(report => report.id === id);
};

// Assinar mudanças de dados
export const subscribe = (callback: () => void): () => void => {
  subscribers.push(callback);
  
  // Retornar função para cancelar a assinatura
  return () => {
    subscribers = subscribers.filter(cb => cb !== callback);
  };
};

// Simular upload de imagem (em um app real, isso enviaria para um serviço de armazenamento)
export const uploadImage = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    // Simular delay de upload
    setTimeout(() => {
      const mockImageUrl = `https://via.placeholder.com/300/40C840/FFFFFF?text=Foco+${Date.now()}`;
      resolve(mockImageUrl);
    }, 1500);
  });
};

// Gerar um código QR simulado
export const generateQRCode = (): string => {
  return "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=mosquito-alert-login-" + Date.now();
};
