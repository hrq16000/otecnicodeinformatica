import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/vitals"];

export const Route = createFileRoute("/admin_/vitals")({
  component: RouteComponent,
});
