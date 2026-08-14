import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-boa-vista-araucaria")({
  component: legacyRouteElements["/bairros/jardim-boa-vista-araucaria"],
});
