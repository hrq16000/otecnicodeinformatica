import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/ferraria"];

export const Route = createFileRoute("/bairros_/ferraria")({
  component: RouteComponent,
});
