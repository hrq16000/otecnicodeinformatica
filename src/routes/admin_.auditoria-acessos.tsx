import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/auditoria-acessos"];

export const Route = createFileRoute("/admin_/auditoria-acessos")({
  component: RouteComponent,
});
