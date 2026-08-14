import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/admin_/gates-locais")({
  component: legacyRouteElements["/admin/gates-locais"],
});
