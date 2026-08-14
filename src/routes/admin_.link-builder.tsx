import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/link-builder"];

export const Route = createFileRoute("/admin_/link-builder")({
  component: RouteComponent,
});
