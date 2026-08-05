// ─────────────────────────────────────────────────────────────
// LISTA DE LOCALIDADES PARA SELEÇÃO MANUAL
// Usada quando a geolocalização falha (IP bloqueado, permissão
// negada, VPN) — o visitante escolhe bairro/cidade e a mensagem
// do WhatsApp sai com o local correto do atendimento.
// Não é conteúdo indexável: é apoio de formulário.
// ─────────────────────────────────────────────────────────────

export interface LocalidadeGrupo {
  grupo: string;
  opcoes: string[];
}

/** Bairros de Curitiba com maior volume de atendimento. */
const CURITIBA_BAIRROS = [
  "Abranches",
  "Água Verde",
  "Ahú",
  "Alto da Glória",
  "Alto da XV",
  "Alto Boqueirão",
  "Bacacheri",
  "Bairro Alto",
  "Barreirinha",
  "Batel",
  "Bigorrilho",
  "Boa Vista",
  "Boqueirão",
  "Cabral",
  "Cajuru",
  "Campina do Siqueira",
  "Campo Comprido",
  "Capão da Imbuia",
  "Capão Raso",
  "Centro",
  "Centro Cívico",
  "Champagnat",
  "CIC (Cidade Industrial)",
  "Cristo Rei",
  "Ecoville",
  "Fanny",
  "Fazendinha",
  "Guabirotuba",
  "Guaíra",
  "Hauer",
  "Hugo Lange",
  "Jardim Botânico",
  "Jardim das Américas",
  "Jardim Social",
  "Juvevê",
  "Lindóia",
  "Mercês",
  "Mossunguê",
  "Novo Mundo",
  "Parolin",
  "Pilarzinho",
  "Pinheirinho",
  "Portão",
  "Prado Velho",
  "Rebouças",
  "Santa Cândida",
  "Santa Felicidade",
  "Santa Quitéria",
  "São Braz",
  "São Francisco",
  "São Lourenço",
  "Seminário",
  "Sítio Cercado",
  "Tarumã",
  "Tatuquara",
  "Uberaba",
  "Umbará",
  "Vila Izabel",
  "Vista Alegre",
  "Xaxim",
];

/** Cidades da Região Metropolitana atendidas. */
const CIDADES_RMC = [
  "Almirante Tamandaré",
  "Araucária",
  "Campina Grande do Sul",
  "Campo Largo",
  "Campo Magro",
  "Colombo",
  "Fazenda Rio Grande",
  "Pinhais",
  "Piraquara",
  "Quatro Barras",
  "São José dos Pinhais",
];

export const LOCALIDADE_GRUPOS: LocalidadeGrupo[] = [
  { grupo: "Curitiba — bairros", opcoes: CURITIBA_BAIRROS.map((b) => `${b}, Curitiba`) },
  { grupo: "Região Metropolitana", opcoes: CIDADES_RMC.map((c) => `${c}, PR`) },
];

/** Lista plana usada em datalist/autocomplete. */
export const LOCALIDADES: string[] = LOCALIDADE_GRUPOS.flatMap((g) => g.opcoes);
