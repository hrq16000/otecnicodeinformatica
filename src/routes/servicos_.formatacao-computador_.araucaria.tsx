import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/formatacao-computador_/araucaria")({
  component: legacyRouteElements["/servicos/formatacao-computador/araucaria"],
});
