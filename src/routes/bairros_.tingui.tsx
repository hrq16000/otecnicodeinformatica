import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/tingui"];

export const Route = createFileRoute("/bairros_/tingui")({
  component: RouteComponent,
});
