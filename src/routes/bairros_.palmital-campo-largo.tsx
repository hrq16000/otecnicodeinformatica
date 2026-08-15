import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/palmital-campo-largo"];

export const Route = createFileRoute("/bairros_/palmital-campo-largo")({
  component: RouteComponent,
});
