import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/formatacao-computador_/campo-largo")({
  component: legacyRouteElements["/servicos/formatacao-computador/campo-largo"],
});
