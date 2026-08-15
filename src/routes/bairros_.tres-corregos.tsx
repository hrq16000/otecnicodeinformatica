import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/tres-corregos"];

export const Route = createFileRoute("/bairros_/tres-corregos")({
  component: RouteComponent,
});
