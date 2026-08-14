import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/vale-das-aguas"];

export const Route = createFileRoute("/bairros_/vale-das-aguas")({
  component: RouteComponent,
});
