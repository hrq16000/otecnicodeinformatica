import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/centro"];

export const Route = createFileRoute("/bairros_/centro")({
  component: RouteComponent,
});
