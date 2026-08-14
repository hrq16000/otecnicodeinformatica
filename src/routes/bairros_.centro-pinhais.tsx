import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/centro-pinhais")({
  component: legacyRouteElements["/bairros/centro-pinhais"],
});
