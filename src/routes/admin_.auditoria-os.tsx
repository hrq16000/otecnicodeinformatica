import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/auditoria-os"];

export const Route = createFileRoute("/admin_/auditoria-os")({
  component: RouteComponent,
});
