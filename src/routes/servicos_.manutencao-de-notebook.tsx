import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/manutencao-de-notebook")({
  component: legacyRouteElements["/servicos/manutencao-de-notebook"],
});
