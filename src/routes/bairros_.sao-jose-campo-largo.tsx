import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/bairros_/sao-jose-campo-largo")({
  component: legacyRouteElements["/bairros/sao-jose-campo-largo"],
});
