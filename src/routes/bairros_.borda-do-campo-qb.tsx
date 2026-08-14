import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/borda-do-campo-qb")({
  component: legacyRouteElements["/bairros/borda-do-campo-qb"],
});
