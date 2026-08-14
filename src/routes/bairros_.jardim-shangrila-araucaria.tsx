import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-shangrila-araucaria")({
  component: legacyRouteElements["/bairros/jardim-shangrila-araucaria"],
});
