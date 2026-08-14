import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/admin_/auditoria-local")({
  component: legacyRouteElements["/admin/auditoria-local"],
});
