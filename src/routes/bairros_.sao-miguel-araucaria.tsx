import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/sao-miguel-araucaria")({
  component: legacyRouteElements["/bairros/sao-miguel-araucaria"],
});
