import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/casos"];

export const Route = createFileRoute("/admin_/casos")({
  component: RouteComponent,
});
