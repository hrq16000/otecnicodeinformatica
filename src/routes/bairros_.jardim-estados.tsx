import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-estados")({
  component: legacyRouteElements["/bairros/jardim-estados"],
});
