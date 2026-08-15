import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/servicos/:servico/:cidade"];

export const Route = createFileRoute("/servicos_/$servico_/$cidade")({
  component: RouteComponent,
});
