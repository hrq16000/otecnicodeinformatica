import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/campo-pequeno"];

export const Route = createFileRoute("/bairros_/campo-pequeno")({
  component: RouteComponent,
});
