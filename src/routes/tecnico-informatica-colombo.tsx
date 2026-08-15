import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/tecnico-informatica-colombo"];

export const Route = createFileRoute("/tecnico-informatica-colombo")({
  component: RouteComponent,
});
