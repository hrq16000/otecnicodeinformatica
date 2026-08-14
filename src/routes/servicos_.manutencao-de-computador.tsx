import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/manutencao-de-computador")({
  component: legacyRouteElements["/servicos/manutencao-de-computador"],
});
