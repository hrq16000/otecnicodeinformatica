import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/boa-vista"];

export const Route = createFileRoute("/bairros_/boa-vista")({
  component: RouteComponent,
});
