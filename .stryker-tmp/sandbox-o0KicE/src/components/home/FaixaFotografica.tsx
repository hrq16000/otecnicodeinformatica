// @ts-nocheck
import { FotoLicenciadaImg } from "@/components/FotoLicenciadaImg";
import { FOTOS_LICENCIADAS } from "@/lib/fotosLicenciadas";

const DESTAQUES = [
  { slug: "bancada-tecnica", legenda: "Diagnóstico começa com o equipamento aberto e o defeito confirmado." },
  { slug: "rede-cabeamento", legenda: "Wi-Fi instável: quase sempre é cabo, energia ou posicionamento — não o plano de internet." },
  { slug: "estacao-trabalho", legenda: "Estação parada é produtividade parada — prioridade em atendimento a empresas." },
];

/**
 * Faixa de fotografia REAL licenciada (Etapa 10). Sem imagem de IA e sem
 * ilustração imitando foto. Se o manifesto estiver vazio, a seção some.
 */
export const FaixaFotografica = () => {
  if (FOTOS_LICENCIADAS.length === 0) return null;

  return (
    <section className="border-b border-border py-12 md:py-16" aria-labelledby="faixa-fotos-h2">
      <div className="container mx-auto">
        <header className="max-w-2xl">
          <h2
            id="faixa-fotos-h2"
            className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl"
          >
            Como o trabalho técnico acontece
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Fotografias reais, com licença e crédito ao autor. Nada aqui é imagem gerada por
            computador — o que você vê é o tipo de cenário em que o serviço é executado.
          </p>
        </header>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {DESTAQUES.map((d) => (
            <FotoLicenciadaImg key={d.slug} slug={d.slug} legenda={d.legenda} />
          ))}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          <a href="/creditos-de-imagens" className="underline">
            Ver créditos e licenças de todas as fotos
          </a>
        </p>
      </div>
    </section>
  );
};
