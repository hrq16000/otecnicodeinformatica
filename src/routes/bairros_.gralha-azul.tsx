import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/gralha-azul"];

export const Route = createFileRoute("/bairros_/gralha-azul")({
  component: RouteComponent,
});
