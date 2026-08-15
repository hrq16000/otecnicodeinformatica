import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/passauna"];

export const Route = createFileRoute("/bairros_/passauna")({
  component: RouteComponent,
});
