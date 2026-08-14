import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/tecnico-informatica-sao-jose-pinhais")({
  component: legacyRouteElements["/tecnico-informatica-sao-jose-pinhais"],
});
