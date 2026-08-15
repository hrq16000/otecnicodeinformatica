import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/alto-da-gloria"];

export const Route = createFileRoute("/bairros_/alto-da-gloria")({
  component: RouteComponent,
});
