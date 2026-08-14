import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/admin_/ui-performance")({
  component: legacyRouteElements["/admin/ui-performance"],
});
