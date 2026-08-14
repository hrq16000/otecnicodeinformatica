import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-paraiso-at")({
  component: legacyRouteElements["/bairros/jardim-paraiso-at"],
});
