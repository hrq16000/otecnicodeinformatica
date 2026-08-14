import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/formatacao-computador_/pinhais")({
  component: legacyRouteElements["/servicos/formatacao-computador/pinhais"],
});
