import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/bacacheri"];

export const Route = createFileRoute("/bairros_/bacacheri")({
  component: RouteComponent,
});
