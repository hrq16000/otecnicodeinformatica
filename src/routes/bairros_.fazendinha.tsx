import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/fazendinha"];

export const Route = createFileRoute("/bairros_/fazendinha")({
  component: RouteComponent,
});
