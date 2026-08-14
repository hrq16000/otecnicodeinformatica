import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/conversao"];

export const Route = createFileRoute("/admin_/conversao")({
  component: RouteComponent,
});
