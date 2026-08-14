import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/vila-sao-jose-qb"];

export const Route = createFileRoute("/bairros_/vila-sao-jose-qb")({
  component: RouteComponent,
});
