import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/solucoes/:slug"];

export const Route = createFileRoute("/solucoes_/$slug")({
  component: RouteComponent,
});
