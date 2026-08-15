import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/joquei-clube-cm"];

export const Route = createFileRoute("/bairros_/joquei-clube-cm")({
  component: RouteComponent,
});
