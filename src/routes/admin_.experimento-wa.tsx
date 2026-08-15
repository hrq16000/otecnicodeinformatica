import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/experimento-wa"];

export const Route = createFileRoute("/admin_/experimento-wa")({
  component: RouteComponent,
});
