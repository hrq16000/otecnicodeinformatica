import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/arrumar-pc_/servico_/$servico_/$cidade")({
  component: legacyRouteElements["/arrumar-pc/servico/:servico/:cidade"],
});
