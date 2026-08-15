import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/empresas"];

export const Route = createFileRoute("/empresas")({
  component: RouteComponent,
});
