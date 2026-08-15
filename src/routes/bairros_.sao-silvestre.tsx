import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/sao-silvestre"];

export const Route = createFileRoute("/bairros_/sao-silvestre")({
  component: RouteComponent,
});
