import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/merces"];

export const Route = createFileRoute("/bairros_/merces")({
  component: RouteComponent,
});
