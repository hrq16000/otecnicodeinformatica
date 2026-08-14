import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/fazenda-velha-araucaria")({
  component: legacyRouteElements["/bairros/fazenda-velha-araucaria"],
});
