import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/tindiquera"];

export const Route = createFileRoute("/bairros_/tindiquera")({
  component: RouteComponent,
});
