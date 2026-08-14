import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/campo-tenente-at")({
  component: legacyRouteElements["/bairros/campo-tenente-at"],
});
