import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/manutencao-tv_/boa-vista")({
  component: legacyRouteElements["/servicos/manutencao-tv/boa-vista"],
});
