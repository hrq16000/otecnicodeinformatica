import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/parque-nascentes-pinhais")({
  component: legacyRouteElements["/bairros/parque-nascentes-pinhais"],
});
