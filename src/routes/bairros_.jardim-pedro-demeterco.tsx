import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/jardim-pedro-demeterco"];

export const Route = createFileRoute("/bairros_/jardim-pedro-demeterco")({
  component: RouteComponent,
});
