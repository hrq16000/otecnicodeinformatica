import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/admin_/casos")({
  component: legacyRouteElements["/admin/casos"],
});
