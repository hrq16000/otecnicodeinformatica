import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/cic"];

export const Route = createFileRoute("/bairros_/cic")({
  component: RouteComponent,
});
