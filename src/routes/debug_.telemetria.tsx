import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/debug_/telemetria")({
  component: legacyRouteElements["/debug/telemetria"],
});
