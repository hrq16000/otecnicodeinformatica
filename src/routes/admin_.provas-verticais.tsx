import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/provas-verticais"];

export const Route = createFileRoute("/admin_/provas-verticais")({
  component: RouteComponent,
});
