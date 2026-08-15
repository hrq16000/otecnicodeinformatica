import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/graciosa-qb"];

export const Route = createFileRoute("/bairros_/graciosa-qb")({
  component: RouteComponent,
});
