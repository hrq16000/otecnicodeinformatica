import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/aristocrata"];

export const Route = createFileRoute("/bairros_/aristocrata")({
  component: RouteComponent,
});
