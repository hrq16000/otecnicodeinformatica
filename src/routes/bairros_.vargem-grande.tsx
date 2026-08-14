import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/vargem-grande"];

export const Route = createFileRoute("/bairros_/vargem-grande")({
  component: RouteComponent,
});
