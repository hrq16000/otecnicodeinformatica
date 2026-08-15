#!/usr/bin/env node
/**
 * Gate: bloco padronizado de política de atendimento.
 *
 * Garante que:
 *  1. As páginas-âncora (layout de serviço + clusters) renderizam
 *     <PoliticaAtendimentoBloco />.
 *  2. Os textos-fonte (precosConfig) mantêm as regras obrigatórias:
 *     sem balcão, visita sem compromisso de 30 em 30 minutos,
 *     coleta e entrega e mínimo pré-aprovado de R$ 299,99.
 *
 * Fail-closed: qualquer ausência derruba o build.
 */
import { readFileSync, existsSync } from "node:fs";

const COMPONENTE = "src/components/PoliticaAtendimentoBloco.tsx";

const CONSUMIDORES = [
  "src/components/servico/ServicoLandingLayout.tsx",
  "src/pages/problemas/ClusterProblemaPage.tsx",
  "src/pages/equipamentos/ClusterEquipamentoPage.tsx",
  "src/pages/solucoes/ClusterSolucaoPage.tsx",
  "src/pages/problemas/ComputadorLento.tsx",
  "src/pages/problemas/NotebookNaoLiga.tsx",
];

const TERMOS_COMPONENTE = [
  "Sem balcão de atendimento",
  "Visita técnica sem compromisso",
  "A gente busca",
  "NOTA_VISITA_AVULSA",
  "VALOR_COLETA_MINIMO_LABEL",
  "REGRA_CANCELAMENTO",
];

const TERMOS_CONFIG = [
  ["src/lib/precosConfig.ts", "30 minutos"],
  ["src/lib/precosConfig.ts", "sem compromisso"],
  ["src/lib/precosConfig.ts", "R$ 299,99"],
  ["src/lib/coletaConfig.ts", "R$ 299,99"],
];

const erros = [];

if (!existsSync(COMPONENTE)) {
  erros.push(`Componente ausente: ${COMPONENTE}`);
} else {
  const src = readFileSync(COMPONENTE, "utf8");
  for (const termo of TERMOS_COMPONENTE) {
    if (!src.includes(termo)) {
      erros.push(`${COMPONENTE}: termo obrigatório ausente -> "${termo}"`);
    }
  }
}

for (const arquivo of CONSUMIDORES) {
  if (!existsSync(arquivo)) {
    erros.push(`Arquivo esperado não existe: ${arquivo}`);
    continue;
  }
  const src = readFileSync(arquivo, "utf8");
  if (!src.includes("PoliticaAtendimentoBloco")) {
    erros.push(`${arquivo}: não renderiza <PoliticaAtendimentoBloco />`);
  }
}

for (const [arquivo, termo] of TERMOS_CONFIG) {
  if (!existsSync(arquivo)) {
    erros.push(`Arquivo esperado não existe: ${arquivo}`);
    continue;
  }
  if (!readFileSync(arquivo, "utf8").includes(termo)) {
    erros.push(`${arquivo}: regra obrigatória ausente -> "${termo}"`);
  }
}

if (erros.length > 0) {
  console.error("check:politica-atendimento FALHOU\n");
  for (const e of erros) console.error(` - ${e}`);
  process.exit(1);
}

console.log(
  `check:politica-atendimento OK — bloco padronizado presente em ${CONSUMIDORES.length} âncoras.`,
);
