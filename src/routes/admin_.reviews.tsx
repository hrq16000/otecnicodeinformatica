import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/reviews"];

export const Route = createFileRoute("/admin_/reviews")({
  component: RouteComponent,
});
