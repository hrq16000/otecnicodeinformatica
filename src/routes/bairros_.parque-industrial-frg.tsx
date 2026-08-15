import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/parque-industrial-frg"];

export const Route = createFileRoute("/bairros_/parque-industrial-frg")({
  component: RouteComponent,
});
