import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/bairros/sitio-cercado"];

export const Route = createFileRoute("/bairros_/sitio-cercado")({
  component: RouteComponent,
});
