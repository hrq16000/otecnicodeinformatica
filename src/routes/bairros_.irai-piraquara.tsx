import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/irai-piraquara"];

export const Route = createFileRoute("/bairros_/irai-piraquara")({
  component: RouteComponent,
});
