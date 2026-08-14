import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/boqueirao"];

export const Route = createFileRoute("/bairros_/boqueirao")({
  component: RouteComponent,
});
