import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/montagem-pc")({
  component: legacyRouteElements["/servicos/montagem-pc"],
});
