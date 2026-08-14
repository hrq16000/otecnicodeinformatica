import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/california-araucaria")({
  component: legacyRouteElements["/bairros/california-araucaria"],
});
