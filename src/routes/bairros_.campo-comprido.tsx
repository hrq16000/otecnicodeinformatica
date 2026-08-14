import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/campo-comprido"];

export const Route = createFileRoute("/bairros_/campo-comprido")({
  component: RouteComponent,
});
