import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/fotos"];

export const Route = createFileRoute("/admin_/fotos")({
  component: RouteComponent,
});
