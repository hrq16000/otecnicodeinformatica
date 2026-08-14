import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-dona-rosa-pinhais")({
  component: legacyRouteElements["/bairros/jardim-dona-rosa-pinhais"],
});
