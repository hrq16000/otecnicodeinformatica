import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/arrumar-pc"];

export const Route = createFileRoute("/arrumar-pc")({
  component: RouteComponent,
});
