import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/pinheirinho"];

export const Route = createFileRoute("/bairros_/pinheirinho")({
  component: RouteComponent,
});
