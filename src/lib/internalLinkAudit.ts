/**
 * Whitelist mínima de rotas /servicos/* válidas + validador usado nas
 * páginas /problema/* para evitar renderizar links quebrados.
 * A lista é intencionalmente conservadora (rotas core estáveis).
 */
export const VALID_SERVICE_ROUTES: readonly string[] = [
  "/servicos",
  "/servicos/conserto-pc-notebook",
  "/servicos/conserto-notebook",
  "/servicos/conserto-placa",
  "/servicos/computador-lento",
  "/servicos/computador-nao-liga",
  "/servicos/formatacao-computador",
  "/servicos/remocao-virus",
  "/servicos/upgrade-ssd-memoria",
  "/servicos/redes-e-wifi",
  "/servicos/redes-wifi",
  "/servicos/manutencao-tv",
  "/servicos/conserto-celular",
  "/servicos/backup-recuperacao",
  "/servicos/montagem-pc",
  "/servicos/conserto-tv",
  "/servicos/manutencao-t-v",
  "/atendimento-domicilio",
  "/atendimento-remoto",
  "/coleta-e-entrega",
  "/coleta-formulario",
  "/quando-nao-compensa",
  "/diagnostico-tecnico",
  "/como-funciona",
  "/precos-e-politicas",
  "/suporte-empresas",
  "/empresa-de-ti-curitiba",
] as const;

const VALID_PREFIXES = [
  "/problemas/",
  "/procedimentos/",
  "/bairros/",
  "/tecnico-informatica-",
  "/marcas/",
  "/blog/",
];

export type LinkAuditResult =
  | { valid: true; href: string }
  | { valid: false; href: string; reason: string };

export function auditInternalLink(href: string): LinkAuditResult {
  if (!href) return { valid: false, href, reason: "empty" };
  if (href.startsWith("http")) return { valid: false, href, reason: "external" };
  if (!href.startsWith("/")) return { valid: false, href, reason: "not_absolute" };

  const clean = href.split("#")[0].split("?")[0];
  if (VALID_SERVICE_ROUTES.includes(clean)) return { valid: true, href };
  if (VALID_PREFIXES.some((p) => clean.startsWith(p))) return { valid: true, href };

  return { valid: false, href, reason: "not_whitelisted" };
}
