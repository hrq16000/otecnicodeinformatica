import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/vila-amelia-pinhais"];

export const Route = createFileRoute("/bairros_/vila-amelia-pinhais")({
  component: RouteComponent,
});
