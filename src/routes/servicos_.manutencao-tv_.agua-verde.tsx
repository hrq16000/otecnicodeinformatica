import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/manutencao-tv_/agua-verde")({
  component: legacyRouteElements["/servicos/manutencao-tv/agua-verde"],
});
