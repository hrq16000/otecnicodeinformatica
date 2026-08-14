import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/centro-campo-largo")({
  component: legacyRouteElements["/bairros/centro-campo-largo"],
});
