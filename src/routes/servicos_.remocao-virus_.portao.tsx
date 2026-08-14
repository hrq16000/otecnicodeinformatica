import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/remocao-virus_/portao")({
  component: legacyRouteElements["/servicos/remocao-virus/portao"],
});
