import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/uberaba"];

export const Route = createFileRoute("/bairros_/uberaba")({
  component: RouteComponent,
});
