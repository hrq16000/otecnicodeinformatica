import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/rondinha"];

export const Route = createFileRoute("/bairros_/rondinha")({
  component: RouteComponent,
});
