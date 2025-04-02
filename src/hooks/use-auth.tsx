
import { useEffect, useState } from "react";
import { User, subscribe, getCurrentUser, isAuthenticated } from "@/services/auth-service";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true
  });

  useEffect(() => {
    // Carregar estado inicial
    setAuthState({
      user: getCurrentUser(),
      isAuthenticated: isAuthenticated(),
      loading: false
    });

    // Assinar mudanças de estado
    const unsubscribe = subscribe((state) => {
      setAuthState({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: false
      });
    });

    // Cancelar assinatura ao desmontar
    return unsubscribe;
  }, []);

  return authState;
}
