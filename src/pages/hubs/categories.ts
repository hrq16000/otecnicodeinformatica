/**
 * Definições de categoria para hubs SEO locais (TV, Som, Videogame, Celular).
 * Cada categoria expõe metadados, FAQ, sintomas e CTAs reutilizados pelo template.
 */

export type CategoryId = "tv" | "som" | "videogame" | "celular";

export interface CategoryData {
  id: CategoryId;
  slug: string;            // path segment (ex.: "conserto-tv")
  nome: string;            // ex.: "TV"
  titlePrefix: string;     // ex.: "Conserto de TV"
  emoji: string;
  sintomas: string[];      // problemas frequentes
  servicos: string[];      // serviços oferecidos
  faqs: { q: string; a: string }[];
  precoVisita: string;     // âncora
  prazoEntrega: string;
}

export const CATEGORIES: Record<CategoryId, CategoryData> = {
  tv: {
    id: "tv",
    slug: "conserto-tv",
    nome: "TV",
    titlePrefix: "Conserto de TV",
    emoji: "📺",
    sintomas: [
      "TV não liga",
      "Tela quebrada / trincada",
      "Sem imagem (só som)",
      "Sem som (imagem normal)",
      "Linhas e manchas na tela",
      "Liga e desliga sozinha",
      "Não reconhece HDMI",
      "Smart TV travando",
    ],
    servicos: [
      "Troca de fonte e capacitores",
      "Troca de T-CON",
      "Reparo de placa principal",
      "Reparo de backlight (LEDs)",
      "Troca de tela (sob orçamento)",
      "Atualização de firmware",
    ],
    faqs: [
      { q: "Quanto custa o conserto de TV?", a: "O reparo mínimo é R$ 300 (já com diagnóstico). Após avaliar, enviamos orçamento exato antes de qualquer execução. Se você desistir, paga só R$ 90 do diagnóstico." },
      { q: "Vocês buscam minha TV?", a: "Sim. Trabalhamos com Coleta e Entrega (taxa conforme distância). O prazo é de 15 a 60 dias úteis para TV/Monitor por se tratar de bancada e peças sob encomenda." },
      { q: "Vale a pena consertar TV antiga?", a: "Depende do laudo. Se a peça for cara (display, por exemplo), avisamos antes — nunca executamos sem sua autorização por escrito." },
    ],
    precoVisita: "R$ 300 (mínimo · diagnóstico incluso)",
    prazoEntrega: "15 a 60 dias úteis",
  },
  som: {
    id: "som",
    slug: "conserto-som",
    nome: "Som / Áudio",
    titlePrefix: "Conserto de Som e Áudio",
    emoji: "🔊",
    sintomas: [
      "Caixa Bluetooth não liga",
      "Soundbar sem som",
      "Home-theater chiando",
      "Receiver travando",
      "Mini system não lê CD/USB",
      "Bluetooth não conecta",
    ],
    servicos: [
      "Troca de bateria de caixas portáteis",
      "Reparo de amplificador",
      "Troca de alto-falante / tweeter",
      "Reparo de fonte de receivers",
      "Recapacitação de placas de áudio",
    ],
    faqs: [
      { q: "O conserto de caixa de som vale a pena?", a: "JBL, Bose e similares: vale a pena quando a peça é barata (bateria, alto-falante). Diagnosticamos e enviamos orçamento antes." },
      { q: "Qual o prazo para som?", a: "Equipamentos menores (caixas, soundbars): 2 a 3 dias úteis. Receivers e home-theater: 5 a 10 dias úteis." },
      { q: "Atendem qualquer marca?", a: "Sim: JBL, Bose, Sony, LG, Samsung, Yamaha, Marantz, Edifier, Philips e outras." },
    ],
    precoVisita: "R$ 300 (mínimo · diagnóstico incluso)",
    prazoEntrega: "2 a 10 dias úteis",
  },
  videogame: {
    id: "videogame",
    slug: "conserto-videogame",
    nome: "Videogame",
    titlePrefix: "Conserto de Videogame",
    emoji: "🎮",
    sintomas: [
      "PS5 / PS4 não liga",
      "Xbox desligando sozinho",
      "Console superaquecendo (luz vermelha)",
      "Não lê disco (Blu-ray)",
      "Sem imagem (HDMI queimado)",
      "Joystick com drift",
      "Switch não carrega",
    ],
    servicos: [
      "Troca de HDMI (microsoldagem)",
      "Reflow / reballing de chip GPU",
      "Limpeza completa + troca de pasta térmica",
      "Troca de drive de Blu-ray",
      "Reparo de joystick (drift, gatilho)",
      "Recuperação de HD/SSD",
    ],
    faqs: [
      { q: "Conserto de PS5 com HDMI queimado tem garantia?", a: "Sim. 90 dias de garantia em microsoldagem de HDMI executada na nossa bancada." },
      { q: "Vale a pena trocar pasta térmica do PS4/Xbox?", a: "Sim — superaquecimento é a causa nº1 de falha de chip. Manutenção preventiva custa muito menos que reparo de placa." },
      { q: "Atendem Nintendo Switch?", a: "Sim: troca de bateria, joycon drift, leitor de cartucho, conector de carga e HDMI da dock." },
    ],
    precoVisita: "R$ 300 (mínimo · diagnóstico incluso)",
    prazoEntrega: "5 a 15 dias úteis",
  },
  celular: {
    id: "celular",
    slug: "conserto-celular",
    nome: "Celular",
    titlePrefix: "Conserto de Celular",
    emoji: "📱",
    sintomas: [
      "Tela trincada / quebrada",
      "Não carrega / conector de carga",
      "Molhou (oxidação)",
      "Sem som no alto-falante",
      "Bateria acaba rápido",
      "Não liga (placa)",
      "Botão home/power travado",
    ],
    servicos: [
      "Troca de tela (display)",
      "Troca de bateria",
      "Reparo de conector de carga",
      "Reparo após queda d'água (oxidação)",
      "Microsoldagem de placa",
      "Reparo de Face ID / sensor",
    ],
    faqs: [
      { q: "Quanto custa trocar a tela do iPhone?", a: "Depende do modelo. Após você enviar foto e modelo no WhatsApp, retornamos com orçamento em até 30 min. Reparos de placa começam em R$ 300." },
      { q: "Vocês usam peça original?", a: "Oferecemos as duas opções (original e similar premium). Você escolhe antes da execução." },
      { q: "Celular molhado tem conserto?", a: "Na maioria dos casos sim, se você não tentou ligar depois. Quanto mais rápido trouxer, maior a chance de recuperar dados." },
    ],
    precoVisita: "R$ 300 (mínimo · diagnóstico incluso)",
    prazoEntrega: "2 a 5 dias úteis",
  },
};

export const CATEGORY_LIST = Object.values(CATEGORIES);

export function findCategory(slug: string): CategoryData | undefined {
  return CATEGORY_LIST.find((c) => c.slug === slug || c.id === slug);
}
