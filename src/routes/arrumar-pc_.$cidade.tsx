import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/arrumar-pc/:cidade"];

export const Route = createFileRoute("/arrumar-pc_/$cidade")({
  component: RouteComponent,
});
