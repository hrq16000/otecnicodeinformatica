import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/montagem-pc/cic"];

export const Route = createFileRoute("/servicos_/montagem-pc_/cic")({
  component: RouteComponent,
});
