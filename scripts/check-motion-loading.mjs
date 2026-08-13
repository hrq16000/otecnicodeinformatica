#!/usr/bin/env node
/**
 * Gate check:motion-loading (ONDA 4T)
 *
 * Garante que o sistema de carregamento e movimento continua íntegro:
 * - tokens de esqueleto/fade/progresso presentes no CSS global;
 * - bloco `prefers-reduced-motion` desligando shimmer, fade e progresso;
 * - primitivas SmartImage / SkeletonSection existentes e usadas;
 * - fallback das seções lazy da home não volta a ser espaço em branco.
 *
 * Fail-closed: qualquer item ausente derruba o build.
 */
import { readFileSync, existsSync } from "node:fs";

const erros = [];
const ok = [];

function ler(p) {
  if (!existsSync(p)) {
    erros.push(`arquivo ausente: ${p}`);
    return "";
  }
  return readFileSync(p, "utf8");
}

const css = ler("src/index.css");
for (const token of [".skel", ".skel-line", ".img-fade", ".route-progress", "@keyframes skelShimmer", "@keyframes routeProgress"]) {
  if (css.includes(token)) ok.push(`css ${token}`);
  else erros.push(`token de motion ausente em src/index.css: ${token}`);
}

const reduced = css.split("@media (prefers-reduced-motion: reduce)").slice(1).join("\n");
for (const token of [".skel", ".img-fade", ".route-progress"]) {
  if (reduced.includes(token)) ok.push(`reduced-motion ${token}`);
  else erros.push(`prefers-reduced-motion não neutraliza ${token}`);
}

const smart = ler("src/components/SmartImage.tsx");
if (!smart.includes("img-fade")) erros.push("SmartImage não aplica .img-fade");
if (!smart.includes('loading ?? (priority ? "eager" : "lazy")')) erros.push("SmartImage perdeu o lazy-loading padrão");

const skeleton = ler("src/components/SkeletonSection.tsx");
if (!skeleton.includes("SkeletonBand")) erros.push("SkeletonSection perdeu SkeletonBand");

const home = ler("src/components/HomeDeferredSections.tsx");
if (!home.includes("SkeletonSection")) erros.push("HomeDeferredSections voltou a usar fallback em branco");

const app = ler("src/App.tsx");
if (!app.includes("route-progress")) erros.push("App.tsx sem barra de progresso de navegação");

const foto = ler("src/components/FotoLicenciadaImg.tsx");
if (!foto.includes("SmartImage")) erros.push("FotoLicenciadaImg não usa SmartImage");
if (!foto.includes("alt={f.alt}")) erros.push("FotoLicenciadaImg perdeu o alt da foto licenciada");

// ONDA 4W — placeholders de carregamento padronizados no token `.skel`
const primitivas = [
  ["src/components/Skeleton.tsx", ["SkeletonCard", "SkeletonGrid", "skel"]],
  ["src/components/ui/skeleton.tsx", ["skel"]],
];
for (const [arquivo, tokens] of primitivas) {
  const conteudo = ler(arquivo);
  if (/className=[^\n]*animate-pulse/.test(conteudo)) {
    erros.push(`${arquivo} voltou a usar animate-pulse ad-hoc em vez do token .skel`);
  }
  for (const t of tokens) {
    if (conteudo.includes(t)) ok.push(`${arquivo} ${t}`);
    else erros.push(`${arquivo} perdeu ${t}`);
  }
}

// Views com dados remotos precisam de esqueleto shimmer + status acessível
const viewsComDados = [
  "src/pages/Depoimentos.tsx",
  "src/components/ReviewsGrid.tsx",
  "src/pages/admin/AdminReviews.tsx",
  "src/pages/admin/AdminFunnel.tsx",
  "src/pages/admin/AdminConversao.tsx",
];
for (const arquivo of viewsComDados) {
  const conteudo = ler(arquivo);
  if (!/\bskel\b/.test(conteudo) && !/Skeleton(List|Section|Grid|Card)/.test(conteudo)) erros.push(`${arquivo} sem esqueleto .skel no estado de carregamento`);
  if (/bg-muted\/40 animate-pulse|animate-pulse bg-muted/.test(conteudo)) {
    erros.push(`${arquivo} voltou a usar placeholder animate-pulse ad-hoc`);
  }
}

// Envio de formulário público precisa de feedback de progresso
const avaliar = ler("src/pages/Avaliar.tsx");
const feedbackEnvio =
  (avaliar.includes("LoadingButton") && avaliar.includes('state={enviando ? "loading" : "idle"}')) ||
  (avaliar.includes("aria-busy={enviando}") && avaliar.includes("animate-spin"));
if (!feedbackEnvio) {
  erros.push("Avaliar.tsx perdeu o feedback de envio (LoadingButton ou spinner/aria-busy)");
}


// MOTION SYSTEM GLOBAL — tokens únicos e primitivas reutilizáveis
for (const token of [
  "--motion-duration-instant",
  "--motion-duration-fast",
  "--motion-duration-normal",
  "--motion-duration-slow",
  "--motion-ease-standard",
  "--motion-ease-enter",
  "--motion-ease-exit",
  ".motion-enter",
  ".motion-exit",
  ".motion-collapse",
  ".motion-surface",
  ".motion-progress-indeterminate",
]) {
  if (css.includes(token)) ok.push(`motion ${token}`);
  else erros.push(`token do motion system ausente em src/index.css: ${token}`);
}
for (const token of [".motion-enter", ".motion-collapse", ".motion-progress-indeterminate"]) {
  if (reduced.includes(token)) ok.push(`reduced-motion ${token}`);
  else erros.push(`prefers-reduced-motion não neutraliza ${token}`);
}

const primitivasMotion = [
  ["src/lib/motion.ts", ["duration", "ease", "staggerDelay"]],
  ["src/components/motion/FadeIn.tsx", ["motion-enter"]],
  ["src/components/motion/Collapse.tsx", ["motion-collapse"]],
  ["src/components/motion/Presence.tsx", ["motion-exit"]],
  ["src/components/motion/LoadingButton.tsx", ["aria-busy", "Loader2"]],
  ["src/components/motion/AsyncContent.tsx", ["aria-busy", "skeleton"]],
  ["src/components/motion/Progress.tsx", ["role=\"progressbar\"", "aria-valuenow"]],
  ["src/components/motion/AnimatedList.tsx", ["staggerLimit"]],
  ["src/components/motion/index.ts", ["AsyncContent", "LoadingButton", "SkeletonTable"]],
  ["src/components/Skeleton.tsx", ["SkeletonTable", "SkeletonPage", "SkeletonForm", "SkeletonMetrics", "SkeletonChart"]],
];
for (const [arquivo, tokens] of primitivasMotion) {
  const conteudo = ler(arquivo);
  for (const t of tokens) {
    if (conteudo.includes(t)) ok.push(`${arquivo} ${t}`);
    else erros.push(`${arquivo} perdeu ${t}`);
  }
}

console.log("── Gate check:motion-loading ──");
console.log(`  verificações OK: ${ok.length}`);
if (erros.length) {
  for (const e of erros) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log("✔ esqueletos, fade de imagem, progresso de rota e reduced-motion íntegros.");
