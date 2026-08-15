import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/quississana-sjp"];

export const Route = createFileRoute("/bairros_/quississana-sjp")({
  component: RouteComponent,
});
