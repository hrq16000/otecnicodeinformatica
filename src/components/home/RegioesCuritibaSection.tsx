const REGIONAIS: { nome: string; bairros: string[] }[] = [
  { nome: "Centro e região central", bairros: ["Centro", "Centro Cívico", "São Francisco", "Alto da Glória", "Alto da XV", "Rebouças", "Prado Velho"] },
  { nome: "Matriz / Batel", bairros: ["Batel", "Água Verde", "Bigorrilho", "Mercês", "Campina do Siqueira", "Vila Izabel", "Seminário"] },
  { nome: "Norte", bairros: ["Juvevê", "Cabral", "Hugo Lange", "Jardim Social", "Bacacheri", "Bairro Alto", "Tingui", "Atuba", "Boa Vista"] },
  { nome: "Leste", bairros: ["Cristo Rei", "Jardim das Américas", "Cajuru", "Capão da Imbuia", "Uberaba", "Guabirotuba"] },
  { nome: "Sul", bairros: ["Portão", "Novo Mundo", "Fanny", "Lindóia", "Pinheirinho", "Xaxim", "Boqueirão", "Hauer", "Sítio Cercado"] },
  { nome: "Oeste e CIC", bairros: ["Campo Comprido", "Cidade Industrial (CIC)", "Fazendinha", "Santa Quitéria", "Vista Alegre", "Santa Felicidade", "Butiatuvinha"] },
];

const COM_PAGINA: Record<string, string> = {
  Centro: "/bairros/centro",
  Batel: "/bairros/batel",
  "Água Verde": "/bairros/agua-verde",
  Portão: "/bairros/portao",
  "Cidade Industrial (CIC)": "/bairros/cic",
};

const REGIAO = [
  "São José dos Pinhais",
  "Pinhais",
  "Colombo",
  "Araucária",
  "Campo Largo",
  "Almirante Tamandaré",
  "Fazenda Rio Grande",
  "Piraquara",
  "Quatro Barras",
];

/**
 * Cobertura por regiões e bairros de Curitiba + Região Metropolitana.
 * Modelo Service Area Business: nenhum endereço, CEP ou unidade física.
 */
export const RegioesCuritibaSection = () => (
  <section className="border-y border-border bg-secondary py-14 md:py-18" aria-labelledby="regioes-title">
    <div className="container mx-auto">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-accent">Cobertura</span>
        <h2 id="regioes-title" className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Regiões e bairros atendidos em Curitiba
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Atendimento por agendamento em toda Curitiba e na Região Metropolitana — no seu endereço, remoto ou com
          coleta e entrega para reparo em bancada.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {REGIONAIS.map((r) => (
          <div key={r.nome} className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-heading text-base font-bold text-foreground">{r.nome}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {r.bairros.map((b) => {
                const href = COM_PAGINA[b];
                return (
                  <li key={b}>
                    {href ? (
                      <a
                        href={href}
                        className="inline-block rounded-full border border-accent/40 bg-background px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
                      >
                        {b}
                      </a>
                    ) : (
                      <span className="inline-block rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                        {b}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-border bg-card p-5">
        <h3 className="font-heading text-base font-bold text-foreground">Região Metropolitana</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {REGIAO.map((c) => (
            <li key={c}>
              <span className="inline-block rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                {c}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          Não encontrou seu bairro? A cobertura é por área de atendimento — confirme a disponibilidade na triagem.{" "}
          <a href="/areas-atendidas" className="font-semibold text-foreground underline underline-offset-4 hover:text-accent">
            Ver todas as áreas atendidas
          </a>
        </p>
      </div>
    </div>
  </section>
);

export default RegioesCuritibaSection;
