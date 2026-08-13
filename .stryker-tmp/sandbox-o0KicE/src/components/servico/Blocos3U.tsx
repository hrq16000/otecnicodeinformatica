// @ts-nocheck
import { SecaoBloco } from "@/components/servico/Blocos3T";
import { blocos3U } from "@/lib/blocos3u";

/**
 * Rodada 3U — renderiza os blocos editoriais próprios de cada página do
 * escopo (atendimento remoto, segurança dos dados e montagem de PC).
 * Camada de apresentação: reaproveita o renderizador da 3T e não
 * introduz preço, prazo, plano ou promessa de desempenho.
 */
export const Blocos3U = ({ path }: { path: string }) => {
  const cfg = blocos3U(path);
  if (!cfg) return null;
  return (
    <>
      {cfg.secoes.map((secao, i) => (
        <section
          key={secao.id}
          id={secao.id}
          className={`scroll-mt-24 py-14 md:py-16 ${i % 2 === 0 ? "bg-background" : "bg-secondary"}`}
        >
          <SecaoBloco secao={secao} />
        </section>
      ))}
    </>
  );
};

export default Blocos3U;
