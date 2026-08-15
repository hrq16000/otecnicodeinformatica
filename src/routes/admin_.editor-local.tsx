import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/editor-local"];

export const Route = createFileRoute("/admin_/editor-local")({
  component: RouteComponent,
});
