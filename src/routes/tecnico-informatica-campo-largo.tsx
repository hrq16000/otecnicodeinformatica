import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/tecnico-informatica-campo-largo")({
  component: legacyRouteElements["/tecnico-informatica-campo-largo"],
});
