import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/jardim-iguacu-araucaria")({
  component: legacyRouteElements["/bairros/jardim-iguacu-araucaria"],
});
