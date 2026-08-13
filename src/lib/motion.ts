/**
 * MOTION TOKENS — fonte única de duração e easing da interface.
 *
 * Espelha as variáveis CSS definidas em `src/index.css` (`--motion-*`),
 * para que componentes que precisam de valores em JS (timeouts de saída,
 * atrasos de stagger) usem exatamente os mesmos números do CSS.
 *
 * Regra: movimento tem função. Interações frequentes usam `instant`/`fast`;
 * `slow` fica reservado a transições de superfície grandes (drawers, modais).
 */
export const motion = {
  duration: {
    instant: 100,
    fast: 160,
    normal: 220,
    slow: 300,
  },
  ease: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    enter: "cubic-bezier(0, 0, 0.2, 1)",
    exit: "cubic-bezier(0.4, 0, 1, 1)",
    spring: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
} as const;

export type MotionDuration = keyof typeof motion.duration;

/** Duração efetiva considerando `prefers-reduced-motion`. */
export const durationFor = (key: MotionDuration, reducedMotion: boolean) =>
  reducedMotion ? 0 : motion.duration[key];

/** Atraso de stagger limitado — nunca escalona listas grandes. */
export const staggerDelay = (index: number, step = 40, max = 6) =>
  index >= max ? max * step : index * step;
