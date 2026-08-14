import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/debug/telemetria"];

export const Route = createFileRoute("/debug_/telemetria")({
  component: RouteComponent,
});
