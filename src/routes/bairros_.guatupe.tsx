import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/guatupe"];

export const Route = createFileRoute("/bairros_/guatupe")({
  component: RouteComponent,
});
