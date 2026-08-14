import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/cftv"];

export const Route = createFileRoute("/cftv")({
  component: RouteComponent,
});
