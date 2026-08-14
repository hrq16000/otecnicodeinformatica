import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/academia-sjp"];

export const Route = createFileRoute("/bairros_/academia-sjp")({
  component: RouteComponent,
});
