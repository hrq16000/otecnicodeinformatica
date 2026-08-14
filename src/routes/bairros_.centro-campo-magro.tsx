import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/centro-campo-magro")({
  component: legacyRouteElements["/bairros/centro-campo-magro"],
});
