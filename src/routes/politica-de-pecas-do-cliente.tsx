import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/politica-de-pecas-do-cliente"];

export const Route = createFileRoute("/politica-de-pecas-do-cliente")({
  component: RouteComponent,
});
