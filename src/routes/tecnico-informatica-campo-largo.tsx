import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/tecnico-informatica-campo-largo"];

export const Route = createFileRoute("/tecnico-informatica-campo-largo")({
  component: RouteComponent,
});
