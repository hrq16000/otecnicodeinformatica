import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-esplanada-pinhais")({
  component: legacyRouteElements["/bairros/jardim-esplanada-pinhais"],
});
