import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-menino-deus-qb"];

export const Route = createFileRoute("/bairros_/jardim-menino-deus-qb")({
  component: RouteComponent,
});
