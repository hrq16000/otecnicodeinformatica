import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/cachoeira-araucaria")({
  component: legacyRouteElements["/bairros/cachoeira-araucaria"],
});
