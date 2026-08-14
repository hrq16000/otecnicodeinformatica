import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/tecnico-informatica-campo-magro"];

export const Route = createFileRoute("/tecnico-informatica-campo-magro")({
  component: RouteComponent,
});
