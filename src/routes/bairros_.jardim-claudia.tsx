import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-claudia")({
  component: legacyRouteElements["/bairros/jardim-claudia"],
});
