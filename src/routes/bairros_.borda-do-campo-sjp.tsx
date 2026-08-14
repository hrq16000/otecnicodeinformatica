import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/borda-do-campo-sjp")({
  component: legacyRouteElements["/bairros/borda-do-campo-sjp"],
});
