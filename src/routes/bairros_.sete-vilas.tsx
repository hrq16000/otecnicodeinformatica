import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/sete-vilas"];

export const Route = createFileRoute("/bairros_/sete-vilas")({
  component: RouteComponent,
});
