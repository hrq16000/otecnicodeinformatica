import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/sabia"];

export const Route = createFileRoute("/bairros_/sabia")({
  component: RouteComponent,
});
