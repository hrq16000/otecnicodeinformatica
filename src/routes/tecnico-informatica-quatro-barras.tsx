import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/tecnico-informatica-quatro-barras")({
  component: legacyRouteElements["/tecnico-informatica-quatro-barras"],
});
