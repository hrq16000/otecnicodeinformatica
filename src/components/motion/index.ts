/**
 * Primitivas de motion e estado do portal.
 *
 * Ponto de entrada único: qualquer tela nova deve consumir estes
 * componentes em vez de reimplementar animações/loaders locais.
 */
export { FadeIn } from "./FadeIn";
export { Collapse } from "./Collapse";
export { Presence } from "./Presence";
export { LoadingButton } from "./LoadingButton";
export { AsyncContent } from "./AsyncContent";
export { Progress as MotionProgress } from "./Progress";
export { AnimatedList } from "./AnimatedList";
export { motion, durationFor, staggerDelay } from "@/lib/motion";
export {
  SkeletonCard,
  SkeletonText,
  SkeletonGrid,
  SkeletonHero,
  SkeletonTable,
  SkeletonPage,
  SkeletonForm,
  SkeletonMetrics,
  SkeletonChart,
} from "@/components/Skeleton";
