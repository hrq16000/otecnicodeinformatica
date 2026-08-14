import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/$servico_/$cidade")({
  component: legacyRouteElements["/servicos/:servico/:cidade"],
});
