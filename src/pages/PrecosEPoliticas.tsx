import { useEffect } from "react";
import { Header } from "@/components/Header";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { WhatsAppChat } from "@/components/WhatsAppChat";
import { JsonLdSchema } from "@/components/JsonLdSchema";
import { trackPageView } from "@/lib/analytics";
import { Check, AlertTriangle, Clock, Truck, CreditCard, FileText } from "lucide-react";

const PrecosEPoliticas = () => {
  useEffect(() => {
    document.title = "Preços e Políticas | Técnico Curitiba";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Consulte os preços dos serviços de informática em Curitiba. Visita técnica a partir de R$99,99. Conheça nossa política de diagnóstico, coleta e cancelamento."
      );
    }
    trackPageView("/precos-e-politicas", "Preços e Políticas");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <JsonLdSchema />
      <Header />
      <main>
        {/* Hero */}
        <section className="hero-gradient pt-24 pb-12 md:pt-28 md:pb-16">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-4">
                Preços e Políticas
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                Transparência total nos valores e condições de atendimento
              </p>
            </div>
          </div>
        </section>

        {/* Tabela de Preços */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Tabela de Preços Base
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full bg-secondary rounded-xl overflow-hidden">
                  <thead className="bg-primary text-primary-foreground">
                    <tr>
                      <th className="text-left p-4 font-semibold">Serviço</th>
                      <th className="text-left p-4 font-semibold">Valor Base</th>
                      <th className="text-left p-4 font-semibold">Observação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="p-4 font-medium">Visita Técnica Presencial</td>
                      <td className="p-4 text-accent font-bold">R$ 99,99 / 30 min</td>
                      <td className="p-4 text-muted-foreground text-sm">Cobrança proporcional ao tempo</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Formatação Completa</td>
                      <td className="p-4 text-accent font-bold">A partir de R$ 150</td>
                      <td className="p-4 text-muted-foreground text-sm">Windows + drivers + programas</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Remoção de Vírus</td>
                      <td className="p-4 text-accent font-bold">A partir de R$ 99,99</td>
                      <td className="p-4 text-muted-foreground text-sm">Limpeza completa + proteção</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Suporte Remoto</td>
                      <td className="p-4 text-accent font-bold">A partir de R$ 79,99</td>
                      <td className="p-4 text-muted-foreground text-sm">Atendimento imediato online</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Diagnóstico com Coleta</td>
                      <td className="p-4 text-accent font-bold">Até R$ 300*</td>
                      <td className="p-4 text-muted-foreground text-sm">*Valor máximo pré-aprovado</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Taxa de Diagnóstico</td>
                      <td className="p-4 text-accent font-bold">R$ 99,00</td>
                      <td className="p-4 text-muted-foreground text-sm">Aplicada em caso de desistência</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-muted-foreground mt-4 text-center">
                * Valores podem variar conforme complexidade. Orçamento sempre informado antes do serviço.
              </p>
            </div>
          </div>
        </section>

        {/* Políticas */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                Políticas de Atendimento
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Visita Técnica */}
                <div className="bg-background rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary rounded-lg p-2">
                      <Clock className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-primary">Visita Técnica Presencial</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Cobrança de R$ 99,99 a cada 30 minutos de atendimento</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Serviços rápidos (formatação, vírus) geralmente 30-60 min</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Tempo cronometrado a partir da chegada do técnico</span>
                    </li>
                  </ul>
                </div>

                {/* Coleta e Entrega */}
                <div className="bg-background rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary rounded-lg p-2">
                      <Truck className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-primary">Diagnóstico com Coleta</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Para reparos que exigem bancada ou peças específicas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Orçamento pré-aprovado de até R$ 300 em reparos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Coleta e entrega inclusas no valor do reparo</span>
                    </li>
                  </ul>
                </div>

                {/* Cancelamento */}
                <div className="bg-background rounded-xl p-6 border-2 border-accent/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-accent rounded-lg p-2">
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-primary">Política de Cancelamento</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-accent/10 rounded-lg p-4">
                      <p className="font-semibold text-foreground mb-2">Desistência após agendamento de coleta:</p>
                      <p className="text-muted-foreground">
                        Será cobrada taxa de diagnóstico de <strong className="text-accent">R$ 99,00</strong>, 
                        que inclui logística de coleta e entrega do equipamento.
                      </p>
                    </div>
                    <div className="bg-accent/10 rounded-lg p-4">
                      <p className="font-semibold text-foreground mb-2">Visita técnica presencial:</p>
                      <p className="text-muted-foreground">
                        Cobrança proporcional ao tempo decorrido 
                        (<strong className="text-accent">R$ 99,99 por cada 30 minutos</strong>).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pagamento */}
                <div className="bg-background rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary rounded-lg p-2">
                      <CreditCard className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-primary">Formas de Pagamento</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">PIX (pagamento imediato)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Dinheiro</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Cartão de crédito e débito</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Pagamento faturado (empresas)</span>
                    </li>
                  </ul>
                </div>

                {/* Nota Fiscal */}
                <div className="bg-background rounded-xl p-6 md:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary rounded-lg p-2">
                      <FileText className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-primary">Nota Fiscal e Garantia</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Emitimos nota fiscal de serviços para todos os atendimentos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Nota fiscal de produto para peças quando aplicável</span>
                      </li>
                    </ul>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Garantia por escrito em todos os serviços</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Peças seguem garantia do fabricante</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reparos Acima de R$300 */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                Reparos Acima de R$ 300
              </h2>
              <div className="bg-secondary rounded-xl p-6 md:p-8">
                <p className="text-muted-foreground mb-4">
                  Para serviços que ultrapassem o valor pré-aprovado de R$ 300:
                </p>
                <ol className="text-left space-y-3 max-w-xl mx-auto">
                  <li className="flex items-start gap-3">
                    <span className="bg-accent text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</span>
                    <span className="text-muted-foreground">Enviamos orçamento detalhado pelo WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-accent text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</span>
                    <span className="text-muted-foreground">Você analisa e autoriza por mensagem</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-accent text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">3</span>
                    <span className="text-muted-foreground">Informamos prazo estimado para conclusão</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-accent text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">4</span>
                    <span className="text-muted-foreground">Executamos somente após aprovação</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
      <WhatsAppChat />
    </div>
  );
};

export default PrecosEPoliticas;
