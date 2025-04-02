
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/services/auth-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { QrCode } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

type FormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
  onRegisterClick: () => void;
  onQrCodeClick: () => void;
}

export function LoginForm({ onSuccess, onRegisterClick, onQrCodeClick }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      const success = await login(values.email, values.password);
      if (success) {
        if (onSuccess) {
          onSuccess();
        } else {
          navigate("/dashboard");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md p-6 space-y-6 bg-card rounded-xl shadow-lg glassmorphism">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Entrar</h2>
        <p className="text-sm text-muted-foreground">
          Entre com seu email e senha para acessar o sistema
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="seu@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Form>
      
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-t" />
        <span className="text-xs text-muted-foreground">OU</span>
        <hr className="flex-1 border-t" />
      </div>
      
      <Button
        variant="outline"
        className="w-full"
        onClick={onQrCodeClick}
      >
        <QrCode className="mr-2 h-4 w-4" />
        Entrar com QR Code
      </Button>
      
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Não tem uma conta? </span>
        <Button variant="link" className="p-0" onClick={onRegisterClick}>
          Criar conta
        </Button>
      </div>
    </div>
  );
}
