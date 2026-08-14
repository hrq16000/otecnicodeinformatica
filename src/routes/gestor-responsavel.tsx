import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/gestor-responsavel"];

export const Route = createFileRoute("/gestor-responsavel")({
  component: RouteComponent,
});
