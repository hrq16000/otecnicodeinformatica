import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/tecnico-informatica-sao-jose-pinhais"];

export const Route = createFileRoute("/tecnico-informatica-sao-jose-pinhais")({
  component: RouteComponent,
});
