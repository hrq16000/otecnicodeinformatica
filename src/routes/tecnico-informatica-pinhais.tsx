import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/tecnico-informatica-pinhais")({
  component: legacyRouteElements["/tecnico-informatica-pinhais"],
});
