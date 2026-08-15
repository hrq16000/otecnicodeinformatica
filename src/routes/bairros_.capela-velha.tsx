import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/capela-velha"];

export const Route = createFileRoute("/bairros_/capela-velha")({
  component: RouteComponent,
});
