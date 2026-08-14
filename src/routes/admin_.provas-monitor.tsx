import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/admin_/provas-monitor")({
  component: legacyRouteElements["/admin/provas-monitor"],
});
