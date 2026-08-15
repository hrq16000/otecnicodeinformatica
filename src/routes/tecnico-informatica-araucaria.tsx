import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/tecnico-informatica-araucaria"];

export const Route = createFileRoute("/tecnico-informatica-araucaria")({
  component: RouteComponent,
});
