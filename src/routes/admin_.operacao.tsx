import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/operacao"];

export const Route = createFileRoute("/admin_/operacao")({
  component: RouteComponent,
});
