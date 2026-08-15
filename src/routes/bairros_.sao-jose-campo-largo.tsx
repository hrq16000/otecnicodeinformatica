import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/sao-jose-campo-largo"];

export const Route = createFileRoute("/bairros_/sao-jose-campo-largo")({
  component: RouteComponent,
});
