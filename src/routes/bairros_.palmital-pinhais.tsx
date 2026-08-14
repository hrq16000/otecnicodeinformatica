import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/palmital-pinhais")({
  component: legacyRouteElements["/bairros/palmital-pinhais"],
});
