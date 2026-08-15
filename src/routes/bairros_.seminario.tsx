import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/seminario"];

export const Route = createFileRoute("/bairros_/seminario")({
  component: RouteComponent,
});
