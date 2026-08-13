// @ts-nocheck
import { SecaoBloco } from "@/components/servico/Blocos3T";
import { blocos4A } from "@/lib/blocos4a";

/**
 * Rodada 4A — blocos editoriais das páginas de TV/Smart TV e de reparo
 * de placas eletrônicas. Camada de apresentação: reaproveita o
 * renderizador da 3T e não introduz preço, prazo, taxa de sucesso nem
 * promessa universal de reparo.
 */
export const Blocos4A = ({ path }: { path: string }) => {
  const cfg = blocos4A(path);
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

export default Blocos4A;
