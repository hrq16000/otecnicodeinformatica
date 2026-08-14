import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/montagem-pc_/cic")({
  component: legacyRouteElements["/servicos/montagem-pc/cic"],
});
