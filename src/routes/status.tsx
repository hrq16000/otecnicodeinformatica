import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/status"];

export const Route = createFileRoute("/status")({
  component: RouteComponent,
});
