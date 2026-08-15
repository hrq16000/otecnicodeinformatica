import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/login"];

export const Route = createFileRoute("/admin_/login")({
  component: RouteComponent,
});
