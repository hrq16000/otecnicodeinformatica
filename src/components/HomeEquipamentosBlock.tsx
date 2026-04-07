import { Link } from "react-router-dom";
import { Monitor, Laptop, Tv, HardDrive, Wifi, Server, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const equipamentos = [
  { icon: Monitor, nome: "Computadores Desktop", desc: "Montagem, upgrade, reparo e formatação" },
  { icon: Laptop, nome: "Notebooks", desc: "Conserto, troca de tela, teclado, SSD" },
  { icon: Tv, nome: "Smart TVs", desc: "Diagnóstico, configuração e reparo" },
  { icon: HardDrive, nome: "HDs e SSDs", desc: "Recuperação de dados, clonagem, upgrade" },
  { icon: Wifi, nome: "Redes e Roteadores", desc: "Configuração Wi-Fi, cabeamento, mesh" },
  { icon: Server, nome: "Servidores", desc: "Configuração, manutenção e suporte" },
];

export const HomeEquipamentosBlock = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-3">
              Equipamentos Que Atendemos
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Trabalhamos com uma ampla variedade de equipamentos. Cada tipo exige conhecimento específico e ferramentas adequadas.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
            {equipamentos.map((eq, i) => {
              const Icon = eq.icon;
              return (
                <div key={i} className="bg-secondary rounded-xl p-4 text-center border border-transparent hover:border-accent/15 hover:shadow-[var(--shadow-md)] hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 group">
                  <div className="bg-primary rounded-lg p-2 w-fit mx-auto mb-2 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-primary text-sm mb-1 group-hover:text-accent transition-colors duration-200">{eq.nome}</h3>
                  <p className="text-xs text-muted-foreground">{eq.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Button variant="outline" className="hover:scale-[1.03] transition-transform duration-200" asChild>
              <Link to="/servicos">
                Ver Todos os Serviços
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
