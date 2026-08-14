import { createFileRoute } from "@tanstack/react-router";
import { legacyRouteElements } from "@/legacyRouteElements";

export const Route = createFileRoute("/servicos_/computador-lento")({
  component: legacyRouteElements["/servicos/computador-lento"],
});
