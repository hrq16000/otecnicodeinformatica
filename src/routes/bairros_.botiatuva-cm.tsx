import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/botiatuva-cm"];

export const Route = createFileRoute("/bairros_/botiatuva-cm")({
  component: RouteComponent,
});
