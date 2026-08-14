import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/remocao-virus_/sao-jose-dos-pinhais")({
  component: legacyRouteElements["/servicos/remocao-virus/sao-jose-dos-pinhais"],
});
