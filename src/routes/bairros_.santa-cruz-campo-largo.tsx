import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/santa-cruz-campo-largo"];

export const Route = createFileRoute("/bairros_/santa-cruz-campo-largo")({
  component: RouteComponent,
});
