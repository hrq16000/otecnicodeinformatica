import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/costeira-araucaria")({
  component: legacyRouteElements["/bairros/costeira-araucaria"],
});
