import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/independencia-sjp"];

export const Route = createFileRoute("/bairros_/independencia-sjp")({
  component: RouteComponent,
});
