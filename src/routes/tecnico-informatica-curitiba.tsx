import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/tecnico-informatica-curitiba"];

export const Route = createFileRoute("/tecnico-informatica-curitiba")({
  component: RouteComponent,
});
