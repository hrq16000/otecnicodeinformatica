import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/status-os"];

export const Route = createFileRoute("/status-os")({
  component: RouteComponent,
});
