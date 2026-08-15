import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/coleta-e-entrega"];

export const Route = createFileRoute("/coleta-e-entrega")({
  component: RouteComponent,
});
