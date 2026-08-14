import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-florestal-qb"];

export const Route = createFileRoute("/bairros_/jardim-florestal-qb")({
  component: RouteComponent,
});
