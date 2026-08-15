import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/tecnico-informatica-pinhais"];

export const Route = createFileRoute("/tecnico-informatica-pinhais")({
  component: RouteComponent,
});
