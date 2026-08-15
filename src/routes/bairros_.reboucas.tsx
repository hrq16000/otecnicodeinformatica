import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/reboucas"];

export const Route = createFileRoute("/bairros_/reboucas")({
  component: RouteComponent,
});
