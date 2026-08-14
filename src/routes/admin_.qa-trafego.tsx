import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/admin_/qa-trafego")({
  component: legacyRouteElements["/admin/qa-trafego"],
});
