import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/novo-mundo"];

export const Route = createFileRoute("/bairros_/novo-mundo")({
  component: RouteComponent,
});
