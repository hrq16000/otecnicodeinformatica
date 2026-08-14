import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-karla-pinhais")({
  component: legacyRouteElements["/bairros/jardim-karla-pinhais"],
});
