import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/tecnico-informatica-quatro-barras"];

export const Route = createFileRoute("/tecnico-informatica-quatro-barras")({
  component: RouteComponent,
});
