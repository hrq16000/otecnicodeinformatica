import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/remocao-de-virus")({
  component: legacyRouteElements["/servicos/remocao-de-virus"],
});
