import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/parque-da-fonte"];

export const Route = createFileRoute("/bairros_/parque-da-fonte")({
  component: RouteComponent,
});
