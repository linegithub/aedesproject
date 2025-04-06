import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Shield, AlertTriangle, MapPin, Database, ChevronRight, AlertCircle } from "lucide-react";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent -z-10"></div>
          <div
            className="absolute inset-0 -z-10 opacity-10"
            style={{
              backgroundImage: "url('https://via.placeholder.com/1200x800/E2F0E2/40C840?text=Mosquito+Background')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Monitoramento Colaborativo do{" "}
                  <span className="text-primary">Aedes Aegypti</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Juntos contra a dengue, zika e chikungunya. Participe do combate aos focos do mosquito em sua comunidade.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                {isAuthenticated ? (
                  <Button size="lg" asChild>
                    <Link to="/reports/new">
                      Denunciar Foco <AlertTriangle className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button size="lg" asChild>
                    <Link to="/login">
                      Fazer Login <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
                <Button size="lg" variant="outline" asChild>
                  <Link to="/map">
                    Ver Mapa <MapPin className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/public-data">
                    Dados Abertos <Database className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Como Funciona</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Uma plataforma completa para o combate ao mosquito
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  O sistema permite que cidadãos colaborem com autoridades para identificar e eliminar focos do Aedes Aegypti.
                </p>
              </div>
            </div>
            
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <AlertTriangle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Denúncias em Tempo Real</h3>
                <p className="text-muted-foreground text-center">
                  Envie fotos e localizações de focos do mosquito diretamente pelo sistema.
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Mapa Interativo</h3>
                <p className="text-muted-foreground text-center">
                  Visualize todas as denúncias em um mapa e acompanhe o status de cada foco.
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Autenticação Segura</h3>
                <p className="text-muted-foreground text-center">
                  Acesse o sistema com login e senha ou utilize QR Code para autenticação rápida.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Impacto</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Nossos números no combate à dengue
                </h2>
              </div>
            </div>
            
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4 lg:gap-12 mt-12">
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-4xl font-bold">250+</div>
                <div className="text-sm text-muted-foreground text-center">Denúncias realizadas</div>
              </div>
              
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-4xl font-bold">45+</div>
                <div className="text-sm text-muted-foreground text-center">Cidades atendidas</div>
              </div>
              
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-4xl font-bold">85%</div>
                <div className="text-sm text-muted-foreground text-center">Focos eliminados</div>
              </div>
              
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-4xl font-bold">1000+</div>
                <div className="text-sm text-muted-foreground text-center">Usuários cadastrados</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Information Section */}
        <section className="py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                    Informação
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                    Conheça o Aedes Aegypti
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    O mosquito Aedes aegypti é o principal vetor de transmissão da dengue, zika 
                    e chikungunya no Brasil. Ele se reproduz em água parada e limpa.
                  </p>
                </div>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <span>Mosquito de hábitos diurnos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <span>Pica principalmente no início da manhã e fim da tarde</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <span>Desenvolve-se em água parada e limpa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <span>Do ovo à fase adulta leva de 7 a 10 dias</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/login">
                    <Button size="lg">Denunciar Focos</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
                  <img
                    src="https://via.placeholder.com/600x400/E2F0E2/40C840?text=Aedes+Aegypti"
                    alt="Aedes Aegypti"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Faça parte desta rede de proteção
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  Cadastre-se agora e ajude a combater o Aedes Aegypti. Sua contribuição 
                  é fundamental para a saúde pública.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/login">Entrar no Sistema</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a
                    href="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dengue"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Saiba Mais
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
