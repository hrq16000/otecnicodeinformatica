import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/provas-monitor"];

export const Route = createFileRoute("/admin_/provas-monitor")({
  component: RouteComponent,
});
