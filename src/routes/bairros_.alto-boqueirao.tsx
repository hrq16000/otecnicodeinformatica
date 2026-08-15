import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/alto-boqueirao"];

export const Route = createFileRoute("/bairros_/alto-boqueirao")({
  component: RouteComponent,
});
