import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/manutencao-tv_/jardim-das-americas")({
  component: legacyRouteElements["/servicos/manutencao-tv/jardim-das-americas"],
});
