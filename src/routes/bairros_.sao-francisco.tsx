import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/sao-francisco"];

export const Route = createFileRoute("/bairros_/sao-francisco")({
  component: RouteComponent,
});
