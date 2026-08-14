import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/tecnico-informatica-almirante-tamandare"];

export const Route = createFileRoute("/tecnico-informatica-almirante-tamandare")({
  component: RouteComponent,
});
