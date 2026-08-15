import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/agricola-sjp"];

export const Route = createFileRoute("/bairros_/agricola-sjp")({
  component: RouteComponent,
});
