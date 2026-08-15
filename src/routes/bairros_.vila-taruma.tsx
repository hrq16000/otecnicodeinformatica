import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/vila-taruma"];

export const Route = createFileRoute("/bairros_/vila-taruma")({
  component: RouteComponent,
});
