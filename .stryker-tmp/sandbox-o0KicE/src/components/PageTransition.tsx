// @ts-nocheck
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

// Carregamento instantâneo: sem overlays, sem fades que escurecem a página.
export const PageTransition = ({ children }: PageTransitionProps) => <>{children}</>;
