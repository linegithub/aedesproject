
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { UsersRound } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <UsersRound className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Sobre Nós</h1>
          </div>
          
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-lg text-muted-foreground">
              Este projeto, intitulado Sistema Web de Monitoramento e Combate ao Aedes aegypti, foi desenvolvido como parte das atividades do Projeto Integrador III (PI3), conforme as diretrizes do Plano de Ensino da Universidade Virtual do Estado de São Paulo (Univesp). A proposta foi construída ao longo do primeiro semestre de 2025 e reflete o compromisso acadêmico com a aplicação prática dos conhecimentos adquiridos ao longo da graduação.
            </p>
            
            <p className="text-lg text-muted-foreground mt-6">
              A equipe é composta por estudantes do Eixo de Computação, que integra os cursos de Tecnologia da Informação, Ciência de Dados e Engenharia da Computação, com representantes dos polos de Cajati, Iguape, Itariri e Santos. Apesar da distância geográfica entre os membros, o trabalho foi realizado de forma colaborativa, utilizando ferramentas digitais para comunicação, organização e desenvolvimento.
            </p>
            
            <p className="text-lg text-muted-foreground mt-6">
              Mais do que uma entrega acadêmica, este trabalho representa o esforço conjunto de alunos engajados com a transformação social por meio da tecnologia, visando a melhoria da saúde pública em regiões vulneráveis.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
