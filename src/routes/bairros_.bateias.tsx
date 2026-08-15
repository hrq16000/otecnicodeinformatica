import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/bateias"];

export const Route = createFileRoute("/bairros_/bateias")({
  component: RouteComponent,
});
