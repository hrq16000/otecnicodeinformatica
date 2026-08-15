import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/braga"];

export const Route = createFileRoute("/bairros_/braga")({
  component: RouteComponent,
});
