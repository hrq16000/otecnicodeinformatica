import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/chapada"];

export const Route = createFileRoute("/bairros_/chapada")({
  component: RouteComponent,
});
