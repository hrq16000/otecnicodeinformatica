import { useEffect } from "react";
import { PageSEO } from "@/components/PageSEO";
import { ServiceLandingSchema } from "@/components/ServiceLandingSchema";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Refrigerator, MessageCircle, CalendarCheck, CheckCircle, Wifi, Shield, ArrowRight } from "lucide-react";
import { trackPageView, trackCTAClick } from "@/lib/analytics";
import { WHATSAPP_NUMBER as WA_NUMBER } from "@/lib/siteConfig";

const WHATSAPP = WA_NUMBER;
const PATH = "/assistencia-eletrodomesticos-inteligentes-curitiba";

const TITLE = "Assistência Eletrodomésticos Inteligentes em Curitiba | Smart Home";
const DESC =
  "Configuração, conserto e integração de eletrodomésticos inteligentes em Curitiba: geladeira, lava-louça, fogão, ar-condicionado e robôs Wi-Fi. Alexa, Google Home, SmartThings. Atendimento conforme a agenda.";

const FAQS = [
  { question: "O que são eletrodomésticos inteligentes?", answer: "São aparelhos com Wi-Fi/Bluetooth que se conectam a apps no celular e a assistentes como Alexa, Google Home e SmartThings. Ex.: geladeiras com câmera interna, ares-condicionados controlados por voz, máquinas de lavar com programa remoto, robôs aspiradores e fogões inteligentes." },
  { question: "Quanto custa configurar um eletrodoméstico inteligente em Curitiba?", answer: "A visita técnica para configuração começa em R$ 129,99 e inclui pareamento, integração com Alexa/Google Home, ajuste de Wi-Fi e treinamento de uso. Conserto de placa eletrônica varia conforme modelo, sempre com valor prévio." },
  { question: "Atendem aparelhos de qual marca?", answer: "Samsung (SmartThings), LG (ThinQ), Electrolux, Brastemp, Consul, Midea, Philco, Mondial, Xiaomi, Roborock, iRobot Roomba, Britânia, Multilaser e Positivo Casa Inteligente. Geladeira, máquina de lavar, lava-louça, micro-ondas, fogão, coifa, ar-condicionado, robô aspirador, fritadeira air fryer e cafeteira Wi-Fi." },
  { question: "Meu eletrodoméstico inteligente perdeu o Wi-Fi, dá para arrumar?", answer: "Sim. Na maioria dos casos é roteador trocado, mudança de senha ou banda dual incompatível (alguns aparelhos exigem 2.4GHz separada). Reconfiguramos a rede e o app em até 1 hora, a partir de R$ 99,99." },
  { question: "Vocês integram tudo no Alexa ou Google Home?", answer: "Sim. Criamos as rotinas (\"Alexa, modo cinema\", \"Ok Google, bom dia\"), agrupamos cômodos, configuramos automações por horário e por sensores, e treinamos a família a usar — tudo em uma visita só." },
  { question: "Vocês instalam placa eletrônica de geladeira/máquina inteligente?", answer: "Sim, com peças originais ou compatíveis homologadas. Em geladeiras frost free com inverter e telas digitais o conserto exige diagnóstico com multímetro e leitura de erros via app — temos a ferramenta certa." },
];

