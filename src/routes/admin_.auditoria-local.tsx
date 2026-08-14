import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/auditoria-local"];

export const Route = createFileRoute("/admin_/auditoria-local")({
  component: RouteComponent,
});
