import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/formatacao-computador_/portao")({
  component: legacyRouteElements["/servicos/formatacao-computador/portao"],
});
