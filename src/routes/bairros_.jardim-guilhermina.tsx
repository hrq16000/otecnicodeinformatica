import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-guilhermina")({
  component: legacyRouteElements["/bairros/jardim-guilhermina"],
});
