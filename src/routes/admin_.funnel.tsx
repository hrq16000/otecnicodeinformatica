import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/admin_/funnel")({
  component: legacyRouteElements["/admin/funnel"],
});
