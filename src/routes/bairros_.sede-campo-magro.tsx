import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/sede-campo-magro")({
  component: legacyRouteElements["/bairros/sede-campo-magro"],
});
