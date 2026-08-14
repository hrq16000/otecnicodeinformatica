import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/palmital-campo-largo")({
  component: legacyRouteElements["/bairros/palmital-campo-largo"],
});
