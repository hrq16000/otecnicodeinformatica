import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/portao"];

export const Route = createFileRoute("/bairros_/portao")({
  component: RouteComponent,
});
