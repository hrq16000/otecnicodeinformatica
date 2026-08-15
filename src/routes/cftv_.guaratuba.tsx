import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/cftv/guaratuba"];

export const Route = createFileRoute("/cftv_/guaratuba")({
  component: RouteComponent,
});
