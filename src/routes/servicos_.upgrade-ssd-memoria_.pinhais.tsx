import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/upgrade-ssd-memoria_/pinhais")({
  component: legacyRouteElements["/servicos/upgrade-ssd-memoria/pinhais"],
});
