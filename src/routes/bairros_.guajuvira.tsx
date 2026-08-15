import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/guajuvira"];

export const Route = createFileRoute("/bairros_/guajuvira")({
  component: RouteComponent,
});
