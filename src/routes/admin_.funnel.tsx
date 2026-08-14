import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/funnel"];

export const Route = createFileRoute("/admin_/funnel")({
  component: RouteComponent,
});
