import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/sao-marcos-campo-largo"];

export const Route = createFileRoute("/bairros_/sao-marcos-campo-largo")({
  component: RouteComponent,
});
