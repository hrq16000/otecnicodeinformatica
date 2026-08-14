import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-estados"];

export const Route = createFileRoute("/bairros_/jardim-estados")({
  component: RouteComponent,
});
