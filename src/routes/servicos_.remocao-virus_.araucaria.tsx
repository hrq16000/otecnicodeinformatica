import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/remocao-virus_/araucaria")({
  component: legacyRouteElements["/servicos/remocao-virus/araucaria"],
});
