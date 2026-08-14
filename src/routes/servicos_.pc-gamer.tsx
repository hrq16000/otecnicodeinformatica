import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/pc-gamer")({
  component: legacyRouteElements["/servicos/pc-gamer"],
});
