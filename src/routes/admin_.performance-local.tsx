import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/performance-local"];

export const Route = createFileRoute("/admin_/performance-local")({
  component: RouteComponent,
});
