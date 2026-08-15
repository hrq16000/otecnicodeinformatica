import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/publicacao"];

export const Route = createFileRoute("/admin_/publicacao")({
  component: RouteComponent,
});
