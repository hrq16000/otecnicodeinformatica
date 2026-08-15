import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/qa-trafego"];

export const Route = createFileRoute("/admin_/qa-trafego")({
  component: RouteComponent,
});
