import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-claudia-ii-pinhais")({
  component: legacyRouteElements["/bairros/jardim-claudia-ii-pinhais"],
});
