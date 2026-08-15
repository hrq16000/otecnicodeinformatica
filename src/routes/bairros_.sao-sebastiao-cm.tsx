import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/sao-sebastiao-cm"];

export const Route = createFileRoute("/bairros_/sao-sebastiao-cm")({
  component: RouteComponent,
});
