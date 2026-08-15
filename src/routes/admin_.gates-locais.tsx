import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/gates-locais"];

export const Route = createFileRoute("/admin_/gates-locais")({
  component: RouteComponent,
});