const AssistenciaEletrodomesticosInteligentesCuritiba = () => {
  useEffect(() => {
    document.title = TITLE;
    trackPageView(PATH, "Eletrodomésticos Inteligentes Curitiba");
  }, []);

  const waClick = () => {
    trackCTAClick("whatsapp", "eletrodomesticos-inteligentes");
    const msg = encodeURIComponent("Olá! Preciso de ajuda com meu eletrodoméstico inteligente em Curitiba.");
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
  };
  const callClick = () => {
    trackCTAClick("whatsapp", "eletrodomesticos-inteligentes-agendar");
    const msg = encodeURIComponent("Olá! Quero agendar atendimento para eletrodoméstico inteligente em Curitiba.");
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={TITLE}
        description={DESC}
        path={PATH}
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Eletrodomésticos Inteligentes", path: PATH },
        ]}
      />
      <ServiceLandingSchema
        serviceName="Assistência de Eletrodomésticos Inteligentes"
        description={DESC}
        path={PATH}
        priceFrom={129.99}
        category="Smart Home / IoT"
        faqs={FAQS}
      />
      <Header />
      <Breadcrumbs items={[{ label: "Eletrodomésticos Inteligentes" }]} />

      <section className="pt-14 pb-12 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full mb-6">
            <Wifi className="w-5 h-5" /> <span className="font-medium">Smart Home · Curitiba</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Assistência para Eletrodomésticos Inteligentes em Curitiba
          </h1>
          <p className="tldr text-xl text-white/90 max-w-3xl mx-auto mb-8" data-speakable="true">
            Configuração, conserto e integração de <strong>geladeiras, ares-condicionados,
            máquinas de lavar, robôs aspiradores e fogões Wi-Fi</strong> em Curitiba e
            região, a partir de <strong>R$ 129,99</strong>. Integração com Alexa, Google
            Home e SmartThings, atendimento domiciliar conforme a disponibilidade da agenda.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={waClick} className="bg-[#25D366] hover:bg-[#128C7E] text-white">
              <MessageCircle className="mr-2 w-5 h-5" /> WhatsApp agora
            </Button>
            <Button size="lg" variant="outline" onClick={callClick} className="bg-white text-primary hover:bg-white/90">
              <CalendarCheck className="mr-2 w-5 h-5" /> Agendar no WhatsApp
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 bg-accent/10 border-y border-accent/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl font-bold text-primary">
            Visita técnica + configuração a partir de <span className="text-accent">R$ 129,99</span>
          </p>
          <p className="text-muted-foreground mt-2">Garantia de 90 dias · atendimento sem compromisso · Atendimento conforme a agenda</p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-8">O que fazemos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { t: "Configuração inicial de Wi-Fi", d: "Pareamento no app oficial (SmartThings, ThinQ, Mi Home) e integração de rede." },
              { t: "Integração com Alexa e Google Home", d: "Comandos de voz, rotinas e automações por horário/sensor." },
              { t: "Conserto de placa eletrônica", d: "Diagnóstico, troca de componentes e atualização de firmware." },
              { t: "Robô aspirador travado", d: "Limpeza de sensores, troca de bateria e remapeamento da casa." },
              { t: "Ar-condicionado Wi-Fi com erro", d: "Reset de módulo, atualização de firmware e nova configuração no app." },
              { t: "Geladeira frost free com display", d: "Leitura de erros, troca de sensor e ajuste de temperatura via app." },
            ].map((p) => (
              <div key={p.t} className="p-5 rounded-xl border bg-card hover:shadow-md transition">
                <CheckCircle className="w-6 h-6 text-accent mb-2" />
                <h3 className="font-bold text-primary mb-1">{p.t}</h3>
                <p className="text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-8">Marcas e ecossistemas atendidos</h2>
          <div className="max-w-3xl mx-auto overflow-x-auto rounded-xl border bg-card">
            <table className="w-full text-sm" data-speakable="true">
              <thead className="bg-muted">
                <tr><th className="text-left p-3">Ecossistema</th><th className="text-left p-3">Marcas/Apps</th></tr>
              </thead>
              <tbody>
                {[
                  ["Samsung SmartThings", "Geladeira, lava-louça, lava e seca, micro-ondas, ar"],
                  ["LG ThinQ", "Geladeira, máquina de lavar, ar-condicionado, micro-ondas"],
                  ["Electrolux Home+", "Geladeira, lava-louça, fogão, coifa"],
                  ["Midea/Comfee Smart", "Ar-condicionado, ventilador, purificador"],
                  ["Xiaomi Mi Home", "Robô aspirador, ar, ventilador, balança, câmeras"],
                  ["Positivo Casa Inteligente", "Tomada, lâmpada, sensor, fechadura, câmera"],
                  ["Amazon Alexa / Google Home", "Integração universal e criação de rotinas"],
                ].map(([e, m]) => (
                  <tr key={e} className="border-t"><td className="p-3 font-semibold text-primary">{e}</td><td className="p-3">{m}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-8">Por que contratar a Técnico Curitiba</h2>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { i: <Refrigerator className="w-7 h-7 text-accent" />, t: "Especialistas em IoT", d: "Diagnóstico técnico real, não \"reinstala o app\"." },
              { i: <Shield className="w-7 h-7 text-accent" />, t: "Garantia de 90 dias", d: "Em serviços e peças, formalizada por escrito." },
              { i: <CheckCircle className="w-7 h-7 text-accent" />, t: "Valor antes", d: "Você só paga se aprovar. Sem taxa surpresa." },
            ].map((b) => (
              <div key={b.t} className="text-center p-6 rounded-xl border bg-card">
                <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">{b.i}</div>
                <h3 className="font-bold mb-1">{b.t}</h3>
                <p className="text-sm text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-8">Perguntas Frequentes</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((f) => (
              <details key={f.question} className="group bg-background rounded-xl border p-5">
                <summary className="cursor-pointer font-semibold text-foreground flex justify-between items-center">
                  {f.question}
                  <ArrowRight className="w-4 h-4 transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-muted-foreground">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">Seu eletrodoméstico inteligente parou de funcionar?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Atendemos conforme a disponibilidade da agenda em toda Curitiba e região. Diagnóstico real, conserto com garantia.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={waClick} className="bg-[#25D366] hover:bg-[#128C7E] text-white">
              <MessageCircle className="mr-2 w-5 h-5" /> Falar no WhatsApp
            </Button>
            <Button size="lg" variant="outline" onClick={callClick} className="bg-white text-primary hover:bg-white/90">
              <CalendarCheck className="mr-2 w-5 h-5" /> Agendar no WhatsApp
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AssistenciaEletrodomesticosInteligentesCuritiba;
