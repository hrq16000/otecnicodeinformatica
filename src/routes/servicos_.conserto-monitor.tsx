import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/conserto-monitor"];

export const Route = createFileRoute("/servicos_/conserto-monitor")({
  component: RouteComponent,
});
