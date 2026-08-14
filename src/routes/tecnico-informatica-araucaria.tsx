import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/tecnico-informatica-araucaria")({
  component: legacyRouteElements["/tecnico-informatica-araucaria"],
});
