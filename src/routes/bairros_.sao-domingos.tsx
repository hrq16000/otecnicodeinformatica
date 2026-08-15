import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/sao-domingos"];

export const Route = createFileRoute("/bairros_/sao-domingos")({
  component: RouteComponent,
});
