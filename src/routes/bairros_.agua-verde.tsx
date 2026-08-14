import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/agua-verde"];

export const Route = createFileRoute("/bairros_/agua-verde")({
  component: RouteComponent,
});
