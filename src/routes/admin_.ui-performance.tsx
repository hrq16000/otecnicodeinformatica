import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/ui-performance"];

export const Route = createFileRoute("/admin_/ui-performance")({
  component: RouteComponent,
});
