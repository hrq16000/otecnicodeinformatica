import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/vila-maria-antonieta-pinhais"];

export const Route = createFileRoute("/bairros_/vila-maria-antonieta-pinhais")({
  component: RouteComponent,
});
