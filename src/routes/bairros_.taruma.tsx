import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/taruma"];

export const Route = createFileRoute("/bairros_/taruma")({
  component: RouteComponent,
});
