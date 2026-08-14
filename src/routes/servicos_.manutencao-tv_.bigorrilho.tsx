import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/manutencao-tv_/bigorrilho")({
  component: legacyRouteElements["/servicos/manutencao-tv/bigorrilho"],
});
