import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/bigorrilho"];

export const Route = createFileRoute("/bairros_/bigorrilho")({
  component: RouteComponent,
});
