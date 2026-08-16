import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/admin/inventario-bairros"];

export const Route = createFileRoute("/admin_/inventario-bairros")({
  component: RouteComponent,
});
