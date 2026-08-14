import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/vila-nova-araucaria")({
  component: legacyRouteElements["/bairros/vila-nova-araucaria"],
});
