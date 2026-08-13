/**
 * Aviso obrigatório anexado a TODA mensagem final do WhatsApp.
 * Fonte única de verdade — qualquer rota que monte mensagem direta
 * para o WhatsApp deve concatenar `VIDEO_WARNING` no final.
 *
 * Regra de negócio: o atendimento humano NÃO é iniciado sem fotos do
 * equipamento completo (com etiqueta traseira) e vídeo do defeito
 * sem áudio nem ruídos.
 */
// @ts-nocheck

export const VIDEO_WARNING =
  "🚨 *Atenção — obrigatório para iniciar o atendimento:* envie *agora neste chat* (1) *fotos* do equipamento por completo, incluindo a *etiqueta traseira* com modelo/série, e (2) um *vídeo* mostrando o defeito acontecendo. O vídeo *não pode ter áudio nem ruídos de fundo* (mute o microfone do celular, ambiente em silêncio). *Sem o envio das fotos e do vídeo, o atendimento não será iniciado.*";

/** Garante que `VIDEO_WARNING` esteja sempre no final da mensagem. */
export function withVideoWarning(message: string): string {
  const trimmed = message.trimEnd();
  if (trimmed.endsWith(VIDEO_WARNING)) return trimmed;
  return `${trimmed}\n\n${VIDEO_WARNING}`;
}
