import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/cftv/araucaria"];

export const Route = createFileRoute("/cftv_/araucaria")({
  component: RouteComponent,
});
