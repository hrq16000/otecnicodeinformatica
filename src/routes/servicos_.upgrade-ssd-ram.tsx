import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/upgrade-ssd-ram")({
  component: legacyRouteElements["/servicos/upgrade-ssd-ram"],
});
