import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/cajuru"];

export const Route = createFileRoute("/bairros_/cajuru")({
  component: RouteComponent,
});
