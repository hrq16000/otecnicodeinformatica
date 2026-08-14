import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/admin_/link-builder")({
  component: legacyRouteElements["/admin/link-builder"],
});
