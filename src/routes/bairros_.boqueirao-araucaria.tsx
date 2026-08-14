import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/boqueirao-araucaria"];

export const Route = createFileRoute("/bairros_/boqueirao-araucaria")({
  component: RouteComponent,
});
