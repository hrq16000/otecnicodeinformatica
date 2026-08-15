import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/sao-lourenco-qb"];

export const Route = createFileRoute("/bairros_/sao-lourenco-qb")({
  component: RouteComponent,
});
