import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/centro-araucaria")({
  component: legacyRouteElements["/bairros/centro-araucaria"],
});
