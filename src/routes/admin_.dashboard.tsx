import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/dashboard"];

export const Route = createFileRoute("/admin_/dashboard")({
  component: RouteComponent,
});
