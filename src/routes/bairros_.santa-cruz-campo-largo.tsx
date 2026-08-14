import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/santa-cruz-campo-largo")({
  component: legacyRouteElements["/bairros/santa-cruz-campo-largo"],
});
