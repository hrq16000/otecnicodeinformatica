import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/ipe-sjp"];

export const Route = createFileRoute("/bairros_/ipe-sjp")({
  component: RouteComponent,
});
