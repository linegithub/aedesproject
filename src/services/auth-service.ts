
import { toast } from "sonner";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Simulando armazenamento de usuários (em um app real, isso seria no backend)
let users: User[] = [
  {
    id: "1",
    name: "Usuário Teste",
    email: "teste@example.com",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix"
  }
];

// Estado inicial
const initialState: AuthState = {
  user: null,
  isAuthenticated: false
};

// Recuperar estado da sessão
const getStoredState = (): AuthState => {
  const storedUser = localStorage.getItem("mosquito-alert-user");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    return {
      user,
      isAuthenticated: true
    };
  }
  return initialState;
};

// Salvar estado da sessão
const saveState = (state: AuthState): void => {
  if (state.user) {
    localStorage.setItem("mosquito-alert-user", JSON.stringify(state.user));
  } else {
    localStorage.removeItem("mosquito-alert-user");
  }
};

// Estado atual
let currentState = getStoredState();

// Assinantes para mudanças de estado
let subscribers: ((state: AuthState) => void)[] = [];

// Notificar assinantes
const notifySubscribers = () => {
  subscribers.forEach(callback => callback(currentState));
};

// Registrar um usuário
export const register = async (name: string, email: string, password: string): Promise<boolean> => {
  // Verificar se o email já está em uso
  if (users.some(u => u.email === email)) {
    toast.error("Este email já está em uso.");
    return false;
  }

  const newUser: User = {
    id: `${users.length + 1}`,
    name,
    email,
    avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}`
  };

  // Em um app real, enviaríamos a senha para o backend
  users.push(newUser);
  
  // Login automático após registro
  currentState = {
    user: newUser,
    isAuthenticated: true
  };
  saveState(currentState);
  notifySubscribers();
  
  toast.success("Conta criada com sucesso!");
  return true;
};

// Login de usuário
export const login = async (email: string, password: string): Promise<boolean> => {
  // Em um app real, verificaríamos a senha no backend
  const user = users.find(u => u.email === email);
  
  if (!user) {
    toast.error("Credenciais inválidas.");
    return false;
  }

  currentState = {
    user,
    isAuthenticated: true
  };
  saveState(currentState);
  notifySubscribers();
  
  toast.success("Login realizado com sucesso!");
  return true;
};

// Login com QR code
export const loginWithQRCode = async (token: string): Promise<boolean> => {
  // Simulação - em um app real, validaríamos o token no backend
  if (token && token.length > 0) {
    // Para demonstração, usamos o primeiro usuário
    const user = users[0];
    
    currentState = {
      user,
      isAuthenticated: true
    };
    saveState(currentState);
    notifySubscribers();
    
    toast.success("Login com QR Code realizado com sucesso!");
    return true;
  }
  
  toast.error("QR Code inválido.");
  return false;
};

// Logout
export const logout = (): void => {
  currentState = initialState;
  saveState(currentState);
  notifySubscribers();
  toast.info("Você saiu do sistema.");
};

// Verificar se está autenticado
export const isAuthenticated = (): boolean => {
  return currentState.isAuthenticated;
};

// Obter usuário atual
export const getCurrentUser = (): User | null => {
  return currentState.user;
};

// Assinar mudanças de estado
export const subscribe = (callback: (state: AuthState) => void): () => void => {
  subscribers.push(callback);
  callback(currentState); // Chamar imediatamente com o estado atual
  
  // Retornar função para cancelar a assinatura
  return () => {
    subscribers = subscribers.filter(cb => cb !== callback);
  };
};
