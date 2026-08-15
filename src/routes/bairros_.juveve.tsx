import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/juveve"];

export const Route = createFileRoute("/bairros_/juveve")({
  component: RouteComponent,
});
