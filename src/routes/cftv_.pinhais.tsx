import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/cftv/pinhais"];

export const Route = createFileRoute("/cftv_/pinhais")({
  component: RouteComponent,
});
