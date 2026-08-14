import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/admin_/auditoria-acessos")({
  component: legacyRouteElements["/admin/auditoria-acessos"],
});
