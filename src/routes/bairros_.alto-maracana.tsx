import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/alto-maracana"];

export const Route = createFileRoute("/bairros_/alto-maracana")({
  component: RouteComponent,
});
