import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/cristo-rei"];

export const Route = createFileRoute("/bairros_/cristo-rei")({
  component: RouteComponent,
});
