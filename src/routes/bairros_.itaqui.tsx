import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/itaqui"];

export const Route = createFileRoute("/bairros_/itaqui")({
  component: RouteComponent,
});
