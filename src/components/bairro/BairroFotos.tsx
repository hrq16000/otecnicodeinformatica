import { Camera } from "lucide-react";
import { SmartImage } from "@/components/SmartImage";
import { galeriaDoBairro, fotoTecnicaDoBairro } from "@/lib/galeriaBairro";

/**
 * Seção fotográfica da página de bairro.
 *
 * - Se existir atendimento real fotografado e autorizado naquele bairro,
 *   renderiza a galeria (fonte: config/galeria-atendimentos-bairro.json).
 * - Caso contrário, exibe UMA fotografia técnica licenciada (CC) com crédito,
 *   descrita como ilustração do tipo de trabalho — nunca como registro local.
 *
 * Toda imagem carrega width/height reais (CLS 0) e alt descritivo.
 */
export const BairroFotos = ({
  slug,
  nome,
  servicosPrioritarios,
}: {
  slug: string;
  nome: string;
  servicosPrioritarios: string[];
}) => {
  const galeria = galeriaDoBairro(slug);

  if (galeria.length > 0) {
    return (
      <section className="container mx-auto py-10 md:py-14" aria-labelledby="fotos-atendimentos">
        <h2
          id="fotos-atendimentos"
          className="mb-2 text-2xl font-heading font-bold text-foreground md:text-3xl"
        >
          Atendimentos realizados {nome ? `em ${nome}` : ""}
        </h2>
        <p className="mb-6 max-w-2xl text-muted-foreground">
          Registros dos próprios atendimentos, publicados com autorização e sem dados pessoais
          visíveis nas telas ou etiquetas.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galeria.map((item) => (
            <figure key={item.src} className="overflow-hidden rounded-xl border border-border/60 bg-card">
              <SmartImage
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                wrapperClassName="aspect-[4/3] overflow-hidden"
                className="h-full w-full object-cover"
              />
              <figcaption className="p-4 text-sm text-muted-foreground">{item.legenda}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  const foto = fotoTecnicaDoBairro(servicosPrioritarios);
  if (!foto) return null;

  return (
    <section className="container mx-auto py-10 md:py-14" aria-labelledby="foto-tecnica">
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <figure className="overflow-hidden rounded-xl border border-border/60 bg-card">
          <SmartImage
            src={foto.src}
            alt={foto.alt}
            width={foto.width}
            height={foto.height}
            wrapperClassName="aspect-[16/10] overflow-hidden"
            className="h-full w-full object-cover"
          />
          <figcaption className="p-3 text-xs text-muted-foreground">
            Foto:{" "}
            <a href={foto.autorUrl} rel="nofollow noopener noreferrer" target="_blank" className="underline">
              {foto.autor}
            </a>{" "}
            ·{" "}
            <a href={foto.licencaUrl} rel="nofollow noopener noreferrer" target="_blank" className="underline">
              {foto.licenca}
            </a>{" "}
            — imagem ilustrativa do tipo de serviço, não é registro deste atendimento.
          </figcaption>
        </figure>
        <div>
          <h2
            id="foto-tecnica"
            className="text-2xl font-heading font-bold text-foreground md:text-3xl"
          >
            Como o trabalho aparece na prática
          </h2>
          <p className="mt-4 text-muted-foreground">
            O atendimento {nome ? `em ${nome}` : "local"} começa pela triagem no WhatsApp e termina
            com o equipamento testado na sua frente ou devolvido depois da bancada. A fotografia ao
            lado mostra o tipo de intervenção mais comum nesse recorte da cidade.
          </p>
          <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
            <Camera className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <span>
              Fotos dos próprios atendimentos entram aqui apenas com autorização do cliente. Nada é
              gerado por inteligência artificial.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default BairroFotos;
