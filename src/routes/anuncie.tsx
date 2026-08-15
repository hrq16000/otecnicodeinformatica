import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/anuncie"];

export const Route = createFileRoute("/anuncie")({
  component: RouteComponent,
});
