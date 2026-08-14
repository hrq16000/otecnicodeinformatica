import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/estancia-pinhais"];

export const Route = createFileRoute("/bairros_/estancia-pinhais")({
  component: RouteComponent,
});
