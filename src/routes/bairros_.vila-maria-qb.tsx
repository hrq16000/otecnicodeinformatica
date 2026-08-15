import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/vila-maria-qb"];

export const Route = createFileRoute("/bairros_/vila-maria-qb")({
  component: RouteComponent,
});
