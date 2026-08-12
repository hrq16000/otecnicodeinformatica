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

console.log("── Gate check:motion-loading ──");
console.log(`  verificações OK: ${ok.length}`);
if (erros.length) {
  for (const e of erros) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log("✔ esqueletos, fade de imagem, progresso de rota e reduced-motion íntegros.");
