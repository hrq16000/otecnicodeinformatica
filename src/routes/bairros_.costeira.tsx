import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/costeira"];

export const Route = createFileRoute("/bairros_/costeira")({
  component: RouteComponent,
});
