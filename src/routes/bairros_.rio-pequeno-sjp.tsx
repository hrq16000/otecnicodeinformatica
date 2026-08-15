import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/rio-pequeno-sjp"];

export const Route = createFileRoute("/bairros_/rio-pequeno-sjp")({
  component: RouteComponent,
});
