import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/montagem-de-pc"];

export const Route = createFileRoute("/servicos_/montagem-de-pc")({
  component: RouteComponent,
});
