import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/sao-jose-dos-pinhais")({
  component: legacyRouteElements["/bairros/sao-jose-dos-pinhais"],
});
