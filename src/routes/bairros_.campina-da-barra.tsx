import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/campina-da-barra"];

export const Route = createFileRoute("/bairros_/campina-da-barra")({
  component: RouteComponent,
});
