import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

const RouteComponent = legacyRouteElements["/arrumar-pc/servico/:servico/:cidade"];

export const Route = createFileRoute("/arrumar-pc_/servico_/$servico_/$cidade")({
  component: RouteComponent,
});
