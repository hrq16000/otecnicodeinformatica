import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/tecnico-informatica-campo-magro")({
  component: legacyRouteElements["/tecnico-informatica-campo-magro"],
});
