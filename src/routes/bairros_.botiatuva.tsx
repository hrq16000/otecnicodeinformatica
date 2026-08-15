import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/botiatuva"];

export const Route = createFileRoute("/bairros_/botiatuva")({
  component: RouteComponent,
});
