import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/cftv/sao-jose-dos-pinhais"];

export const Route = createFileRoute("/cftv_/sao-jose-dos-pinhais")({
  component: RouteComponent,
});
