import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/afonso-pena"];

export const Route = createFileRoute("/bairros_/afonso-pena")({
  component: RouteComponent,
});
