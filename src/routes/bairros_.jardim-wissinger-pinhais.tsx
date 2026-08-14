import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-wissinger-pinhais")({
  component: legacyRouteElements["/bairros/jardim-wissinger-pinhais"],
});
