import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/tecnico-informatica-piraquara")({
  component: legacyRouteElements["/tecnico-informatica-piraquara"],
});
