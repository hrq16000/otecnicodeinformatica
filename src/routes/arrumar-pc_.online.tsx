import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/arrumar-pc/online"];

export const Route = createFileRoute("/arrumar-pc_/online")({
  component: RouteComponent,
});
