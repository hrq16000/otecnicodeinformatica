import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/admin_/editor-local")({
  component: legacyRouteElements["/admin/editor-local"],
});
