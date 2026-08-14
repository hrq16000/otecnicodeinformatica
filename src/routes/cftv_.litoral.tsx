import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/cftv/litoral"];

export const Route = createFileRoute("/cftv_/litoral")({
  component: RouteComponent,
});
