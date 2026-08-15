import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/formatacao"];

export const Route = createFileRoute("/servicos_/formatacao")({
  component: RouteComponent,
});
