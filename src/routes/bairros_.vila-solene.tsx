import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/vila-solene"];

export const Route = createFileRoute("/bairros_/vila-solene")({
  component: RouteComponent,
});
