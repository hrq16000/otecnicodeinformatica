/**
 * Slides do hero — pontos turísticos de Curitiba.
 *
 * As imagens são processadas pelo vite-imagetools em build:
 *  - variantes AVIF + WebP + JPG (fallback)
 *  - larguras responsivas 768/1280/1920 via srcset
 * O <picture> no HeroPremium escolhe o melhor formato/tamanho por dispositivo.
 */

// Jardim Botânico
import jbAvif from "@/assets/hero-jardim-botanico.jpg?w=768;1280;1920&format=avif&as=srcset";
import jbWebp from "@/assets/hero-jardim-botanico.jpg?w=768;1280;1920&format=webp&as=srcset";
import jbJpg from "@/assets/hero-jardim-botanico.jpg?w=768;1280;1920&format=jpg&as=srcset";

// Museu Oscar Niemeyer
import onAvif from "@/assets/hero-oscar-niemeyer.jpg?w=768;1280;1920&format=avif&as=srcset";
import onWebp from "@/assets/hero-oscar-niemeyer.jpg?w=768;1280;1920&format=webp&as=srcset";
import onJpg from "@/assets/hero-oscar-niemeyer.jpg?w=768;1280;1920&format=jpg&as=srcset";

// Ópera de Arame
import opAvif from "@/assets/hero-opera-de-arame.jpg?w=768;1280;1920&format=avif&as=srcset";
import opWebp from "@/assets/hero-opera-de-arame.jpg?w=768;1280;1920&format=webp&as=srcset";
import opJpg from "@/assets/hero-opera-de-arame.jpg?w=768;1280;1920&format=jpg&as=srcset";

// Parque Tanguá
import ptAvif from "@/assets/hero-parque-tangua.jpg?w=768;1280;1920&format=avif&as=srcset";
import ptWebp from "@/assets/hero-parque-tangua.jpg?w=768;1280;1920&format=webp&as=srcset";
import ptJpg from "@/assets/hero-parque-tangua.jpg?w=768;1280;1920&format=jpg&as=srcset";

/** Extrai a primeira URL de um srcset para usar como `src` de fallback. */
function firstFromSrcset(srcset: string): string {
  return srcset.split(",")[0]?.trim().split(/\s+/)[0] ?? "";
}

export interface HeroSlide {
  place: string;
  caption: string;
  avif: string;
  webp: string;
  jpg: string;
  fallback: string;
}

export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    place: "Jardim Botânico",
    caption: "Jardim Botânico — o cartão-postal de Curitiba",
    avif: jbAvif,
    webp: jbWebp,
    jpg: jbJpg,
    fallback: firstFromSrcset(jbJpg),
  },
  {
    place: "Museu Oscar Niemeyer",
    caption: "Museu Oscar Niemeyer — o Olho de Curitiba",
    avif: onAvif,
    webp: onWebp,
    jpg: onJpg,
    fallback: firstFromSrcset(onJpg),
  },
  {
    place: "Ópera de Arame",
    caption: "Ópera de Arame — no coração do parque",
    avif: opAvif,
    webp: opWebp,
    jpg: opJpg,
    fallback: firstFromSrcset(opJpg),
  },
  {
    place: "Parque Tanguá",
    caption: "Parque Tanguá — mirante e cascata",
    avif: ptAvif,
    webp: ptWebp,
    jpg: ptJpg,
    fallback: firstFromSrcset(ptJpg),
  },
] as const;

/** Embaralha uma cópia do array (Fisher–Yates). */
export function shuffleSlides<T>(arr: readonly T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
