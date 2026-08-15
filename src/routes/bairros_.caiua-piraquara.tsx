import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/caiua-piraquara"];

export const Route = createFileRoute("/bairros_/caiua-piraquara")({
  component: RouteComponent,
});
