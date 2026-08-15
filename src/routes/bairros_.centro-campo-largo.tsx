import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/centro-campo-largo"];

export const Route = createFileRoute("/bairros_/centro-campo-largo")({
  component: RouteComponent,
});
