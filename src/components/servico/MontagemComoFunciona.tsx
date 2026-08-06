import { Clock, ClipboardCheck, Wrench, PackageCheck, ShieldCheck } from "lucide-react";

/**
 * "Como funciona a montagem" — etapas do atendimento e prazos estimados.
 * Fica dentro de /servicos/montagem-de-pc para não canibalizar /como-funciona.
 */

const ETAPAS = [
  {
    icon: ClipboardCheck,
    titulo: "1. Triagem e verificação de compatibilidade",
    prazo: "Logo após o contato, em horário útil",
    texto:
      "Você descreve a configuração pretendida, o uso e quais peças já possui. Conferimos compatibilidade de soquete, chipset, memória, alimentação da fonte e espaço interno do gabinete. Quando alguma combinação não fecha, apontamos o conflito antes de qualquer compra ou deslocamento.",
  },
  {
    icon: PackageCheck,
    titulo: "2. Recebimento e conferência das peças",
    prazo: "Na coleta ou na chegada em bancada",
    texto:
      "Cada item é conferido em lista: modelo, número de série quando visível, estado da embalagem e sinais de uso. Peças fornecidas pelo cliente entram no registro com essa identificação, o que evita divergência depois. Fotos enviadas no atendimento aceleram essa etapa.",
  },
  {
    icon: Wrench,
    titulo: "3. Montagem, cabeamento e fluxo de ar",
    prazo: "1 a 2 dias úteis em bancada",
    texto:
      "Instalação da placa-mãe, refrigeração, armazenamento e fonte, com organização de cabos e definição do fluxo de ar. Em seguida vem a configuração de BIOS/UEFI, atualização de firmware quando o fabricante disponibiliza e instalação de drivers a partir das fontes oficiais.",
  },
  {
    icon: ShieldCheck,
    titulo: "4. Testes de estabilidade e temperatura",
    prazo: "Algumas horas de bancada, no mesmo ciclo",
    texto:
      "Testes de memória, carga de processador e placa de vídeo, leitura de temperaturas e verificação de armazenamento. O objetivo é reprovar cedo qualquer peça instável — não é medição de desempenho nem estimativa de quadros por segundo.",
  },
  {
    icon: Clock,
    titulo: "5. Entrega com checklist e registro",
    prazo: "Combinado no atendimento",
    texto:
      "Entrega com o checklist final assinalado, orientações de uso e o registro do que foi feito. Prazos podem variar quando há peça em falta, componente com defeito de fábrica ou necessidade de troca junto ao fornecedor — nesses casos o novo prazo é informado antes de seguir.",
  },
];

export const MontagemComoFunciona = () => (
  <section className="border-t border-border/60 py-14" id="como-funciona-montagem">
    <div className="container mx-auto max-w-4xl px-4">
      <h2 className="text-2xl font-bold md:text-3xl">Como funciona a montagem: etapas e prazos estimados</h2>
      <p className="mt-3 text-muted-foreground">
        O atendimento de montagem segue cinco etapas fixas, com prazos estimados para bancada. Prazos são
        estimativas de trabalho técnico e dependem da disponibilidade das peças.
      </p>

      <ol className="mt-6 space-y-4">
        {ETAPAS.map(({ icon: Icon, titulo, prazo, texto }) => (
          <li key={titulo} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start gap-3">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--accent))]" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">{titulo}</h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[hsl(var(--accent))]">
                  {prazo}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{texto}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default MontagemComoFunciona;
