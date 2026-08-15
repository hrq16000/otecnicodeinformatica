import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/coleta-formulario"];

export const Route = createFileRoute("/coleta-formulario")({
  component: RouteComponent,
});
