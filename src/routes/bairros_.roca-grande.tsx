import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/roca-grande"];

export const Route = createFileRoute("/bairros_/roca-grande")({
  component: RouteComponent,
});
