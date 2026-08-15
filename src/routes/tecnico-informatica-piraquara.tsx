import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/tecnico-informatica-piraquara"];

export const Route = createFileRoute("/tecnico-informatica-piraquara")({
  component: RouteComponent,
});
