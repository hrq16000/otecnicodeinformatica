import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/tecnico-informatica-colombo")({
  component: legacyRouteElements["/tecnico-informatica-colombo"],
});
