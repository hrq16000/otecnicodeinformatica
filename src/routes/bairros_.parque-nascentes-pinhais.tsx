import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/parque-nascentes-pinhais"];

export const Route = createFileRoute("/bairros_/parque-nascentes-pinhais")({
  component: RouteComponent,
});
