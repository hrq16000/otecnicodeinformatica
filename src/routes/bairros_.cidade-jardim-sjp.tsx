import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/cidade-jardim-sjp"];

export const Route = createFileRoute("/bairros_/cidade-jardim-sjp")({
  component: RouteComponent,
});
