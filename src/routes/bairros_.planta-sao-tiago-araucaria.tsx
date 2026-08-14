import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/planta-sao-tiago-araucaria")({
  component: legacyRouteElements["/bairros/planta-sao-tiago-araucaria"],
});
