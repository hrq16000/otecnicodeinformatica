import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-esperanca-cl")({
  component: legacyRouteElements["/bairros/jardim-esperanca-cl"],
});
